import React from 'react';
import './PolicyCard.css'; // 스타일 파일을 임포트

export interface PolicyCardProps {
  lclsfNm: string; // 정책 대분류명
  mclsfNm: string; // 정책 중분류명
  plcyNm: string; // 정책명
  plcyExplnCn: string; // 정책 설명
  aplyYmd: string; // 신청 기간
  plcyKywdNm: string; // 정책 키워드명
  aplyUrlAddr: string; // 신청 URL 주소
}

const PolictCard: React.FC<PolicyCardProps> = ({
  lclsfNm,
  mclsfNm,
  plcyNm,
  plcyExplnCn,
  aplyYmd,
  plcyKywdNm,
  aplyUrlAddr,
}) => {
  const normalizeUrl = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!aplyUrlAddr?.trim()) {
      e.preventDefault();
      alert('유효한 링크가 없습니다.');
    }
  };
  return (
    <div className="policy-card">
      <div className="tag-container">
        <div className="lclsfNm-container">
          <span className="lclsfNm">{lclsfNm}</span>
        </div>
        <div className="mclsfNm-container">
          <span className="mclsfNm">{mclsfNm}</span>
        </div>
      </div>
      <div className="title-container">
        <div className="plcyNm-container">
          <span className="plcyNm">{plcyNm}</span>
        </div>
      </div>
      <div className="description-container">
        <div className="plcyExplnCn-container">
          <span className="plcyExplnCn">{plcyExplnCn}</span>
        </div>
      </div>
      <div className="aplydate-container">
        <div className="aplyYmd-container">
          <strong>신청기간 : </strong>
          <span className="aplyYmd">{aplyYmd}</span>
        </div>
      </div>
      <div className="linkbutton-container">
        <div className="linkbutton">
          <a
            href={normalizeUrl(aplyUrlAddr)}
            className="link-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            자세히 보기
          </a>
        </div>
      </div>
      <div className="divider"></div>
      <div className="footer-tag-container">
        <div className="plcyKywdNm-container">
          <span className="plcyKywdNm">{plcyKywdNm}</span>
        </div>
      </div>
    </div>
  );
};

export default PolictCard;
