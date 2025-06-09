import { useState, ChangeEvent, useEffect } from 'react';
import Card from '../ResumeCard';

export interface BasicCardData {
  name: string;
  email: string;
  phone: string;
  address: string;
  job: string;
}

interface ResumeBasicCardProps {
  value?: BasicCardData;
  onChange: (data: BasicCardData) => void;
}

const ResumeBasicCard: React.FC<ResumeBasicCardProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<BasicCardData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    job: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  return (
    <Card title="기본 정보">
      <label>이름</label>
      <input name="name" type="text" placeholder="홍길동" value={formData.name} onChange={handleChange} />
      <label>이메일</label>
      <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
      <label>연락처</label>
      <input name="phone" type="tel" placeholder="010-1234-5678" value={formData.phone} onChange={handleChange} />
      <label>주소</label>
      <input
        name="address"
        type="text"
        placeholder="거주지 주소 입력"
        value={formData.address}
        onChange={handleChange}
      />
      <label>직업</label>
      <input name="job" type="text" placeholder="예: 학생 / 개발자" value={formData.job} onChange={handleChange} />
    </Card>
  );
};

export default ResumeBasicCard;
