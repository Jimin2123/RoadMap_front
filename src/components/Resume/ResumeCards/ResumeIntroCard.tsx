import React, { ChangeEvent } from 'react';
import Card from '../ResumeCard';
import { IntroCardData } from '../../../types/interfaces/ResumeData';

interface ResumeIntroCardProps {
  value: IntroCardData;
  onChange: (data: IntroCardData) => void;
}

const ResumeIntroCard: React.FC<ResumeIntroCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ content: e.target.value });
  };

  return (
    <Card title="자기소개">
      <textarea
        rows={6}
        placeholder="직무 경험과 핵심 역량 등 구체적인 내용을 작성해 보세요."
        value={value?.content ?? ''} // fallback 적용
        onChange={handleChange}
      />
    </Card>
  );
};

export default ResumeIntroCard;
