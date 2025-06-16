import React from 'react';
import './ServiceCard.css'; // CSS 분리
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  imageUrl: string;
  serviceName: string;
  serviceDescription: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageUrl, serviceName, serviceDescription, link }) => {
  return (
    <div className="service-card">
      <Link to={link} className="service-card-link">
        <img src={imageUrl} alt={serviceName} className="service-card-image" draggable="false" />
        <div className="service-card-content">
          <h3 className="service-card-title">{serviceName}</h3>
          <p className="service-card-description">{serviceDescription}</p>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
