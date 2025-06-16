import React from 'react';
import Header from '../layouts/Header';
import Resume from '../components/Resume/Resume';
import Footer from '../layouts/Footer';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../types/store';
import ResumeView from '../components/Resume/ResumeView';

const ResumePage: React.FC = () => {
  const { member, status } = useAppSelector((state: RootState) => state.user);

  if (status.getMember === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout">
      <Header />
      {member?.profile !== null ? <ResumeView /> : <Resume />}

      <Footer />
    </div>
  );
};

export default ResumePage;
