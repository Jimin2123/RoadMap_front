import { useEffect } from 'react';
import Swal from 'sweetalert2';

type StatusType = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface UseSubmissionAlertProps {
  status: StatusType | { [key: string]: StatusType }; // 유연하게 처리
  target?: string; // ex) 'create' | 'update' 등
  error?: string | null;
  successMessage?: string;
  errorMessage?: string;
}

export const useSubmissionAlert = ({
  status,
  target = '',
  error,
  successMessage = '작업이 성공적으로 완료되었습니다.',
  errorMessage = '작업 중 문제가 발생했습니다.',
}: UseSubmissionAlertProps) => {
  useEffect(() => {
    const currentStatus: StatusType = typeof status === 'string' ? status : (status[target] as StatusType);

    if (currentStatus === 'pending') {
      Swal.fire({
        title: '처리 중입니다...',
        text: '잠시만 기다려주세요.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if (currentStatus === 'fulfilled') {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: '완료',
        text: successMessage,
      });
    }

    if (currentStatus === 'rejected') {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '실패',
        text: error || errorMessage,
      });
    }
  }, [status, error, target, successMessage, errorMessage]);
};
