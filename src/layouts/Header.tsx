import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBell, FaBars, FaCog } from 'react-icons/fa'; // 설정 아이콘 추가
import './Header.css';
import DropdownMenuCard from '../components/DropdownMenu/DropdownMenuCard';
import { useNavigate } from 'react-router-dom'; // 페이지 이동용

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={20} />
        </button>
        <FaMapMarkerAlt size={20} className="icon" />
        <span className="title">
          길라<span className="logo-job">JOB</span>
        </span>
      </div>
      <div className="header-right">
        <FaBell size={20} className="icon" />
        <FaCog size={20} className="icon" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} />
      </div>

      <DropdownMenuCard isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
