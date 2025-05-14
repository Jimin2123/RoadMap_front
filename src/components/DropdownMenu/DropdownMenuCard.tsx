// components/DropdownMenuCard.tsx
import React from 'react';
import './DropdownMenuCard.css';
import {
  FaHome,
  FaBullhorn,
  FaBriefcase,
  FaQuestionCircle,
  FaSignInAlt,
  FaCog,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
}

const DropdownMenuCard: React.FC<Props> = ({ isOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, label: '홈', description: '메인 페이지로 이동', onClick: () => navigate('/') },
    { icon: <FaBullhorn />, label: '공지사항', description: '새로운 소식을 확인하세요' },
    { icon: <FaBriefcase />, label: '채용정보', description: '채용공고를 확인해보세요' },
    { icon: <FaQuestionCircle />, label: '고객센터', description: '문의사항을 해결해드립니다' },
    { icon: <FaSignInAlt />, label: '로그인', description: '계정에 로그인하세요' },
    { icon: <FaCog />, label: '설정', description: '앱 환경을 설정하세요', onClick: () => navigate('/settings') }, // ✅ 설정 추가
  ];

  return (
    <div className={`dropdown-card-menu ${isOpen ? 'open' : ''}`}>
      {menuItems.map((item, index) => (
        <div className="card" key={index} onClick={item.onClick}>
          <div className="card-icon">{item.icon}</div>
          <div className="card-content">
            <div className="card-title">{item.label}</div>
            <div className="card-description">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenuCard;
