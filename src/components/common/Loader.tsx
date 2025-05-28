import React from 'react';

const Loader: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div className="spinner" />
      <p>잠시만 기다려 주세요...</p>

      <style>
        {`
          .spinner {
            margin: 0 auto;
            width: 40px;
            height: 40px;
            border: 4px solid #ccc;
            border-top-color: #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
