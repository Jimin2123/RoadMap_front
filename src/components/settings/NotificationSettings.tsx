import React from 'react';
import './NotificationSettings.css';

const NotificationSettings: React.FC = () => {
  const data = [
    {
      title: '청년 취업 지원금 정책',
      items: ['배움카드 지원', '혼자 사는 청년들 지원금'],
    },
    {
      title: '채용 공고',
      items: ['A회사 채용 공고', 'B회사 채용 공고', 'C회사 채용 공고'],
    },
    {
      title: '교육 신청',
      items: [
        '~~교육 신청',
        'AWS자격증 시험 공고',
        '~~ 암튼 부족한거 채우는거',
      ],
    },
  ];

  return (
    <div className="notification-wrapper">
      <div className="notification-header">
        <h2>알림</h2>
        <div className="notification-controls">
          <span className="icon">🔕</span>
          <a href="#" className="manage-link">관리</a>
          <input type="checkbox" className="master-checkbox" />
        </div>
      </div>

      {data.map((section, i) => (
        <div key={i} className="notification-section">
          <ul>
            <li><strong>• {section.title}</strong></li>
            {section.items.map((item, j) => (
              <li key={j}>• {item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
