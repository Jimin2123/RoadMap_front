import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import './JobPostingSection.css';
import { getJobsListService } from '../../services/taskService';
import { Jobs, SaraminJobListResponse } from '../../types/interfaces/apis/saramin/response/SaraminJobListResponse';
import { educationLevelMap } from '../../utils/educationLevelMap';
import { convertKeysToCamelCase } from '../../utils/caseConvert';

const itemsPerPage = 20;
const visiblePageCount = 10;

const JobPostingSection: React.FC = () => {
  const [jobsData, setJobsData] = useState<Jobs | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobsList = async (page: number) => {
    try {
      // [수정 전] 사람인 원본 API 방식 (start index 계산) -> 백엔드 입장에선 page=1, page=21... 로 인식되어 문제 발생
      // const start = (page - 1) * itemsPerPage + 1;

      // [수정 후] Spring Boot Pageable 방식 (0부터 시작하는 페이지 번호)
      // UI에서는 1페이지지만, 백엔드에는 0을 달라고 해야 함 -> 캐시 적중! 🚀
      const pageIndex = page - 1;

      // taskService 쪽에서도 인자 이름을 start가 아니라 page로 생각하고 넘겨주세요
      const response: SaraminJobListResponse = await getJobsListService(pageIndex);

      const convertedJobs = convertKeysToCamelCase(response.jobs);
      setJobsData(convertedJobs as Jobs);
      setCurrentPage(page);
    } catch (error) {
      console.error('채용 공고를 불러오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchJobsList(1);
  }, []);

  const totalJobs = jobsData ? parseInt(jobsData.total, 10) : 0;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1)
  );
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  const jobList = Array.isArray(jobsData?.job) ? jobsData.job : [];

  return (
    <section className="job-posting">
      <h2>채용공고</h2>

      <div className="job-card-container">
        {jobList.length === 0 && <div>공고 없음</div>}
        {jobList.map((job) => {
          return (
            <JobCard
              key={job.id}
              companyLogoUrl={job.company?.detail?.logoUrl || ''}
              jobTitle={job.position?.title || ''}
              company={job.company?.detail?.name || ''}
              location={job.position?.location?.name || ''}
              experience={job.position?.experienceLevel?.name || ''}
              education={educationLevelMap[job.position?.requiredEducationLevel?.name] || ''}
              url={job.url || ''}
            />
          );
        })}
        {jobList.length > 0 &&
          Array.from({ length: (3 - (jobList.length % 3)) % 3 }).map((_, i) => (
            <div key={`dummy-${i}`} className="job-card dummy" />
          ))}
      </div>

      <div className="pagination">
        <button className="page-btn" onClick={() => fetchJobsList(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => fetchJobsList(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="page-btn"
          onClick={() => fetchJobsList(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default JobPostingSection;
