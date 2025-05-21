import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState({
    id: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
    email: '',
    carrier: '',
    phone: '',
    code: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="signup-form-wrapper">
      <h2 className="signup-title">길라JOB 회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="id" placeholder="아이디" value={form.id} onChange={handleChange} />
        <input name="password" placeholder="비밀번호(8~16자의 영문,숫자,특수기호)" value={form.password} onChange={handleChange} type="password" />
        <input name="name" placeholder="이름(실명)" value={form.name} onChange={handleChange} />
        <div className="birth-gender-row">
          <input name="birth" placeholder="생년월일 (ex 20020319)" value={form.birth} onChange={handleChange} />
          <label><input type="radio" name="gender" value="남자" onChange={handleChange} /> 남자</label>
          <label><input type="radio" name="gender" value="여자" onChange={handleChange} /> 여자</label>
        </div>
        <input name="email" placeholder="ex)email@job.co.kr" value={form.email} onChange={handleChange} />

        <div className="phone-row">
          <select name="carrier" value={form.carrier} onChange={handleChange}>
            <option value="">통신사 선택</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGU+">LGU+</option>
          </select>
          <input name="phone" placeholder="휴대폰 번호" value={form.phone} onChange={handleChange} />
          <button type="button">인증요청</button>
        </div>

        <div className="auth-code-row">
          <input name="code" placeholder="인증번호 입력" value={form.code} onChange={handleChange} />
          <button type="button">재전송</button>
        </div>

        <div className="terms-box">
          <p>필수약관 동의 내용...</p>
        </div>

        <button type="submit" className="submit-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpForm;
