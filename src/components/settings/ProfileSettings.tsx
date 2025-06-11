import React, { useEffect, useState } from 'react';
import './ProfileSetting.css';
import AddressSearch, { DaumPostcodeData } from '../Features/AddressSearch';
import ClearAddressIcon from '../SettingIcons/ClearAddressIcon';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../types/store';

const ProfileSettings: React.FC = () => {
  const { member, status } = useAppSelector((state: RootState) => state.user);

  const [form, setForm] = useState({
    previewUrl: '',
    phoneNumber: '',
    name: '',
    email: '',
    address: '',
    detailAddress: '',
  });

  useEffect(() => {
    if (status.getMember === 'fulfilled' && member) {
      setForm({
        previewUrl: '', // replace with member.profileImageUrl if available
        phoneNumber: member.phoneNumber || '',
        name: member.name || '',
        email: member.email || '',
        address: member.address?.address || '',
        detailAddress: member.address?.addressDetail || '',
      });
    }
  }, [status.getMember, member]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, previewUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSelect = (selectedAddress: DaumPostcodeData) => {
    setForm((prev) => ({ ...prev, address: selectedAddress.address }));
  };

  const handleClearAddress = () => {
    setForm((prev) => ({ ...prev, address: '' }));
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    console.log('프로필 정보 저장:', form);
  };

  return (
    <div className="profile-settings-container">
      <h2 className="profile-settings-title">프로필 설정</h2>

      <div className="profile-sections">
        <div className="left-section">
          <div className="profile-image-wrapper">
            <img src={form.previewUrl || '/defaultProfileImage.svg'} alt="프로필 미리보기" className="profile-image" />
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
            <label>이름</label>
            <input type="text" value={form.name} onChange={handleChange('name')} placeholder="닉네임 입력" disabled />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="이메일 입력"
              disabled
            />
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange('phoneNumber')}
              placeholder="전화번호 입력 (예: 010-1234-5678)"
              pattern="^01[0-9]-\d{4}-\d{4}$"
            />
          </div>

          <div className="form-group">
            <label>주소</label>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <input
                type="text"
                value={form.address}
                readOnly
                placeholder="도로명 주소를 입력하세요"
                style={{ flex: 1, paddingRight: '60px' }}
              />
              {form.address && (
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
              value={form.detailAddress}
              onChange={handleChange('detailAddress')}
              placeholder="상세 주소 (예: 아파트, 동·호수 등)"
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
