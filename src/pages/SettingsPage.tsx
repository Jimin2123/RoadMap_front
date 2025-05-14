import React, { useState } from 'react';
import './SettingsPage.css';
import {
  UserIcon,
  SettingIcon,
  NotificationIcon,
  MessageIcon,
  WarningIcon,
} from '../components/SettingIcons';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <p style={{ fontSize: '26px' }}>설정</p>
        <ul>
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <span className="icon"><UserIcon /></span>
            <span>프로필 설정</span>
          </li>
          <li
            className={activeTab === 'account' ? 'active' : ''}
            onClick={() => setActiveTab('account')}
          >
            <span className="icon"><SettingIcon /></span>
            <span>계정 설정</span>
          </li>
          <li
            className={activeTab === 'notification' ? 'active' : ''}
            onClick={() => setActiveTab('notification')}
          >
            <span className="icon"><NotificationIcon /></span>
            <span>알림</span>
          </li>
          <li
            className={activeTab === 'password' ? 'active' : ''}
            onClick={() => setActiveTab('password')}
          >
            <span className="icon"><MessageIcon /></span>
            <span>비밀번호 변경</span>
          </li>
          <li
            className={activeTab === 'delete' ? 'active' : ''}
            onClick={() => setActiveTab('delete')}
          >
            <span className="icon"><WarningIcon /></span>
            <span>탈퇴하기</span>
          </li>
        </ul>
      </div>

      <div className="settings-content">
        <div className="profile-header">
          <h2>프로필 설정</h2>
          <button className="close-button">✕</button>
        </div>

        <div className="profile-info">
          <div className="profile-image">
            <img src="/default-avatar.png" alt="프로필" />
            <button className="upload-btn">📷 이미지 업로드</button>
          </div>
          <div className="profile-fields">
            <div><b>이름</b> 정지민 ✏️</div>
            <div><b>이메일</b> ddong1759@nabver.com ✏️</div>
            <div><b>전화번호</b> 01022745989 ✏️</div>
            <div><b>생년월일</b> 2002/03/19 ✏️</div>
            <div><b>주소</b> 경기도 성남시 중원구 돈촌대로 1202 ✏️</div>
          </div>
        </div>

        <button className="save-button">저장하기</button>
      </div>
    </div>
  );
};

export default SettingsPage;
