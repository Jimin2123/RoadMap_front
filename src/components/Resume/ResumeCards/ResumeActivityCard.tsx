import { useState, ChangeEvent } from 'react';
import Card from '../ResumeCard';
import styles from '../ResumeCard.module.css';
import { ActivityCardData } from '../../../types/interfaces/ResumeData';
import { FaPencilAlt } from 'react-icons/fa';

interface ResumeActivityCardProps {
  value?: ActivityCardData[];
  onChange?: (data: ActivityCardData[]) => void;
}

const ResumeActivityCard: React.FC<ResumeActivityCardProps> = ({ value = [], onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<ActivityCardData>({
    title: '',
    organization: '',
    period: { startDate: '', endDate: '' },
    description: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ title: '', organization: '', period: { startDate: '', endDate: '' }, description: '' });
    setEditIndex(null);
    setMode('form');
  };

  const handlePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      period: { ...prev.period, [name]: value },
    }));
  };

  const handleEdit = (index: number) => {
    setFormData(value[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    if (!onChange) return;

    const updated =
      editIndex !== null ? value.map((item, i) => (i === editIndex ? formData : item)) : [...value, formData];

    onChange(updated);
    setEditIndex(null);
    setMode('list');
  };

  const handleDelete = (index: number) => {
    if (!onChange) return;

    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return mode === 'list' ? (
    <Card title="대외활동">
      {value.length === 0 ? (
        <p>등록된 대외활동이 없습니다.</p>
      ) : (
        <div>
          {value.map((a, i) => (
            <div key={i} className={styles.item}>
              <p>
                <strong>{a.title}</strong>
              </p>
              <p>{a.organization}</p>
              <p>{`${a.period.startDate} ~ ${a.period.endDate}`}</p>
              <p>{a.description}</p>
              <div className={styles.actions}>
                <button type="button" onClick={() => handleEdit(i)} className={styles.btnSecondary}>
                  <FaPencilAlt />
                </button>
                <button type="button" onClick={() => handleDelete(i)} className={styles.removeButton}>
                  ×
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
      <input name="title" type="text" placeholder="봉사단, 해커톤 등" value={formData.title} onChange={handleChange} />
      <label>소속/기관</label>
      <input
        name="organization"
        type="text"
        placeholder="기관명 입력"
        value={formData.organization}
        onChange={handleChange}
      />
      <label>활동 기간</label>
      <div className={styles.period}>
        <input name="startDate" type="date" value={formData.period.startDate} onChange={handlePeriodChange} />
        <span>~</span>
        <input name="endDate" type="date" value={formData.period.endDate} onChange={handlePeriodChange} />
      </div>
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
  );
};

export default ResumeActivityCard;
