import React from 'react';
import './PolicyCard.css'; // CSS 분리

interface PolicyCardProps {
  imageUrl: string;
  policyName: string;
  policyDescription: string;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ imageUrl, policyName, policyDescription }) => {
  return (
    <div className="policy-card">
      <img src={imageUrl} alt={policyName} className="policy-card-image" />
      <div className="policy-card-content">
        <h3 className="policy-card-title">{policyName}</h3>
        <p className="policy-card-description">{policyDescription}</p>
      </div>
    </div>
  );
};

export default PolicyCard;
