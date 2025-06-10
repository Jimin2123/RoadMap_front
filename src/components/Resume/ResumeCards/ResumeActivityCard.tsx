import { useState, ChangeEvent } from 'react';
import Card from '../ResumeCard';
import styles from './ResumeActivityCard.module.css';

export interface ActivityCardData {
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface ResumeActivityCardProps {
  value?: ActivityCardData[];
  onChange?: (data: ActivityCardData[]) => void;
}

const ResumeActivityCard: React.FC<ResumeActivityCardProps> = ({ onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [activities, setActivities] = useState<ActivityCardData[]>([]);
  const [formData, setFormData] = useState<ActivityCardData>({
    title: '',
    organization: '',
    period: '',
    description: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ title: '', organization: '', period: '', description: '' });
    setEditIndex(null);
    setMode('form');
  };

  const handleEdit = (index: number) => {
    setFormData(activities[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    const newActivities =
      editIndex !== null ? activities.map((item, i) => (i === editIndex ? formData : item)) : [...activities, formData];

    setActivities(newActivities);
    setEditIndex(null);
    setMode('list');
    onChange?.(newActivities);
  };

  const handleDelete = (index: number) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
    onChange?.(newActivities);
  };

  return (
    <>
      {mode === 'list' ? (
        <Card title="대외활동">
          {activities.length === 0 ? (
            <p>등록된 대외활동이 없습니다.</p>
          ) : (
            <div className={styles.activityItemList}>
              {activities.map((a, i) => (
                <div key={i} className={styles.activityItem}>
                  <p className={styles.activityTitle}>
                    <strong>{a.title}</strong>
                  </p>
                  <p>{a.organization}</p>
                  <p>{a.period}</p>
                  <p>{a.description}</p>
                  <div className={styles.actions}>
                    <button onClick={() => handleEdit(i)} className={styles.editButton}>
                      수정
                    </button>
                    <button onClick={() => handleDelete(i)} className={styles.deleteButton}>
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button type="button" onClick={handleAddClick} className={styles.addButton}>
            + 대외활동 추가
          </button>
        </Card>
      ) : (
        <Card title={editIndex !== null ? '대외활동 수정' : '대외활동 작성'}>
          <label>활동명</label>
          <input
            name="title"
            type="text"
            placeholder="봉사단, 해커톤 등"
            value={formData.title}
            onChange={handleChange}
          />
          <label>소속/기관</label>
          <input
            name="organization"
            type="text"
            placeholder="기관명 입력"
            value={formData.organization}
            onChange={handleChange}
          />
          <label>활동 기간</label>
          <input
            name="period"
            type="text"
            placeholder="2022.01 ~ 2022.06"
            value={formData.period}
            onChange={handleChange}
          />
          <label>활동 상세 설명</label>
          <textarea
            name="description"
            rows={6}
            placeholder="활동 내용과 본인의 역할, 기여도 등 구체적인 내용을 작성해보세요."
            value={formData.description}
            onChange={handleChange}
          />
          <div className={styles.btnGroup}>
            <button type="button" onClick={handleSave} className={styles.btnPrimary}>
              완료
            </button>
            <button type="button" onClick={() => setMode('list')} className={styles.btnSecondary}>
              취소
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ResumeActivityCard;
