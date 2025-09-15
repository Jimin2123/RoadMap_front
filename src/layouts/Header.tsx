import React, { useState, useEffect } from 'react';
import { FaBell, FaBars, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import DropdownMenuCard from '../components/DropdownMenu/DropdownMenuCard';
import Navigation from '../components/Navigation/Navigation';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../types/store';

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        {isMobile && (
          <button className={styles['menu-button']} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars size={20} />
          </button>
        )}
        <Link to={'/'}>
          <img src="/icons/map.svg" alt="Logo" />
        </Link>
        <Link to="/" className={styles.title}>
          길라<span className={styles['logo-job']}>JOB</span>
        </Link>
      </div>

      {!isMobile && <div className={styles['header-center']}><Navigation /></div>}

      <div className={styles['header-right']}>
        {isAuthenticated ? (
          <>
            <FaBell size={20} className={styles.icon} />
            <FaCog size={20} className={styles.icon} onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} />
          </>
        ) : (
          !isMobile && <button className={styles['login-button']} onClick={() => navigate('/login')}>로그인</button>
        )}
      </div>

      {isMobile && <DropdownMenuCard isOpen={isMenuOpen} />}
    </header>
  );
};

export default Header;
