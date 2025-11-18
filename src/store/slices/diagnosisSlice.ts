import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import {
  runDiagnosis,
  streamDiagnosisProgress,
  getFinalDiagnosisResult,
  selectJobManually,
} from '../../services/diagnosisService';
import { DiagnosisProgressResponse } from '../../types/interfaces/diagnosis/response/DiagnosisProgressResponse';
import { DiagnosisResultResponse } from '../../types/interfaces/diagnosis/response/DiagnosisResultResponse';
import { DiagnosisStartRequest } from '../../types/interfaces/diagnosis/request/DiagnosisStartRequest';
import { JobConfirmationRequest } from '../../types/interfaces/diagnosis/request/JobConfirmationRequest';
import { DiagnosisStatus } from '../../types/enums/DiagnosisStatus';
import { NcsAnalysisResponse } from '../../types/interfaces/diagnosis/response/NcsAnalysisResponse';

interface DiagnosisState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'awaiting_input';
  progress: DiagnosisProgressResponse | null;
  result: DiagnosisResultResponse | null;
  error: string | null;
  diagnosisId: number | null;
  profileNotFound: boolean;
  candidatesForSelection: NcsAnalysisResponse | null; // For user selection
}

const initialState: DiagnosisState = {
  status: 'idle',
  progress: null,
  result: null,
  error: null,
  diagnosisId: null,
  profileNotFound: false,
  candidatesForSelection: null,
};

/**
 * Async thunk to start a diagnosis and stream real-time progress.
 *
 * This thunk:
 * 1. Calls the backend to initiate diagnosis (POST /api/v1/diagnosis)
 * 2. Opens an SSE connection to stream progress updates
 * 3. Shows a SweetAlert2 modal with real-time progress
 * 4. Handles different outcomes:
 *    - COMPLETED: Fetches final result and resolves
 *    - FAILED: Rejects with error
 *    - AWAITING_USER_INPUT: Pauses and waits for user to select NCS job
 * 5. Updates Redux state throughout the process
 */
export const startDiagnosis = createAsyncThunk<
  DiagnosisResultResponse,
  DiagnosisStartRequest | void,
  { rejectValue: string }
