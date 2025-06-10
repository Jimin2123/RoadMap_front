import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '../ResumeCard';

export interface IntroCardData {
  content: string;
}

interface ResumeIntroCardProps {
  value?: IntroCardData;
  onChange: (data: IntroCardData) => void;
}

const ResumeIntroCard: React.FC<ResumeIntroCardProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<IntroCardData>({ content: '' });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newData = { content: e.target.value };
    setFormData(newData);
    onChange(newData);
  };

  useEffect(() => {
    onChange(formData);
  }, []);

  return (
    <Card title="자기소개">
      <textarea
        rows={6}
        placeholder="직무 경험과 핵심 역량 등 구체적인 내용을 작성해 보세요."
        value={formData.content}
        onChange={handleChange}
      />
    </Card>
  );
};

export default ResumeIntroCard;
