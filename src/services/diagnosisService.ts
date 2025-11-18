import axiosInstance from '../utils/axiosInstance';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { DiagnosisStartRequest } from '../types/interfaces/diagnosis/request/DiagnosisStartRequest';
import { JobConfirmationRequest } from '../types/interfaces/diagnosis/request/JobConfirmationRequest';
import { DiagnosisProgressResponse } from '../types/interfaces/diagnosis/response/DiagnosisProgressResponse';
import { DiagnosisResultResponse } from '../types/interfaces/diagnosis/response/DiagnosisResultResponse';
import { getAccessToken } from '../utils/tokenManager';

/**
 * Starts a new diagnosis process.
 *
 * Backend endpoint: POST /api/v1/diagnosis
 * Response: 202 Accepted with DiagnosisProgressResponse
 *
 * @param request - Optional preferences for the diagnosis
 * @returns The initial diagnosis progress response
 */
export const runDiagnosis = async (request?: DiagnosisStartRequest): Promise<DiagnosisProgressResponse> => {
  const response = await axiosInstance.post<DiagnosisProgressResponse>('/api/v1/diagnosis', request || {});
  return response.data;
};

/**
 * Controls the SSE connection lifecycle.
 * Provides an abort mechanism to close the connection.
 */
class AbortableSseController {
  private ctrl: AbortController;

  constructor() {
    this.ctrl = new AbortController();
  }

  /**
   * Aborts the SSE connection.
   */
  abort(): void {
    this.ctrl.abort();
  }

  /**
   * Gets the AbortSignal for this controller.
   */
  get signal(): AbortSignal {
    return this.ctrl.signal;
  }
}

/**
 * Streams real-time diagnosis progress updates using Server-Sent Events (SSE).
 *
 * Backend endpoint: GET /api/v1/diagnosis/{id}/stream
 * Event name: 'diagnosis-progress'
 * Authentication: Required (Bearer token in Authorization header)
 *
 * The backend sends SSE events with the following structure:
 * - Event name: 'diagnosis-progress'
 * - Data: JSON-serialized DiagnosisProgressResponse
 *
 * Connection lifecycle:
 * 1. Opens SSE connection with authentication headers
 * 2. Receives progress updates as they occur
 * 3. Automatically handles reconnection on network errors (unless manually aborted)
 * 4. Calls onComplete when diagnosis finishes (COMPLETED or FAILED status)
 * 5. Calls onAwaitingInput when user selection is needed (AWAITING_USER_INPUT status)
 *
 * @param diagnosisId - The ID of the diagnosis to stream
 * @param onMessage - Callback invoked for each progress update
 * @param onError - Callback invoked when an error occurs
 * @param onComplete - Callback invoked when diagnosis completes (COMPLETED or FAILED)
 * @param onAwaitingInput - Callback invoked when user input is needed
 * @returns AbortableSseController to manage the connection
 */
export const streamDiagnosisProgress = (
  diagnosisId: number,
  callbacks: {
    onMessage: (data: DiagnosisProgressResponse) => void;
    onError: (error: unknown) => void;
    onComplete?: (data: DiagnosisProgressResponse) => void;
    onAwaitingInput?: (data: DiagnosisProgressResponse) => void;
  }
): AbortableSseController => {
  const controller = new AbortableSseController();
  const token = getAccessToken();

  if (!token) {
    callbacks.onError(new Error('No access token available. Please log in.'));
    return controller;
  }

  // Construct the full URL for the SSE endpoint
  const baseURL = axiosInstance.defaults.baseURL || '/api';
  const url = `${baseURL}/api/v1/diagnosis/${diagnosisId}/stream`;

  fetchEventSource(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      // Note: Do NOT set 'Content-Type' for SSE. The browser handles this.
    },
    openWhenHidden: true, // Keep connection open even when tab is hidden

    /**
     * Handle incoming SSE messages.
     * The backend sends events with the name 'diagnosis-progress'.
     */
    onmessage(event) {
      try {
        // Parse the JSON data from the SSE event
        const data: DiagnosisProgressResponse = JSON.parse(event.data);

        // Invoke the main message callback
        callbacks.onMessage(data);

        // Check for terminal states
        if (data.status === 'COMPLETED' || data.status === 'FAILED') {
          callbacks.onComplete?.(data);
          // Note: We don't abort here because the backend may close the connection
        } else if (data.status === 'AWAITING_USER_INPUT') {
          callbacks.onAwaitingInput?.(data);
        }
      } catch (parseError) {
        console.error('Failed to parse SSE message:', parseError, event.data);
        callbacks.onError(parseError);
      }
    },

    /**
     * Handle SSE connection errors.
     * This is called for:
     * - Network errors (will auto-retry)
     * - HTTP errors (4xx, 5xx)
     * - Parse errors
     */
    onerror(error) {
      console.error('SSE connection error:', error);
      callbacks.onError(error);

      // Stop retrying on client errors (400-499) except 429 (rate limit)
      if (error instanceof Response) {
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          throw error; // Stop retrying
        }
      }

      // For other errors, fetchEventSource will automatically retry
    },

    /**
     * Handle successful connection open.
     */
    onopen: async (response) => {
      if (!response.ok) {
        // Connection failed with HTTP error
        const errorText = await response.text();
        console.error('SSE connection failed:', response.status, errorText);

        if (response.status === 401) {
          callbacks.onError(new Error('Authentication failed. Please log in again.'));
        } else if (response.status === 403) {
          callbacks.onError(new Error('Access denied. You do not have permission to access this diagnosis.'));
        } else if (response.status === 404) {
          callbacks.onError(new Error('Diagnosis not found.'));
        } else {
          callbacks.onError(new Error(`Server error: ${response.status} ${response.statusText}`));
        }

        throw new Error(`HTTP ${response.status}`); // Stop connection
      }
    },
  }).catch((error) => {
    // Final catch for any unhandled errors
    if (error.name !== 'AbortError') {
      console.error('Unhandled SSE error:', error);
      callbacks.onError(error);
    }
  });

  return controller;
};

/**
 * Retrieves the final diagnosis result.
 *
 * Backend endpoint: GET /api/v1/diagnosis/result/{id}
 * Response: 200 OK with DiagnosisResultResponse
 *
 * This should be called after the diagnosis is completed (status === 'COMPLETED').
 *
 * @param diagnosisId - The ID of the completed diagnosis
 * @returns The complete diagnosis result with analysis and recommendations
 */
export const getFinalDiagnosisResult = async (diagnosisId: number): Promise<DiagnosisResultResponse> => {
  const response = await axiosInstance.get<DiagnosisResultResponse>(`/api/v1/diagnosis/result/${diagnosisId}`);
  return response.data;
};

/**
 * Submits the user's manual job selection to continue the diagnosis.
 *
 * Backend endpoint: POST /api/v1/diagnosis/{id}/job-confirmation
 * Request body: JobConfirmationRequest
 * Response: 202 Accepted
 *
 * This is called when the diagnosis enters AWAITING_USER_INPUT state
 * (when AI confidence is below threshold and user needs to select from candidates).
 *
 * After calling this, the SSE stream will continue with the remaining processing steps.
 *
 * @param diagnosisId - The ID of the diagnosis awaiting input
 * @param request - The user's job selection (NCS code and job name)
 */
export const selectJobManually = async (diagnosisId: number, request: JobConfirmationRequest): Promise<void> => {
  await axiosInstance.post(`/api/v1/diagnosis/${diagnosisId}/job-confirmation`, request);
};
