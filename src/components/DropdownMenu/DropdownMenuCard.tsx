// components/DropdownMenuCard.tsx
import React from 'react';
import './DropdownMenuCard.css';
import { FaHome, FaBullhorn, FaBriefcase, FaQuestionCircle, FaSignInAlt, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface Props {
  isOpen: boolean;
}

const menuItems = [
  { icon: <FaHome />, label: '홈', description: '메인 페이지로 이동', path: '/' },
  { icon: <FaSignInAlt />, label: '로그인', description: '계정에 로그인하세요', path: '/login' }, // 로그인 항목
  { icon: <FaBullhorn />, label: '공지사항', description: '새로운 소식을 확인하세요', path: '/notices' },
  { icon: <FaBriefcase />, label: '채용정보', description: '채용공고를 확인해보세요', path: '/jobs' },
  { icon: <FaQuestionCircle />, label: '고객센터', description: '문의사항을 해결해드립니다', path: '/support' },
  { icon: <FaCog />, label: '설정', description: '환경 및 계정 설정을 관리하세요', path: '/settings' }, // ✅ 설정 추가

];


const DropdownMenuCard: React.FC<Props> = ({ isOpen }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className={`dropdown-card-menu ${isOpen ? 'open' : ''}`}>
      {menuItems
        .filter((item) => !(item.path === '/login' && isAuthenticated)) // 로그인 상태일 때 '로그인' 항목 제거
        .map((item, index) => (
          <Link to={item.path} key={index} className="card-link">
            <div className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-content">
                <div className="card-title">{item.label}</div>
                <div className="card-description">{item.description}</div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default DropdownMenuCard;
