import React from 'react';
import Card from '../ResumeCard';
import { DesiredJobCardData } from '../../../types/interfaces/ResumeData';
import styles from '../ResumeCard.module.css';
import { SalaryType } from '../../../types/enums/SalaryType';

interface ResumeDesiredJobCardProps {
  value: DesiredJobCardData;
  onChange: (value: DesiredJobCardData) => void;
}

const ResumeDesiredJobCard: React.FC<ResumeDesiredJobCardProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof DesiredJobCardData, fieldValue: string | number) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Card title="희망 직장 정보" fullWidth>
      <div className={styles.grid}>
        <input
          type="text"
          placeholder="희망 기업 1"
          value={value.desiredCompany1}
          onChange={(e) => handleChange('desiredCompany1', e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="희망 기업 2"
          value={value.desiredCompany2}
          onChange={(e) => handleChange('desiredCompany2', e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="희망 근무 지역"
          value={value.desiredRegion}
          onChange={(e) => handleChange('desiredRegion', e.target.value)}
          className={styles.input}
        />
        <div className={styles.salaryContainer} style={{ gridColumn: 'span 2' }}>
          <select
            value={value.salaryType}
            onChange={(e) => handleChange('salaryType', e.target.value as SalaryType)}
            className={styles.select}
          >
            <option value={SalaryType.ANNUAL}>연봉</option>
            <option value={SalaryType.MONTHLY}>월급</option>
            <option value={SalaryType.HOURLY}>시급</option>
          </select>
          <input
            type="number"
            placeholder="희망 급여 (만원)"
            value={value.desiredSalary}
            onChange={(e) => handleChange('desiredSalary', parseInt(e.target.value, 10) || 0)}
            className={styles.input}
          />
          <span>만원</span>
        </div>
      </div>
    </Card>
  );
};

export default ResumeDesiredJobCard;
