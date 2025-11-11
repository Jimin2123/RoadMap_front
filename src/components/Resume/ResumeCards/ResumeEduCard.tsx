import { ChangeEvent } from 'react';
import Card from '../ResumeCard';
import { EduCardData } from '../../../types/interfaces/ResumeData';
import styles from '../ResumeCard.module.css';

interface ResumeEduCardProps {
  value: EduCardData;
  onChange: (data: EduCardData) => void;
}

const ResumeEduCard: React.FC<ResumeEduCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: newValue } = e.target;

    if (name === 'startDate' || name === 'endDate') {
      onChange({
        ...value,
        period: {
          ...value.period,
          [name]: newValue,
        },
      });
    } else if (name === 'gpa') {
      onChange({ ...value, gpa: parseFloat(newValue) || 0 });
    } else {
      onChange({ ...value, [name]: newValue });
    }
  };

  return (
    <Card title="교육">
      <label>학교</label>
      <input name="school" type="text" placeholder="서울대학교" value={value.school} onChange={handleChange} />
      <label>전공</label>
      <input name="major" type="text" placeholder="컴퓨터공학과" value={value.major} onChange={handleChange} />
      <label>재학 기간</label>
      <div className={styles.period}>
        <input name="startDate" type="date" value={value.period.startDate} onChange={handleChange} />
        <span>~</span>
        <input name="endDate" type="date" value={value.period.endDate} onChange={handleChange} />
      </div>
      <label>학점 (GPA)</label>
      <input name="gpa" type="number" step="0.01" placeholder="4.3" value={value.gpa} onChange={handleChange} />
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
