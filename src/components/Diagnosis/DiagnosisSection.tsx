import React, { ReactNode } from 'react';
import styles from './DiagnosisSection.module.css';

interface DiagnosisSectionProps {
  title: string;
  children: ReactNode;
}

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default DiagnosisSection;
