import React from 'react';
import Card from '../ResumeCard';
import { CareerCardData } from '../../../types/interfaces/ResumeData';
import styles from '../ResumeCard.module.css';

interface ResumeCareerCardProps {
  value: CareerCardData[];
  onChange: (value: CareerCardData[]) => void;
}

const ResumeCareerCard: React.FC<ResumeCareerCardProps> = ({ value, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        title: '',
        company: '',
        period: { startDate: '', endDate: '' },
        description: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof CareerCardData,
    fieldValue: string | { startDate: string } | { endDate: string }
  ) => {
    const newValues = [...value];
    if (field === 'period') {
      newValues[index].period = {
        ...newValues[index].period,
        ...(fieldValue as { startDate?: string; endDate?: string }),
      };
    } else {
      newValues[index][field] = fieldValue as string;
    }
    onChange(newValues);
  };

  return (
    <Card title="경력사항" fullWidth>
      {value.map((career, index) => (
        <div key={index} className={styles.item}>
          <input
            type="text"
            placeholder="회사명"
            value={career.company}
            onChange={(e) => handleChange(index, 'company', e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="직무명"
            value={career.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            className={styles.input}
          />
          <div className={styles.period}>
            <input
              type="date"
              value={career.period.startDate}
              onChange={(e) => handleChange(index, 'period', { startDate: e.target.value })}
            />
            <span>~</span>
            <input
              type="date"
              value={career.period.endDate}
              onChange={(e) => handleChange(index, 'period', { endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="직무 내용 및 주요 업무"
            value={career.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className={styles.textarea}
          />
          <button type="button" onClick={() => handleRemove(index)} className={styles.removeButton}>
            ×
          </button>
        </div>
      ))}
      <button onClick={handleAdd} className={styles.addButton}>
        경력 추가
      </button>
    </Card>
  );
};

export default ResumeCareerCard;
