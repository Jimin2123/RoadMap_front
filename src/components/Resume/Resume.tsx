import React, { useState } from 'react';
import './Resume.css';

const Resume: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    introduction: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('이력서 제출:', form);
    alert('이력서가 저장되었습니다!');
  };

  return (
    <div className="resume-page">
      <h2>나의 이력서</h2>
      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>학력</label>
          <input name="education" value={form.education} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>경력</label>
          <input name="experience" value={form.experience} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>자기소개</label>
          <textarea name="introduction" value={form.introduction} onChange={handleChange} rows={5} />
        </div>

        <button type="submit" className="save-btn">
          이력서 저장
        </button>
      </form>
    </div>
  );
};

export default Resume;
