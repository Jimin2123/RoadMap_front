import React, { useState, ChangeEvent, useEffect } from 'react';
import Card from '../ResumeCard';
import styles from './ResumeCertCard.module.css';

export interface CertCardData {
  name: string;
  agency: string;
  year: string;
}

interface Props {
  value?: CertCardData[];
  onChange: (certs: CertCardData[]) => void;
}

const ResumeCertCard: React.FC<Props> = ({ onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [certs, setCerts] = useState<CertCardData[]>([]);
  const [formData, setFormData] = useState<CertCardData>({
    name: '',
    agency: '',
    year: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    onChange(certs);
  }, [certs, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ name: '', agency: '', year: '' });
    setEditIndex(null);
    setMode('form');
  };

  const handleEdit = (index: number) => {
    setFormData(certs[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setCerts((prev) => prev.map((item, i) => (i === editIndex ? formData : item)));
    } else {
      setCerts((prev) => [...prev, formData]);
    }
    setEditIndex(null);
    setMode('list');
  };

  const handleDelete = (index: number) => {
    setCerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {mode === 'list' ? (
        <Card title="자격증">
          {certs.length === 0 ? (
            <p>등록된 자격증이 없습니다.</p>
          ) : (
            <div className={styles.certList}>
              {certs.map((cert, i) => (
                <div key={i} className={styles.certItem}>
                  <p className={styles.certTitle}>
                    <strong>{cert.name}</strong>
                  </p>
                  <p>{cert.agency}</p>
                  <p>{cert.year}</p>
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
            + 자격증 추가
          </button>
        </Card>
      ) : (
        <Card title={editIndex !== null ? '자격증 수정' : '자격증 입력'}>
          <label>자격증명</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="정보처리기사" />
          <label>발급 기관</label>
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleChange}
            placeholder="한국산업인력공단"
          />
          <label>취득 연도</label>
          <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="2023" />
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

export default ResumeCertCard;
