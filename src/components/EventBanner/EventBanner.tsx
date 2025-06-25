import React, { useState, useEffect } from 'react';
import './EventBanner.css';
import banner from '../../assets/banner.jpg'
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const banners = [
  { img: banner, title: '2025 봄맞이 취업 이벤트', subtitle: '지금 참여하고 다양한 혜택을 받아보세요!' },
  { img: banner2, title: 'AI 면접 연습 서비스', subtitle: '실전처럼 연습하고 취업 성공하세요!' },
  { img: banner3, title: '코딩 테스트 챌린지', subtitle: '매주 새로운 문제에 도전해 보세요!' },
];

const EventBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="event-banner">
      {banners.map((b, index) => (
        <div
          key={index}
          className={`event-banner-slide ${index === current ? 'active' : ''}`}
        >
          <img src={b.img} className="event-banner-image" alt={b.title} />
          <div className="event-banner-text">
          
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default EventBanner;
