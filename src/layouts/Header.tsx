import React, { useState } from 'react';
import { FaBell, FaBars, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import DropdownMenuCard from '../components/DropdownMenu/DropdownMenuCard';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../types/store';

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <button className={styles['menu-button']} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={20} />
        </button>
        <Link to={'/'}>{/* <img src="/icons/map.svg" /> */}</Link>
        <Link to="/" className="title">
          길라<span className="logo-job">JOB</span>
        </Link>
      </div>

      <div className={styles['header-right']}>
        {isAuthenticated ? (
          <>
            <FaBell size={20} className={styles.icon} />
            <FaCog
              size={20}
              className={styles.icon}
              onClick={() => navigate('/settings')}
              style={{ cursor: 'pointer' }}
            />
          </>
        ) : (
          <button className={styles['login-button']} onClick={() => navigate('/login')}>
            로그인
          </button>
        )}
      </div>

      <DropdownMenuCard isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
