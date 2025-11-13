import React from 'react';
import Card from '../ResumeCard';
import { CareerCardData } from '../../../types/interfaces/ResumeData';
import styles from './ResumeCareerCard.module.css';

interface ResumeCareerCardProps {
  value: CareerCardData[];
  onChange: (value: CareerCardData[]) => void;
}

const ResumeCareerCard: React.FC<ResumeCareerCardProps> = ({ value, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        companyName: '',
        period: { startDate: '', endDate: '' },
        department: '',
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
      {value.length === 0 ? (
        <div className={styles.emptyState}>
          <p>등록된 경력이 없습니다.</p>
          <p className={styles.emptyHint}>아래 버튼을 눌러 경력을 추가해주세요.</p>
        </div>
      ) : (
        value.map((career, index) => (
          <div key={index} className={styles.careerItem}>
            <div className={styles.careerHeader}>
              <span className={styles.careerNumber}>경력 {index + 1}</span>
              <button type="button" onClick={() => handleRemove(index)} className={styles.removeButton}>
                삭제
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                회사명 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="예: 주식회사 테크컴퍼니"
                value={career.companyName}
                onChange={(e) => handleChange(index, 'companyName', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                부서/직책 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="예: 개발팀, 백엔드 개발자"
                value={career.department}
                onChange={(e) => handleChange(index, 'department', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                재직 기간 <span className={styles.required}>*</span>
              </label>
              <div className={styles.periodWrapper}>
                <input
                  type="date"
                  value={career.period.startDate}
                  onChange={(e) => handleChange(index, 'period', { startDate: e.target.value })}
                  className={styles.dateInput}
                />
                <span className={styles.dateSeparator}>~</span>
                <input
                  type="date"
                  value={career.period.endDate}
                  onChange={(e) => handleChange(index, 'period', { endDate: e.target.value })}
                  className={styles.dateInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>주요 업무 및 성과</label>
              <textarea
                placeholder="담당했던 주요 업무와 성과를 구체적으로 작성해주세요.&#10;예:&#10;- 전자상거래 플랫폼 백엔드 API 개발&#10;- 결제 시스템 성능 개선 (응답 속도 30% 향상)&#10;- 신규 기능 개발 및 코드 리뷰"
                value={career.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className={styles.textarea}
                rows={6}
              />
            </div>
          </div>
        ))
      )}

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        + 경력 추가
      </button>
    </Card>
  );
};

export default ResumeCareerCard;
