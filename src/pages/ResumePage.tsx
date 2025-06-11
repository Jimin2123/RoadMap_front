import React from 'react';
import Header from '../layouts/Header';
import Resume from '../components/Resume/Resume';
import Footer from '../layouts/Footer';

const ResumePage: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Resume />
      <Footer />
    </div>
  );
};

export default ResumePage;
