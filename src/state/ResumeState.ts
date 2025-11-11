import { ResumeResponse } from '../types/interfaces/resume/response/ResumeResponse';

export interface ResumeState {
  resume: ResumeResponse | null;
  status: {
    create: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    update: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    get: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  };
  error: string | null;
}
