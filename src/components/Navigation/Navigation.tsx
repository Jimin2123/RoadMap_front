import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/resume" className={({ isActive }) => (isActive ? styles.active : '')}>
        이력서 관리
      </NavLink>
      <NavLink to="/matching" className={({ isActive }) => (isActive ? styles.active : '')}>
        맞춤 채용 정보
      </NavLink>
      <NavLink to="/diagnosis" className={({ isActive }) => (isActive ? styles.active : '')}>
        역량 진단
      </NavLink>
      <NavLink to="/policy" className={({ isActive }) => (isActive ? styles.active : '')}>
        청년 지원정책
      </NavLink>
    </nav>
  );
};

export default Navigation;
