import React from 'react';
import './PolicyCard.css'; // 스타일 파일을 임포트
import { YouthPolicyItemResponse } from '../../types/interfaces/response/YouthPolicyItemResponse';
import { openExternalUrl } from '../../utils/openExternalUrl';

const PolictCard: React.FC<YouthPolicyItemResponse> = ({
  lclsfNm,
  mclsfNm,
  plcyNm,
  plcyExplnCn,
  aplyYmd,
  plcyKywdNm,
  aplyUrlAddr,
}) => {
  // const normalizeUrl = (url: string): string => {
  //   if (!/^https?:\/\//i.test(url)) {
  //     return 'https://' + url;
  //   }
  //   return url;
  // };

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   if (!aplyUrlAddr?.trim()) {
  //     e.preventDefault();
  //     alert('유효한 링크가 없습니다.');
  //   }
  // };
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
            href={'#'}
            className="link-button"
            onClick={(e) => {
              e.preventDefault();
              openExternalUrl(aplyUrlAddr, `${plcyNm}은/는 신청 가능한 링크가 없습니다.`);
            }}
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
