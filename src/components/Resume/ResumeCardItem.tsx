import React, { useState } from 'react';
import Card from './ResumeCard';

interface EditableCardItemProps {
  title: string;
}

const EditableCardItem: React.FC<EditableCardItemProps> = ({ title }) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = () => {
    setMode('view');
  };

  return (
    <Card title={title}>
      {mode === 'view' ? (
        <>
          <p>{formData.name || '제목 없음'}</p>
          <p>{formData.description || '내용 없음'}</p>
          <button onClick={() => setMode('edit')}>+ 작성</button>
        </>
      ) : (
        <>
          <label>제목</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="예: 정보처리기사 / S/W 공모전"
          />
          <label>설명</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="설명 입력"
          />
          <button onClick={handleSubmit}>완료</button>
        </>
      )}
    </Card>
  );
};

export default EditableCardItem;
