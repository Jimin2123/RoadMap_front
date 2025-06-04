import React, { useState } from 'react';
import './WithdrawAccount.css';

const WithdrawAccount: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleWithdraw = () => {
    if (!confirmed) {
      alert('탈퇴 확인을 체크해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    // TODO: 실제 API 요청 처리
    console.log('회원 탈퇴 요청됨. 입력된 비밀번호:', password);
    alert('회원 탈퇴가 완료되었습니다.');
  };

  return (
    <div className="withdraw-account">
      <h2>회원 탈퇴</h2>
      <p className="warning-text">
        회원 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.
        <br />
        신중히 결정해주세요.
      </p>

      <div className="form-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          정말로 탈퇴하시겠습니까?
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          <span className="checkmark"></span>
        </label>
      </div>

      <button className="withdraw-btn" onClick={handleWithdraw}>
        탈퇴하기
      </button>
    </div>
  );
};

export default WithdrawAccount;
