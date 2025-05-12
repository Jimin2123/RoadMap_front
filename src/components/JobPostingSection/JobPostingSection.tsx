import React, { useRef, useState } from 'react';
import JobCard from './JobCard';
import './JobPostingSection.css';

const JobPostingSection: React.FC = () => {
  const jobPostings = [
    { imageUrl: '/test.svg', category: 'IT', company: '삼성전자', companyLogoUrl: '/company-logo.svg' },
    { imageUrl: '/avatar.jpg', category: '금융', company: '카카오뱅크', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '인터넷', company: '네이버', companyLogoUrl: '/avatar.jpg' },
    { imageUrl: '/avatar.jpg', category: '커머스', company: '쿠팡', companyLogoUrl: '/avatar.jpg' },
    ...Array(60)
      .fill(null)
      .map((_, i) => ({
        imageUrl: '/avatar.jpg',
        category: '기타',
        company: `회사 ${i + 5}`,
        companyLogoUrl: '/avatar.jpg',
      })),
  ];

  const itemsPerPage = 20;
  const visiblePageCount = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(jobPostings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = jobPostings.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // 페이지 전환 후 스크롤 이동
      setTimeout(() => {
        paginationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1)
  );
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  return (
    <section className="job-posting">
      <h2>채용공고</h2>
      <div className="job-card-container">
        {currentItems.map((job, index) => (
          <JobCard
            key={startIndex + index}
            imageUrl={job.imageUrl}
            category={job.category}
            company={job.company}
            companyLogoUrl={job.companyLogoUrl}
          />
        ))}
      </div>

      <div className="pagination" ref={paginationRef}>
        <button className="page-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          );
        })}

        <button className="page-btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          ▶
        </button>
      </div>
    </section>
  );
};

export default JobPostingSection;
