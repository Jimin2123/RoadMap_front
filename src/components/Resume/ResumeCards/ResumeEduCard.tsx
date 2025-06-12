import { ChangeEvent } from 'react';
import Card from '../ResumeCard';
import { EduCardData } from '../../../types/interfaces/ResumeData';

interface ResumeEduCardProps {
  value: EduCardData;
  onChange: (data: EduCardData) => void;
}

const ResumeEduCard: React.FC<ResumeEduCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <select name="status" value={value.status} onChange={handleChange}>
        <option value="">선택</option>
        <option value="재학">재학</option>
        <option value="졸업">졸업</option>
        <option value="휴학">휴학</option>
      </select>
    </Card>
  );
};

export default ResumeEduCard;
