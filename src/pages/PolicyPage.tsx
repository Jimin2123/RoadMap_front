import React, { useEffect, useState } from 'react';
import PolicyCard from '../components/PolicyCard/PolicyCard';
import '../styles/PolicyPage.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { YouthPolicyListResponse } from '../types/interfaces/response/YouthPolicyResponse';
import { getPolicyListService } from '../services/policyService';

type Category = {
  id: string;
  name: string;
  content: string;
};

const PolicyPage: React.FC = () => {
  const [policyList, setPolicyList] = useState<YouthPolicyListResponse>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('policyIndex');

  const categories: Category[] = [
    { id: 'policyIndex', name: '청년정책 개요', content: '청년정책 개요' },
    { id: 'policyList', name: '청년정책 통합검색', content: '청년정책 통합검색' },
  ];
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
    console.log(`현재 페이지: ${page}`);
  };

  return (
    <div className="layout">
      <Header />
      <div className="content-wrapper">
        {/* 왼쪽 사이드바: 카테고리 메뉴 */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>청년정책</h1>
          </div>

          <ul className="category-menu">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={selectedCategory === cat.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="maincontent">
          {selectedCategory === 'policyList' && (
            <>
              <div className="page-title">
                <h1>청년정책 통합검색</h1>
              </div>

              <section className="policy-list">
                {loading && <p>불러오는 중...</p>}
                {error && <p>{error}</p>}

                {currentItems.length > 0 ? (
                  currentItems.map((policy) => <PolicyCard key={policy.plcyNo} {...policy} />)
                ) : (
                  <p className="no-results-message">정책 정보가 없습니다.</p>
                )}
              </section>

              <div className="pagination">
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
                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </>
          )}
          {selectedCategory === 'policyIndex' && (
            <div className="main-content">
              <div className="overview-title">
                <h1>청년정책 개요</h1>
              </div>
              <div className="overview-header">
                <h2>청년의 삶을 더 나은 방향으로 !</h2>
                <p>일자리, 주거, 복지 등 청년의 자립을 지원하는 다양한 정책 정보를 제공합니다.</p>
              </div>
              <div className="overview-section">
                <div className="policy-fields">
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책이란 ?
                    </h2>
                    <p>
                      청년정책은 청년 세대가 직면한 다양한 문제를 해결하고, 더 나은 삶을 살 수 있도록 정부와 사회가 함께
                      설계한 종합적인 지원 정책입니다. 목표는 청년의 삶의 질 향상, 사회참여 촉진, 그리고 기회보장입니다.
                    </p>
                  </div>
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책 수립 과정
                    </h2>
                    <p>문제 파악 → 정책 설계 → 제안 및 검토 → 실행 계획 수립 → 정책 시행 → 평가 및 개선</p>
                  </div>
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책은 누구를 위한 정책일까 ?
                    </h2>
                    <p>
                      청년의 연령대는 만 19세 ~ 34세까지의 재직자, 구직자, 대학생, 창업 준비 중인 청년 등을 위한
                      다양하고 편리한 정책입니다.
                    </p>
                  </div>
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책에는 무슨 혜택이 있을까 ?
                    </h2>
                    <li>
                      <strong>취업 지원</strong> : 직업 훈련, 취업 프로그램, 인턴십 기회 제공
                    </li>
                    <li>
                      <strong>주거 지원</strong> : 전세 자금 대출, 청년 임대 주택
                    </li>
                    <li>
                      <strong>금융 지원</strong> : 청년 희망적금, 청년내일저축계좌
                    </li>
                    <li>
                      <strong>교육/역량 강화</strong> : 자격증, 교육비 지원, 창업 멘토링
                    </li>
                  </div>
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책이 왜 좋은건데 ?
                    </h2>
                    <p>
                      청년정책은 청년들의 미래를 긍정적으로 변화시키고 사회 전체에 긍정적인 영향을 미칠 수 있습니다.
                    </p>
                  </div>
                  <div className="field-card">
                    <h2>
                      <img src="/icons/map.svg" />
                      청년정책이 여러분의 미래를 여는 든든한 시작점이 될 수 있도록, 언제나 응원하고 지원하겠습니다.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicyPage;
