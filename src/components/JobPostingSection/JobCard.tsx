import React, { useState } from 'react';
import './JobCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface JobCardProps {
  jobTitle: string;
  company: string;
  location: string;
  experience: string;
  education: string;
}

const JobCard: React.FC<JobCardProps> = ({ jobTitle, company, location, experience, education }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="job-card">
      <button className="favorite-button" onClick={toggleFavorite}>
        {isFavorited ? <FaStar color="#ffd700" /> : <FaRegStar color="#ccc" />}
      </button>
      <div className="job-info">
        <div className="job-title">{jobTitle}</div>
        <div className="job-company">{company}</div>
        <div className="job-details">
          <span>{location}</span> | <span>{experience}</span> | <span>{education}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
