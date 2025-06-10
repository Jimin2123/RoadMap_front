import { useState, ChangeEvent } from 'react';
import Card from '../ResumeCard';
import '../../settings/ProfileSetting.css';

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

const ResumeBasicCard: React.FC<ResumeBasicCardProps> = ({ value }) => {
  const [previewUrl] = useState<string>('');
  const [formData, setFormData] = useState<BasicCardData>(
    value ?? {
      name: '',
      email: '',
      phone: '',
      address: '',
      job: '',
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card title="이력서 기본 정보">
      <div className="profile-settings-container">
        <div className="profile-sections">
          <div className="left-section">
            <div className="profile-image-wrapper">
              <img src={previewUrl || '/defaultProfileImage.svg'} alt="프로필 미리보기" className="profile-image" />
            </div>
          </div>

          <div className="right-section">
            <div className="form-group">
              <label>이름</label>
              <input
                name="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label>이메일</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label>연락처</label>
              <input
                name="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label>주소</label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type="text"
                  value={formData.address}
                  placeholder="도로명 주소를 입력하세요"
                  readOnly
                  style={{ flex: 1, paddingRight: '60px' }}
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label>직업</label>
              <input
                name="job"
                type="text"
                placeholder="예: 학생 / 개발자"
                value={formData.job}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeBasicCard;
