import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import './JobPostingSection.css';
import { getJobsListService } from '../../services/taskService';
import { Jobs, SaraminJobListResponse } from '../../types/interfaces/response/SaraminJobListResponse';
import { educationLevelMap } from '../../utils/educationLevelMap';
import { convertKeysToCamelCase } from '../../utils/caseConvert';

const itemsPerPage = 20;
const visiblePageCount = 10;

const JobPostingSection: React.FC = () => {
  const [jobsData, setJobsData] = useState<Jobs | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobsList = async (page: number) => {
    try {
      const start = (page - 1) * itemsPerPage + 1;
      const response: SaraminJobListResponse = await getJobsListService(start);
      const convertedJobs = convertKeysToCamelCase(response.jobs);
      setJobsData(convertedJobs as Jobs);
      setCurrentPage(page);
      console.log('채용 공고를 성공적으로 불러왔습니다:');
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
