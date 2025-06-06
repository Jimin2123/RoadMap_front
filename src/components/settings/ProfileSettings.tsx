import React, { useState } from 'react';
import './ProfileSetting.css';
import AddressSearch, { DaumPostcodeData } from '../Features/AddressSearch';
import ClearAddressIcon from '../SettingIcons/ClearAddressIcon';

const ProfileSettings: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 프로필 이미지
  const [nickname, setNickname] = useState<string>(''); // 닉네임
  const [email, setEmail] = useState<string>(''); // 이메일
  const [address, setAddress] = useState<string>(''); // 주소
  const [detailAddress, setDetailAddress] = useState<string>(''); // 상세주소

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

  const handleAddressSelect = (selectedAddress: DaumPostcodeData) => {
    setAddress(selectedAddress.address); // or use the appropriate property for the address string
  };

  const handleClearAddress = () => {
    setAddress('');
  };

  const handleSave = () => {
    console.log('프로필 정보 저장:', {
      nickname,
      email,
      address,
      detailAddress,
    });
  };

  return (
    <div className="profile-settings-container">
      <h2 className="profile-settings-title">프로필 설정</h2>

      <div className="profile-sections">
        <div className="left-section">
          <div className="profile-image-wrapper">
            <img src={previewUrl || '/defaultProfileImage.svg'} alt="프로필 미리보기" className="profile-image" />
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
            <input
              type="text"
              value={nickname}
              placeholder="닉네임 입력"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input type="email" value={email} placeholder="이메일 입력" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>전화번호</label>
            <input
              type="tel"
              placeholder="전화번호 입력 (예: 010-1234-5678)"
              onChange={(e) => console.log('전화번호:', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>주소</label>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <input
                type="text"
                value={address}
                placeholder="도로명 주소를 입력하세요"
                readOnly
                style={{ flex: 1, paddingRight: '60px' }}
              />
              {address && (
                <button
                  type="button"
                  onClick={handleClearAddress}
                  aria-label="주소 지우기"
                  style={{
                    position: 'absolute',
                    right: '40px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <ClearAddressIcon />
                </button>
              )}
              <div style={{ position: 'absolute', right: '8px' }}>
                <AddressSearch onAddressSelect={handleAddressSelect} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>상세 주소</label>
            <input
              type="text"
              value={detailAddress}
              placeholder="상세 주소 (예: 아파트, 동·호수 등)"
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
