import { useState, ChangeEvent } from 'react';
import Card from '../ResumeCard';
import styles from './ResumePortfolioCard.module.css';
import { PortfolioCardData } from '../../../types/interfaces/ResumeData';

interface ResumePortfolioCardProps {
  value?: PortfolioCardData[];
  onChange?: (portfolios: PortfolioCardData[]) => void;
}

const ResumePortfolioCard: React.FC<ResumePortfolioCardProps> = ({ value = [], onChange = () => {} }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<PortfolioCardData>({ title: '', url: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ title: '', url: '' });
    setEditIndex(null);
    setMode('form');
  };

  const handleEdit = (index: number) => {
    setFormData(value[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    const updated =
      editIndex !== null ? value.map((item, idx) => (idx === editIndex ? formData : item)) : [...value, formData];

    onChange(updated);
    setMode('list');
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return mode === 'list' ? (
    <Card title="포트폴리오">
      {value.length === 0 ? (
        <p>등록된 포트폴리오가 없습니다.</p>
      ) : (
        <div className={styles.portfolioList}>
          {value.map((p, i) => (
            <div key={i} className={styles.portfolioItem}>
              <p className={styles.portfolioTitle}>
                <strong>{p.title}</strong>
              </p>
              <p>{p.url}</p>
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
        + 포트폴리오 추가
      </button>
    </Card>
  ) : (
    <Card title={editIndex !== null ? '포트폴리오 수정' : '포트폴리오 작성'}>
      <label>포트폴리오 제목</label>
      <input
        name="title"
        type="text"
        placeholder="청년취업역량증진 길라잡이"
        value={formData.title}
        onChange={handleChange}
      />
      <label>포트폴리오 URL</label>
      <input
        name="url"
        type="url"
        placeholder="https://yourportfolio.com"
        value={formData.url}
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

export default ResumePortfolioCard;
