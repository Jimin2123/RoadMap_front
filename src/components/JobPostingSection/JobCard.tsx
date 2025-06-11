import React, { useState } from 'react';
import './JobCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { filterWholeAreas } from '../../utils/locationUtils';

interface JobCardProps {
  jobTitle: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  companyLogoUrl: string;
}

const JobCard: React.FC<JobCardProps> = ({ jobTitle, company, location, experience, education, companyLogoUrl }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  // 필터링된 location 생성
  const filteredLocation = filterWholeAreas(location);

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="job-card-image" style={{ backgroundImage: `url(${companyLogoUrl})` }} />
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorited ? <FaStar color="#ffd700" /> : <FaRegStar color="#ccc" />}
        </button>
      </div>
      <div className="job-info">
        <div className="job-title-section">
          <h3 className="job-title">{jobTitle}</h3>
        </div>
        <div className="job-company-section">
          <p className="job-company">{company}</p>
        </div>
        <div className="job-details-section">
          <span>{filteredLocation || location}</span> | <span>{experience}</span> | <span>{education}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
