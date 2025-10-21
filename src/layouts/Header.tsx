import React, { useState } from 'react';
import { FaBell, FaBars, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';
import DropdownMenuCard from '../components/DropdownMenu/DropdownMenuCard';
import { useNavigate } from 'react-router-dom'; // 페이지 이동용
import { useAppSelector } from '../store/hooks';
import { RootState } from '../types/store';

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={20} />
        </button>
        <Link to={'/'}>{/* <img src="/icons/map.svg" /> */}</Link>
        <Link to="/" className="title">
          길라<span className="logo-job">JOB</span>
        </Link>
      </div>
      {isAuthenticated && (
        <div className="header-right">
          <FaBell size={20} className="icon" />
          <FaCog size={20} className="icon" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} />
        </div>
      )}

      <DropdownMenuCard isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
