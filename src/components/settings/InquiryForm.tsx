import { useState } from 'react';
import { Inquiry } from '../../types/Inquiry';
import './InquiryForm.css';

interface Props {
  onSubmit: (inquiry: Inquiry) => void;
  onViewHistory: () => void;
}

const InquiryForm = ({ onSubmit, onViewHistory }: Props) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('분류');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ subject, category, message, fileName: file?.name });
    onViewHistory();
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>문의하기</h2>
        <button type="button" className="view-history" onClick={onViewHistory}>
          문의 내역
        </button>
      </div>

      <div className="form-group">
        <input
          className="input-subject"
          type="text"
          placeholder="제목 작성해주세요"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="form-group category">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="분류" disabled>
            분류
          </option>
          <option value="일반">일반</option>
          <option value="버그 신고">버그 신고</option>
          <option value="기능 요청">기능 요청</option>
        </select>
      </div>

      <div className="form-group">
        <label>내용</label>
        <textarea
          placeholder="내용을 작성해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          required
        />
      </div>

      <div className="form-group">
        <label>첨부파일 등록/삭제</label>
        <div className="file-box">
          <label htmlFor="file-upload" className="file-label">
            +
          </label>
          <input id="file-upload" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        {file && <p className="filename">📎 {file.name}</p>}
      </div>

      <button type="submit" className="submit-button">
        저장하기
      </button>
    </form>
  );
};

export default InquiryForm;
