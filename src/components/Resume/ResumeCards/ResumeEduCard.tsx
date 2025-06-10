import { ChangeEvent } from 'react';
import Card from '../ResumeCard';

export interface EduCardData {
  school: string;
  major: string;
  period: string;
  status: string;
}

interface ResumeEduCardProps {
  value: EduCardData;
  onChange: (data: EduCardData) => void;
}

const ResumeEduCard: React.FC<ResumeEduCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: newValue } = e.target;
    onChange({ ...value, [name]: newValue });
  };

  return (
    <Card title="교육">
      <label>학교</label>
      <input name="school" type="text" placeholder="서울대학교" value={value.school} onChange={handleChange} />
      <label>전공</label>
      <input name="major" type="text" placeholder="컴퓨터공학과" value={value.major} onChange={handleChange} />
      <label>재학 기간</label>
      <input name="period" type="text" placeholder="2020.03 ~ 2024.02" value={value.period} onChange={handleChange} />
      <label>상태</label>
      <input name="status" type="text" placeholder="재학 / 졸업" value={value.status} onChange={handleChange} />
    </Card>
  );
};

export default ResumeEduCard;
