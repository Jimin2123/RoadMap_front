import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBell, FaBars } from 'react-icons/fa';
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
        <FaMapMarkerAlt size={20} className="icon" />
        <span className="title">
          길라<span className="logo-job">JOB</span>
        </span>
      </div>
      <div className="header-right">
        <FaBell size={20} className="icon" />
      </div>

      <DropdownMenuCard isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
