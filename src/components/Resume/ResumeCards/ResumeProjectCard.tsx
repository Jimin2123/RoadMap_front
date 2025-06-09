import { useState, ChangeEvent, useEffect } from 'react';
import Card from '../ResumeCard';
import styles from './ResumeProjectCard.module.css';

export interface ProjectCardData {
  name: string;
  period: string;
  techStack: string;
  description: string;
}

interface ResumeProjectCardProps {
  value?: ProjectCardData[];
  onChange?: (projects: ProjectCardData[]) => void;
}

const ResumeProjectCard: React.FC<ResumeProjectCardProps> = ({ value = [], onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [projects, setProjects] = useState<ProjectCardData[]>(value);
  const [formData, setFormData] = useState<ProjectCardData>({
    name: '',
    period: '',
    techStack: '',
    description: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    onChange?.(projects);
  }, [projects]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ name: '', period: '', techStack: '', description: '' });
    setEditIndex(null);
    setMode('form');
  };

  const handleEdit = (index: number) => {
    setFormData(projects[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setProjects((prev) => prev.map((item, idx) => (idx === editIndex ? formData : item)));
    } else {
      setProjects((prev) => [...prev, formData]);
    }
    setEditIndex(null);
    setMode('list');
  };

  const handleDelete = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {mode === 'list' ? (
        <Card title="프로젝트">
          {projects.length === 0 ? (
            <p>등록된 프로젝트가 없습니다.</p>
          ) : (
            <div className={styles.projectItemList}>
              {projects.map((p, i) => (
                <div key={i} className={styles.projectItem}>
                  <p className={styles.projectTitle}>
                    <strong>{p.name}</strong>
                  </p>
                  <p>{p.period}</p>
                  <p>{p.techStack}</p>
                  <p>{p.description}</p>
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
            + 프로젝트 추가
          </button>
        </Card>
      ) : (
        <Card title={editIndex !== null ? '프로젝트 수정' : '프로젝트 작성'}>
          <label>프로젝트명</label>
          <input
            name="name"
            type="text"
            placeholder="포트폴리오 웹사이트 제작"
            value={formData.name}
            onChange={handleChange}
          />
          <label>참여 기간</label>
          <input
            name="period"
            type="text"
            placeholder="2023.03 ~ 2023.05"
            value={formData.period}
            onChange={handleChange}
          />
          <label>기술 스택</label>
          <input
            name="techStack"
            type="text"
            placeholder="React, Node.js"
            value={formData.techStack}
            onChange={handleChange}
          />
          <label>설명</label>
          <textarea
            name="description"
            rows={3}
            placeholder="기능 및 역할 등 간단히 작성"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded">
              완료
            </button>
            <button type="button" onClick={() => setMode('list')} className="border px-4 py-1 rounded">
              취소
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ResumeProjectCard;