>('diagnosis/start', async (request, { dispatch, rejectWithValue }) => {
  type SseController = ReturnType<typeof streamDiagnosisProgress>;
  let sseController: SseController | null = null;

  try {
    // Step 1: Start the diagnosis process
    const initialProgress = await runDiagnosis(request || undefined);
    const { diagnosisId } = initialProgress;

    if (!diagnosisId) {
      throw new Error('Failed to get diagnosis ID from backend.');
    }

    dispatch(setDiagnosisId(diagnosisId));
    dispatch(updateProgress(initialProgress));

    // Step 2: Show progress modal
    Swal.fire({
      title: '진단 진행 중',
      html: `
        <div>
          <p id="swal-message">${initialProgress.currentMessage}</p>
          <div style="width: 100%; background: #eee; border-radius: 5px; margin-top: 10px;">
            <div id="swal-progress-bar" style="width: ${initialProgress.progressPercentage}%; height: 20px; background: #4caf50; border-radius: 5px; transition: width 0.3s ease;"></div>
          </div>
          <p id="swal-percentage" style="margin-top: 5px; font-size: 14px; color: #666;">${initialProgress.progressPercentage}%</p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Step 3: Stream progress updates via SSE
    return new Promise<DiagnosisResultResponse>((resolve, reject) => {
      sseController = streamDiagnosisProgress(diagnosisId, {
        onMessage: (progressData: DiagnosisProgressResponse) => {
          dispatch(updateProgress(progressData));

          // Update the SweetAlert modal
          const progressBar = document.getElementById('swal-progress-bar');
          const messageElement = document.getElementById('swal-message');
          const percentageElement = document.getElementById('swal-percentage');

          if (messageElement) {
            messageElement.textContent = progressData.currentMessage;
          }
          if (progressBar) {
            progressBar.style.width = `${progressData.progressPercentage}%`;
          }
          if (percentageElement) {
            percentageElement.textContent = `${progressData.progressPercentage}%`;
          }
        },

        onComplete: async (progressData: DiagnosisProgressResponse) => {
          if (progressData.status === DiagnosisStatus.COMPLETED) {
            // Diagnosis completed successfully
            sseController?.abort();
            Swal.close();

            try {
              const finalResult = await getFinalDiagnosisResult(diagnosisId);
              resolve(finalResult);
            } catch (err) {
              const error = err as Error;
              reject(new Error(`Failed to fetch final result: ${error.message}`));
            }
          } else if (progressData.status === DiagnosisStatus.FAILED) {
            // Diagnosis failed
            sseController?.abort();
            Swal.fire({
              title: '진단 실패',
              text: progressData.currentMessage || '진단 중 오류가 발생했습니다.',
              icon: 'error',
            });
            reject(new Error(progressData.currentMessage || 'Diagnosis failed'));
          }
        },

        onAwaitingInput: (progressData: DiagnosisProgressResponse) => {
          // User input needed (low confidence, needs manual job selection)
          sseController?.abort();
          Swal.close();
          dispatch(diagnosisSlice.actions.setStatus('awaiting_input'));

          // Show a message to the user
          Swal.fire({
            title: '직무 선택 필요',
            html: `
              <p>${progressData.currentMessage}</p>
              <p>추천된 직무 중 하나를 선택해주세요.</p>
            `,
            icon: 'info',
            confirmButtonText: '확인',
          });

          // We don't resolve or reject here - the user needs to call confirmJobSelection
          // which will continue the diagnosis process
        },

        onError: (error: unknown) => {
          console.error('SSE Error:', error);
          sseController?.abort();

          const errorMessage = error instanceof Error ? error.message : '진단 중 오류가 발생했습니다.';

          // Handle specific error cases
          if (errorMessage.includes('Authentication failed') || errorMessage.includes('401')) {
            Swal.fire({
              title: '인증 오류',
              text: '로그인이 만료되었습니다. 다시 로그인해주세요.',
              icon: 'error',
            });
            reject(new Error('Authentication failed'));
          } else if (errorMessage.includes('Access denied') || errorMessage.includes('403')) {
            Swal.fire({
              title: '접근 거부',
              text: '이 진단에 접근할 권한이 없습니다.',
              icon: 'error',
            });
            reject(new Error('Access denied'));
          } else {
            Swal.fire({
              title: '오류',
              text: errorMessage,
              icon: 'error',
            });
            reject(error);
          }
        },
      });
    });
  } catch (error) {
    // Handle errors from the initial runDiagnosis call
    const err = error as { response?: { status: number; data?: { message?: string } }; message?: string };
    sseController?.abort();

    if (err.response) {
      const { status, data } = err.response;

      if (status === 400 && data?.message?.includes('프로필 정보가 없습니다')) {
        dispatch(diagnosisSlice.actions.setProfileNotFound(true));
        return rejectWithValue('Profile not found');
      } else if (status === 401) {
        Swal.fire({
          title: '인증 오류',
          text: '로그인이 필요합니다.',
          icon: 'error',
        });
        return rejectWithValue('Authentication required');
      } else if (status === 403) {
        Swal.fire({
          title: '접근 거부',
          text: '권한이 없습니다.',
          icon: 'error',
        });
        return rejectWithValue('Access denied');
      } else if (status === 409) {
        Swal.fire({
          title: '진단 진행 중',
          text: '이미 진행 중인 진단이 있습니다.',
          icon: 'warning',
        });
        return rejectWithValue('Diagnosis already in progress');
      }
    }

    Swal.fire({
      title: '오류',
      text: err.message || '진단을 시작할 수 없습니다.',
      icon: 'error',
    });
    return rejectWithValue(err.message || 'Failed to start diagnosis');
  }
});

/**
 * Async thunk to confirm user's manual job selection and resume diagnosis.
 *
 * This is called when the diagnosis is in AWAITING_USER_INPUT state.
 * After the user selects an NCS job, this thunk:
 * 1. Submits the selection to the backend
 * 2. Resumes the SSE stream to continue processing
 * 3. Shows progress modal again
 * 4. Waits for COMPLETED status and fetches final result
 */
export const confirmJobSelection = createAsyncThunk<
  DiagnosisResultResponse,
  JobConfirmationRequest,
  { state: { diagnosis: DiagnosisState }; rejectValue: string }
>('diagnosis/confirmJob', async (request, { dispatch, getState, rejectWithValue }) => {
  const { diagnosisId } = getState().diagnosis;
  type SseController = ReturnType<typeof streamDiagnosisProgress>;
  let sseController: SseController | null = null;

  if (!diagnosisId) {
    Swal.fire({
      title: '오류',
      text: '진단 ID를 찾을 수 없습니다.',
      icon: 'error',
    });
    return rejectWithValue('No active diagnosis ID found.');
  }

  try {
    // Step 1: Submit user's job selection
    await selectJobManually(diagnosisId, request);

    // Step 2: Show progress modal for continued processing
    Swal.fire({
      title: '진단 재개 중',
      html: `
        <div>
          <p id="swal-message">선택하신 직무를 바탕으로 진단을 계속합니다...</p>
          <div style="width: 100%; background: #eee; border-radius: 5px; margin-top: 10px;">
            <div id="swal-progress-bar" style="width: 33%; height: 20px; background: #4caf50; border-radius: 5px; transition: width 0.3s ease;"></div>
          </div>
          <p id="swal-percentage" style="margin-top: 5px; font-size: 14px; color: #666;">33%</p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Step 3: Resume SSE stream
    return new Promise<DiagnosisResultResponse>((resolve, reject) => {
      sseController = streamDiagnosisProgress(diagnosisId, {
        onMessage: (progressData: DiagnosisProgressResponse) => {
          dispatch(updateProgress(progressData));

          // Update the SweetAlert modal
          const progressBar = document.getElementById('swal-progress-bar');
          const messageElement = document.getElementById('swal-message');
          const percentageElement = document.getElementById('swal-percentage');

          if (messageElement) {
            messageElement.textContent = progressData.currentMessage;
          }
          if (progressBar) {
            progressBar.style.width = `${progressData.progressPercentage}%`;
          }
          if (percentageElement) {
            percentageElement.textContent = `${progressData.progressPercentage}%`;
          }
        },

        onComplete: async (progressData: DiagnosisProgressResponse) => {
          if (progressData.status === DiagnosisStatus.COMPLETED) {
            sseController?.abort();
            Swal.close();

            try {
              const finalResult = await getFinalDiagnosisResult(diagnosisId);
              resolve(finalResult);
            } catch (err) {
              const error = err as Error;
              reject(new Error(`Failed to fetch final result: ${error.message}`));
            }
          } else if (progressData.status === DiagnosisStatus.FAILED) {
            sseController?.abort();
            Swal.fire({
              title: '진단 실패',
              text: progressData.currentMessage || '진단 중 오류가 발생했습니다.',
              icon: 'error',
            });
            reject(new Error(progressData.currentMessage || 'Diagnosis failed'));
          }
        },

        onError: (error: unknown) => {
          console.error('SSE Error after job confirmation:', error);
          sseController?.abort();

          const errorMessage = error instanceof Error ? error.message : '진단 중 오류가 발생했습니다.';

          Swal.fire({
            title: '오류',
            text: errorMessage,
            icon: 'error',
          });
          reject(error);
        },
      });
    });
  } catch (error) {
    sseController?.abort();

    const err = error as { response?: { status: number; data?: { message?: string } }; message?: string };

    if (err.response) {
      const { status, data } = err.response;

      if (status === 400) {
        Swal.fire({
          title: '잘못된 요청',
          text: data?.message || '직무 선택 정보가 올바르지 않습니다.',
          icon: 'error',
        });
        return rejectWithValue(data?.message || 'Invalid job selection');
      } else if (status === 403) {
        Swal.fire({
          title: '접근 거부',
          text: '권한이 없습니다.',
          icon: 'error',
        });
        return rejectWithValue('Access denied');
      } else if (status === 404) {
        Swal.fire({
          title: '진단을 찾을 수 없음',
          text: '진단 ID가 유효하지 않습니다.',
          icon: 'error',
        });
        return rejectWithValue('Diagnosis not found');
      }
    }

    Swal.fire({
      title: '오류',
      text: err.message || '직무 선택을 제출할 수 없습니다.',
      icon: 'error',
    });
    return rejectWithValue(err.message || 'Failed to submit job selection');
  }
});

const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    updateProgress: (state, action: PayloadAction<DiagnosisProgressResponse>) => {
      state.progress = action.payload;
    },
    setDiagnosisId: (state, action: PayloadAction<number>) => {
      state.diagnosisId = action.payload;
    },
    setStatus: (state, action: PayloadAction<DiagnosisState['status']>) => {
      state.status = action.payload;
    },
    setProfileNotFound: (state, action: PayloadAction<boolean>) => {
      state.profileNotFound = action.payload;
      state.status = 'failed'; // Also set status to failed
    },
    setCandidatesForSelection: (state, action: PayloadAction<NcsAnalysisResponse | null>) => {
      state.candidatesForSelection = action.payload;
    },
    resetDiagnosis: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDiagnosis.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.result = null;
        state.progress = null;
        state.profileNotFound = false;
      })
      .addCase(startDiagnosis.fulfilled, (state, action: PayloadAction<DiagnosisResultResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(startDiagnosis.rejected, (state, action) => {
        if (action.payload !== 'Profile not found') {
          state.status = 'failed';
          state.error = action.payload as string;
        }
      })
      .addCase(confirmJobSelection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmJobSelection.fulfilled, (state, action: PayloadAction<DiagnosisResultResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(confirmJobSelection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  updateProgress,
  setDiagnosisId,
  setStatus,
  setProfileNotFound,
  setCandidatesForSelection,
  resetDiagnosis,
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
