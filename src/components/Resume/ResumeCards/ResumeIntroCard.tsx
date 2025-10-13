import React, { ChangeEvent } from 'react';
import Card from '../ResumeCard';
import { IntroCardData } from '../../../types/interfaces/ResumeData';
import styles from '../ResumeCard.module.css';

interface ResumeIntroCardProps {
  value: IntroCardData;
  onChange: (data: IntroCardData) => void;
}

const ResumeIntroCard: React.FC<ResumeIntroCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value: newValue } = e.target;
    onChange({ ...value, [name]: newValue });
  };

  return (
    <Card title="자기소개" fullWidth>
      <label>성장 과정</label>
      <textarea
        name="growthProcess"
        rows={6}
        placeholder="본인의 성장 과정을 구체적으로 작성해 주세요."
        value={value?.growthProcess ?? ''}
        onChange={handleChange}
        className={styles.textarea}
      />
      <label>강점</label>
      <textarea
        name="strengths"
        rows={6}
        placeholder="본인의 강점을 구체적인 경험을 바탕으로 작성해 주세요."
        value={value?.strengths ?? ''}
        onChange={handleChange}
        className={styles.textarea}
      />
      <label>지원 동기</label>
      <textarea
        name="motivation"
        rows={6}
        placeholder="해당 직무에 지원하게 된 동기를 작성해 주세요."
        value={value?.motivation ?? ''}
        onChange={handleChange}
        className={styles.textarea}
      />
    </Card>
  );
};

export default ResumeIntroCard;
