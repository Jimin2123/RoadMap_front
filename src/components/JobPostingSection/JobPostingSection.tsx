import React from 'react';
import JobCard from './JobCard';
import './JobPostingSection.css';

const JobPostingSection: React.FC = () => {
  const jobPostings = [
    { imageUrl: '/avatar.jpg', category: 'IT', company: '삼성전자', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '금융', company: '카카오뱅크', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '인터넷', company: '네이버', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '커머스', company: '쿠팡', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '게임', company: '넥슨', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '자동차', company: '현대자동차', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: 'IT', company: '라인', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '스타트업', company: '토스', companyLogoUrl: '/avatar.jpg' },
  ];

  return (
    <section className="job-posting">
      <h2>채용공고</h2>
      <div className="job-card-container">
        {jobPostings.map((job, index) => (
          <JobCard
            key={index}
            imageUrl={job.imageUrl}
            category={job.category}
            company={job.company}
            companyLogoUrl={job.companyLogoUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default JobPostingSection;
