import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PolicyCard, { PolicyCardProps } from '../components/PolicyCard/PolicyCard';
import '../styles/PolicyPage.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const PolicyPage: React.FC = () => {
  const [policyList, setPolicyList] = useState<PolicyCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 상태 추가
  const [searchKeyword, setSearchKeyword] = useState('');
  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 페이지당 아이템 수

  // 검색어 기반 필터링
  const filteredPolicies = policyList.filter((policy) =>
    policy.plcyNm.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // 페이징 계산은 필터된 리스트 기준으로// 페이징은 필터된 결과 기준으로
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPolicies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get<PolicyCardProps[]>('http://localhost:8080/api/v1/policy')
      .then((res) => {
        setPolicyList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('정책 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  // 샘플 카테고리 배열 (원하는 값으로 교체 가능)
  const categories = ['일자리', '창업', '교육', '복지', '문화'];

  // // 페이징 계산
  // const totalPages = Math.ceil(policyList.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = policyList.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="policy-page">
      <Header />
      <div className="content-wrapper">
        {/* 왼쪽 사이드바: 카테고리 메뉴 */}
        <aside className="sidebar">
          <h2>카테고리</h2>
          <ul>
            {categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </aside>
        <div className="maincontet">
          <div className="page-title">
            <h1>청년 정책</h1>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="정책명을 입력하세요..."
              className="search-input"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1); // 검색어 바뀌면 1페이지로 초기화
              }}
            />
            <button className="search-button">검색</button>
          </div>
          {/* 오른쪽 컨텐츠 영역: 정책 카드 리스트 + 페이징 */}
          <section className="policy-list">
            {loading && <p>불러오는 중...</p>}
            {error && <p>{error}</p>}

            {currentItems.map((policy, index) => (
              <PolicyCard
                key={index}
                lclsfNm={policy.lclsfNm}
                mclsfNm={policy.mclsfNm}
                plcyNm={policy.plcyNm}
                plcyExplnCn={policy.plcyExplnCn}
                aplyYmd={policy.aplyYmd}
                plcyKywdNm={policy.plcyKywdNm}
              />
            ))}
          </section>
          {/* 페이지네이션 */}
          <div className="pagination">
            <button className="page-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicyPage;
