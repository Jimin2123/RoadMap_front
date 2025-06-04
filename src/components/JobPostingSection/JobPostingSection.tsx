import React, { useRef, useState } from 'react';
import JobCard from './JobCard';
import './JobPostingSection.css';

const JobPostingSection: React.FC = () => {
  // 더미 채용 공고 데이터 20개
  const jobPostings = [
    {
      jobTitle: '프론트엔드 개발자',
      company: '카카오',
      location: '성남시 분당구',
      experience: '경력 3년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '백엔드 개발자 (Spring Boot)',
      company: '네이버',
      location: '경기 성남시 분당구',
      experience: '경력 2년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '배터리 셀 공정 엔지니어',
      company: 'LG에너지솔루션',
      location: '충북 청주시 흥덕구',
      experience: '신입/경력 무관',
      education: '학사 이상',
    },
    {
      jobTitle: '차량 SW 플랫폼 개발자',
      company: '현대자동차',
      location: '서울 서초구',
      experience: '경력 3년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: 'AI 연구 Scientist',
      company: '삼성전자 DS부문',
      location: '경기 화성시',
      experience: '경력 1년 이상',
      education: '석사 이상',
    },
    {
      jobTitle: 'UI/UX 디자이너',
      company: '라인플러스',
      location: '서울 강남구',
      experience: '신입 가능',
      education: '학사 이상',
    },
    {
      jobTitle: 'DevOps 엔지니어',
      company: '쿠팡',
      location: '서울 송파구',
      experience: '경력 2년 이상',
      education: '무관',
    },
    {
      jobTitle: '데이터 엔지니어',
      company: '우아한형제들',
      location: '서울 송파구',
      experience: '경력 3년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '보안 컨설턴트',
      company: '안랩',
      location: '경기 성남시',
      experience: '신입/경력',
      education: '학사 이상',
    },
    {
      jobTitle: 'QA 엔지니어',
      company: '토스',
      location: '서울 강남구',
      experience: '경력 1년 이상',
      education: '무관',
    },
    {
      jobTitle: '게임 클라이언트 개발자',
      company: '넥슨',
      location: '경기 성남시 판교',
      experience: '경력 2년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '프로덕트 매니저(PM)',
      company: '당근마켓',
      location: '서울 서초구',
      experience: '경력 3년 이상',
      education: '무관',
    },
    {
      jobTitle: '마케팅 매니저',
      company: '야놀자',
      location: '서울 강남구',
      experience: '경력 2년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: 'iOS 개발자',
      company: '배달의민족',
      location: '서울 송파구',
      experience: '경력 1년 이상',
      education: '무관',
    },
    {
      jobTitle: 'Android 개발자',
      company: '무신사',
      location: '서울 성동구',
      experience: '경력 2년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '기계 설계 엔지니어',
      company: '현대모비스',
      location: '경기 용인시',
      experience: '신입/경력',
      education: '학사 이상',
    },
    { jobTitle: '해외영업', company: '삼성물산', location: '서울 강동구', experience: '신입', education: '학사 이상' },
    {
      jobTitle: '회계 담당자',
      company: '카카오엔터프라이즈',
      location: '성남시 분당구',
      experience: '경력 1년 이상',
      education: '학사 이상',
    },
    {
      jobTitle: '인사 HRD 매니저',
      company: 'SK하이닉스',
      location: '경기 이천시',
      experience: '경력 3년 이상',
      education: '석사 우대',
    },
    {
      jobTitle: '물류 SCM 기획',
      company: 'LG전자',
      location: '서울 영등포구',
      experience: '경력 2년 이상',
      education: '학사 이상',
    },
  ];

  const itemsPerPage = 12; // 한 페이지에 보여줄 항목 수
  const visiblePageCount = 3; // 하단에 보여질 페이지 번호 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const paginationRef = useRef<HTMLDivElement>(null); // 페이지 이동 시 스크롤 위치 조절을 위한 ref

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(jobPostings.length / itemsPerPage);

  // 현재 페이지의 시작 인덱스
  const startIndex = (currentPage - 1) * itemsPerPage;

  // 현재 페이지에 표시할 채용공고 목록
  const currentItems = jobPostings.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 전환 함수
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // 페이지 이동 후 스크롤 최상단으로 부드럽게 이동
      setTimeout(() => {
        paginationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  // 페이지 번호 범위 설정
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1)
  );
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  return (
    <section className="job-posting">
      <h2>채용공고</h2>

      {/* 채용공고 카드 목록 */}
      <div className="job-card-container">
        {currentItems.map((job, index) => (
          <JobCard
            key={startIndex + index}
            jobTitle={job.jobTitle}
            company={job.company}
            location={job.location}
            experience={job.experience}
            education={job.education}
          />
        ))}
        {/* 💡 더미 카드로 정렬 보정 */}
        {Array.from({ length: (3 - (currentItems.length % 3)) % 3 }).map((_, i) => (
          <div key={`dummy-${i}`} className="job-card dummy" />
        ))}
      </div>

      {/* 페이지네이션 버튼 영역 */}
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
