import React, { useState } from 'react';
import { FaMapMarkedAlt, FaBell, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';
import DropdownMenuCard from '../components/DropdownMenu/DropdownMenuCard';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={20} />
        </button>
        <Link to={'/'}>
          <FaMapMarkedAlt size={20} />
        </Link>
        <Link to="/" className="title">
          길라<span className="logo-job">JOB</span>
        </Link>
      </div>
      <div className="header-right">
        <FaBell size={20} className="icon" />
      </div>

      <DropdownMenuCard isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
