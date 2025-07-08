import React, { useState, useEffect } from 'react';
import './EventBanner.css';
import banner from '../../assets/banner.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const banners = [{ img: banner }, { img: banner2 }, { img: banner3 }]; //배너 넣을곳

const EventBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 1000); //배너 넘어가는 속도 1000
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="event-banner">
      {banners.map((b, index) => (
        <div key={index} className={`event-banner-slide ${index === current ? 'active' : ''}`}>
          <img src={b.img} className="event-banner-image" alt={`배너 ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default EventBanner;
