import React, { ReactNode } from 'react';
import styles from './ResumeCard.module.css';

interface CardProps {
  title: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, fullWidth }) => {
  return (
    <section className={`${styles.card} ${fullWidth ? styles.fullWidth : ''}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Card;
