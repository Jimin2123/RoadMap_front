import React, { useState } from 'react';
import './SignUpForm.css';
import AddressSearch from '../Features/AddressSearch';

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
    address: '', // 주소 필드 추가
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let newValue;
    if (name === 'birth') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 8);
    } else if (name === 'phone') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 11);
    } else {
      newValue = value;
    }

    setForm({ ...form, [name]: newValue });

    const errorMsg = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setForm((prev) => ({ ...prev, address: selectedAddress }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.id) newErrors.id = '아이디를 입력하세요';
    if (!/^.{8,16}$/.test(form.password)) newErrors.password = '비밀번호는 8~16자여야 합니다';
    if (!form.name) newErrors.name = '이름을 입력하세요';
    if (!/^\d{8}$/.test(form.birth)) newErrors.birth = '생년월일은 8자리 숫자여야 합니다 (예: 20020319)';
    if (!form.gender) newErrors.gender = '성별을 선택하세요';
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(form.email)) newErrors.email = '유효한 이메일을 입력하세요';
    if (!form.carrier) newErrors.carrier = '통신사를 선택하세요';
    if (!/^\d{10,11}$/.test(form.phone)) newErrors.phone = '휴대폰 번호는 숫자만 10~11자리 입력하세요';
    if (!form.address) newErrors.address = '주소를 입력하세요';
    return newErrors;
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'id':
        return value.trim() ? '' : '아이디는 필수입니다';
      case 'password':
        return /^.{8,16}$/.test(value) ? '' : '비밀번호는 8~16자여야 합니다';
      case 'name':
        return value.trim() ? '' : '이름은 필수입니다';
      case 'birth':
        return /^\d{8}$/.test(value) ? '' : '생년월일은 8자리 숫자여야 합니다';
      case 'email':
        return /^[\w.-]+@[\w.-]+\.\w+$/.test(value) ? '' : '이메일 형식이 아닙니다';
      case 'phone':
        return /^\d{10,11}$/.test(value) ? '' : '숫자만 10~11자리 입력';
      case 'carrier':
        return value ? '' : '통신사 선택 필수';
      case 'address':
        return value ? '' : '주소는 필수입니다';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(form);
      alert('회원가입 성공!');
    }
  };

  const inputClass = (field: string) => (errors[field] ? 'input-error' : '');

  return (
    <div className="signup-form-wrapper">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="id" placeholder="아이디" value={form.id} onChange={handleChange} className={inputClass('id')} />
        {errors.id && <p className="error-text">{errors.id}</p>}

        <input
          name="password"
          placeholder="비밀번호(8~16자의 영문,숫자,특수기호)"
          value={form.password}
          onChange={handleChange}
          type="password"
          className={inputClass('password')}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <input
          name="name"
          placeholder="이름(실명)"
          value={form.name}
          onChange={handleChange}
          className={inputClass('name')}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <div className="birth-gender-row">
          <input
            name="birth"
            placeholder="생년월일 (ex 20020319)"
            value={form.birth}
            onChange={handleChange}
            className={inputClass('birth')}
          />
          <label>
            <input type="radio" name="gender" value="남자" onChange={handleChange} /> 남자
          </label>
          <label>
            <input type="radio" name="gender" value="여자" onChange={handleChange} /> 여자
          </label>
        </div>
        {errors.birth && <p className="error-text">{errors.birth}</p>}
        {errors.gender && <p className="error-text">{errors.gender}</p>}

        <input
          name="email"
          placeholder="ex)email@job.co.kr"
          value={form.email}
          onChange={handleChange}
          className={inputClass('email')}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* ✅ 주소 검색 필드 */}
        <input
          name="address"
          placeholder="주소 (도로명)"
          value={form.address}
          readOnly
          className={inputClass('address')}
        />
        <AddressSearch onAddressSelect={handleAddressSelect} />
        {errors.address && <p className="error-text">{errors.address}</p>}

        <div className="phone-row">
          <select name="carrier" value={form.carrier} onChange={handleChange} className={inputClass('carrier')}>
            <option value="">통신사</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGU+">LGU+</option>
          </select>
          <input
            name="phone"
            placeholder="휴대폰 번호"
            value={form.phone}
            onChange={handleChange}
            className={inputClass('phone')}
          />
          <button type="button">인증요청</button>
        </div>
        {errors.carrier && <p className="error-text">{errors.carrier}</p>}
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <div className="auth-code-row">
          <input name="code" placeholder="인증번호 입력" value={form.code} onChange={handleChange} />
          <button type="button">재전송</button>
        </div>

        <div className="terms-box">
          <p>필수약관 동의 내용...</p>
        </div>

        <button type="submit" className="submit-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
