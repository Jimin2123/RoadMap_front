import React, { useEffect, useState } from 'react';
import './ProfileSetting.css';
import AddressSearch, { DaumPostcodeData } from '../Features/AddressSearch';
import ClearAddressIcon from '../SettingIcons/ClearAddressIcon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../hooks/userUser';
import { RootState } from '../../state/store';
import { uploadImageService } from '../../services/uploadService';

const ProfileSettings: React.FC = () => {
  const { member, status } = useAppSelector((state: RootState) => state.user);

  const [form, setForm] = useState({
    previewUrl: '',
    phoneNumber: '',
    name: '',
    email: '',
    address: '',
    detailAddress: '',
    addressJibun: '',
    regionCity: '',
    zonecode: '',
  });

  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status.getMember === 'fulfilled' && member) {
      setForm({
        previewUrl: member.profile?.profileImageUrl || '',
        phoneNumber: member.phoneNumber || '',
        name: member.name || '',
        email: member.email || '',
        address: member.address?.address || '',
        detailAddress: member.address?.addressDetail || '',
        addressJibun: member.address?.addressJibun || '',
        regionCity: member.address?.regionCity || '',
        zonecode: member.address?.zonecode || '',
      });
    }
  }, [status.getMember, member]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 검증 (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        e.target.value = ''; // 파일 선택 초기화
        return;
      }

      // 파일 형식 검증
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('허용되지 않는 파일 형식입니다. (jpg, jpeg, png, gif, webp만 가능)');
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, previewUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSelect = (selectedAddress: DaumPostcodeData) => {
    setForm((prev) => ({
      ...prev,
      address: selectedAddress.address,
      addressJibun: selectedAddress.jibunAddress,
      regionCity: selectedAddress.sigungu,
      zonecode: selectedAddress.zonecode,
    }));
  };

  const handleClearAddress = () => {
    setForm((prev) => ({ ...prev, address: '' }));
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);

      let profileImageUrl = member?.profile?.profileImageUrl || '';

      // 새 이미지가 선택되었다면 먼저 업로드
      if (selectedFile) {
        profileImageUrl = await uploadImageService(selectedFile);
      }

      // 프로필 업데이트 요청 - 기존 데이터 유지하면서 업데이트
      const profileRequest = {
        // 기존 프로필 데이터 유지
        desiredJobCodes:
          member?.profile?.desiredJob?.map((job) => job.id).filter((id): id is number => id != null) || [],
        currentJob: member?.profile?.currentJob || '',
        educationLevel: member?.profile?.educationLevel || '',
        skills:
          member?.profile?.skills?.map((skill) => ({
            name: skill.name,
            proficiency: skill.proficiency,
          })) || [],

        // 업데이트할 데이터
        profileImageUrl,
        phoneNumber: form.phoneNumber,
        address: form.address
          ? {
              address: form.address,
              addressDetail: form.detailAddress,
              addressJibun: form.addressJibun,
              regionCity: form.regionCity,
              zonecode: form.zonecode,
            }
          : undefined,
      };

      console.log('프로필 업데이트 요청 데이터:', profileRequest);
      dispatch(updateProfile(profileRequest));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
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

          <button className="save-btn" onClick={handleSave} disabled={isUploading}>
            {isUploading ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
