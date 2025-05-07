import React, { useState } from 'react';
import './JobCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface JobCardProps {
  imageUrl: string;
  category: string;
  company: string;
  companyLogoUrl: string;
}

const JobCard: React.FC<JobCardProps> = ({ imageUrl, category, company, companyLogoUrl }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="job-card">
      <div className="job-card-image-container">
        <img src={imageUrl} alt={company} className="job-card-image" />
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorited ? <FaStar color="#ffd700" /> : <FaRegStar color="#ccc" />}
        </button>
      </div>
      <div className="job-card-info">
        <div className="job-text-info">
          <div className="job-category">{category}</div>
          <div className="job-company">{company}</div>
        </div>
        <div className="job-card-logo-container">
          <img src={companyLogoUrl} alt={`${company} 로고`} className="job-card-logo" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
