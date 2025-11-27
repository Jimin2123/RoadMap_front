import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface DiagnosisAlertProps {
  profileNotFound: boolean;
  onReset: () => void;
}

/**
 * Component that handles displaying alerts for diagnosis errors (e.g., profile not found).
 * Shows a SweetAlert2 modal and redirects to resume page when profile is missing.
 */
const DiagnosisAlert = ({ profileNotFound, onReset }: DiagnosisAlertProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (profileNotFound) {
      Swal.fire({
        title: '프로필 필요',
        text: '역량 진단을 위해서는 이력서 정보가 필요합니다. 이력서 작성 페이지로 이동합니다.',
        icon: 'warning',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/resume');
        onReset();
      });
    }
  }, [profileNotFound, navigate, onReset]);

  return null; // This component only handles side effects
};

export default DiagnosisAlert;
