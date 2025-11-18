import React, { useEffect, useState } from 'react';
import PolicyCard from '../components/PolicyCard/PolicyCard';
import '../styles/PolicyPage.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { YouthPolicyListResponse } from '../types/interfaces/apis/youthPolicy/YouthPolicyListResponse';
import { getPolicyListService } from '../services/policyService';

const PolicyPage: React.FC = () => {
  const [policyList, setPolicyList] = useState<YouthPolicyListResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 페이지당 아이템 수

  const totalPages = policyList ? Math.ceil(policyList.result.pagging.totCount / itemsPerPage) : 0;
  const currentItems = policyList?.result.youthPolicyList || [];

  // 현재 페이지 기준으로 10개씩 페이지 번호 보이도록 설정
  const maxPageButtons = 10;
  const startPage = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  useEffect(() => {
    const init = async () => {
      const response = await getPolicyListService(currentPage);

      if (response.result) {
        setPolicyList(response);
        setLoading(false);
      } else {
        setError('정책 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    init();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 이동시 상단으로 스크롤
  };

  return (
    <div className="layout">
      <Header />
      <div className="content-wrapper">
        <div className="maincontent">
          <div className="page-title">
            <h1>청년정책 통합검색</h1>
          </div>

          <section className="policy-list">
            {loading && <p>불러오는 중...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && currentItems.length > 0
              ? currentItems.map((policy) => <PolicyCard key={policy.plcyNo} {...policy} />)
              : !loading && !error && <p className="no-results-message">정책 정보가 없습니다.</p>}
          </section>
          {!loading && !error && totalPages > 0 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="이전 페이지"
              >
                ◀
              </button>

              {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const page = startPage + i;
                return (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => goToPage(page)}
                    aria-label={`${page}페이지`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                className="page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
              >
                ▶
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicyPage;
