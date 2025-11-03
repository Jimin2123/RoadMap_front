import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../layouts/Header';
import Resume from '../components/Resume/Resume';
import Footer from '../layouts/Footer';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../state/store';
import ResumeView from '../components/Resume/ResumeView';

const ResumePage: React.FC = () => {
  const { member, status } = useAppSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isEditMode = searchParams.get('mode') === 'edit';

  if (status.getMember === 'pending') {
    return <div>Loading...</div>;
  }

  const handleSubmissionSuccess = () => {
    navigate('/resume', { replace: true });
  };

  return (
    <div className="layout">
      <Header />
      {member && member.profile && !isEditMode ? (
        <ResumeView member={member} />
      ) : (
        <Resume member={member} onSubmissionSuccess={handleSubmissionSuccess} />
      )}

      <Footer />
    </div>
  );
};

export default ResumePage;
