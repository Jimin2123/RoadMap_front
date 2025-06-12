import { ChangeEvent } from 'react';
import Card from '../ResumeCard';
import '../../settings/ProfileSetting.css';
import { BasicCardData } from '../../../types/interfaces/ResumeData';

interface ResumeBasicCardProps {
  value: BasicCardData;
  onChange: (data: BasicCardData) => void;
}

const ResumeBasicCard: React.FC<ResumeBasicCardProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: newValue } = e.target;

    // 변경된 값만 업데이트
    if (value[name as keyof BasicCardData] !== newValue) {
      onChange({ ...value, [name]: newValue });
    }
  };

  return (
    <Card title="이력서 기본 정보">
      <div className="profile-settings-container">
        <div className="profile-sections">
          <div className="left-section">
            <div className="profile-image-wrapper">
              <img src="/defaultProfileImage.svg" alt="프로필 미리보기" className="profile-image" />
            </div>
          </div>

          <div className="right-section">
            <div className="form-group">
              <label>이름</label>
              <input name="name" type="text" placeholder="홍길동" value={value.name} readOnly disabled />
            </div>

            <div className="form-group">
              <label>이메일</label>
              <input name="email" type="email" placeholder="email@example.com" value={value.email} readOnly disabled />
            </div>

            <div className="form-group">
              <label>연락처</label>
              <input
                name="phoneNumber"
                type="tel"
                placeholder="010-1234-5678"
                value={value.phoneNumber}
                readOnly
                disabled
              />
            </div>

            <div className="form-group">
              <label>주소</label>
              <input name="address" type="text" placeholder="도로명 주소" value={value.address} readOnly disabled />
            </div>

            <div className="form-group">
              <label>직업</label>
              <input
                name="currentJob"
                type="text"
                placeholder="예: 학생 / 개발자"
                value={value.currentJob}
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
