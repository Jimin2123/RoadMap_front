import React, { useState } from 'react';
import './AccountSettings.css';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../types/store';

const AccountSettings: React.FC = () => {
  const member = useAppSelector((state: RootState) => state.user.member);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // const isValidPassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isValidPassword(newPassword)) {
    // alert('비밀번호는 최소 8자 이상이며 숫자와 영문을 포함해야 합니다.');
    // return;
    // }

    console.log('계정 설정 저장됨:', {
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="account-settings">
      <h2 className="account-settings-title">계정 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이메일 </label>
          <input type="email" placeholder="example@email.com" value={member?.email} disabled />
        </div>

        <div className="form-group">
          <label>현재 비밀번호 </label>
          <input
            type="password"
            placeholder="현재 비밀번호 입력"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="save-btn">
          저장하기
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
