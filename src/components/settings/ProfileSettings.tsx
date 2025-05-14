import React, { useState } from 'react';
import './ProfileSetting.css';

const ProfileSettings: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 프로필 이미지 미리보기
  const [nickname, setNickname] = useState<string>(''); // 닉네임
  const [email, setEmail] = useState<string>(''); // 이메일

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // 저장 로직을 여기에 추가
    console.log('프로필 정보 저장:', { nickname, email });
  };

  return (
    <div className="profile-settings-container">
      <h2 className="profile-settings-title">프로필 설정</h2>

      <div className="left-section">
        <div className="profile-image-wrapper">
          <img
            src={previewUrl || '/defaultProfileImage.svg'} // 기본 이미지 경로
            alt="프로필 미리보기"
            className="profile-image"
          />
        </div>
        <label htmlFor="profileImageInput" className="change-image-btn">
          이미지 변경
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      <div className="right-section">
        <div className="form-group">
          <label>닉네임</label>
          <input type="text" value={nickname} placeholder="닉네임 입력" onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input type="email" value={email} placeholder="이메일 입력" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="save-btn" onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
