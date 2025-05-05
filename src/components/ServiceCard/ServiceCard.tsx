import React from 'react';
import './ServiceCard.css'; // CSS 분리

interface ServiceCardProps {
  imageUrl: string;
  serviceName: string;
  serviceDescription: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageUrl, serviceName, serviceDescription }) => {
  return (
    <div className="service-card">
      <img src={imageUrl} className="service-card-image" />
      <div className="service-card-content">
        <h3 className="service-card-title">{serviceName}</h3>
        <p className="service-card-description">{serviceDescription}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
