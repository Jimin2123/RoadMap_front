import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = () => {
    console.log('계정 설정 저장됨:', {
      email,
      nickname,
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="account-settings">
      <h2>계정 설정</h2>

      <div className="form-group">
        <label>이메일 </label>
        <input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label>전화번호 </label>
        <input
          type="text"
          placeholder="전화번호 입력 ('-'를 빼고) "
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>현재 비밀번호 </label>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default AccountSettings;
