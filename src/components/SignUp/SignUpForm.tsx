import React, { useState } from 'react';
import './SignUpForm.css';
import AddressSearch from '../Features/AddressSearch';
import ClearAddressIcon from '../SettingIcons/ClearAddressIcon';
import type { DaumPostcodeData } from '../Features/AddressSearch'; // 경로 맞게 import!
import axios from 'axios';
import { useAppDispatch } from '../../store/hooks';
import { signUp } from '../../hooks/userUser';
import { useNavigate } from 'react-router-dom';
import { login } from '../../hooks/useAuth';
import { MemberRequest } from '../../types/interfaces/request/MemberRequest';

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<MemberRequest>({
    loginRequest: {
      email: '',
      password: '',
    },
    name: '',
    birthDate: '',
    phoneNumber: '',
    addressRequest: {
      address: '',
      addressDetail: '',
      addressJibun: '',
      regionCity: '',
      zonecode: '',
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let newValue;
    if (name === 'birthDate') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 8);
    } else if (name === 'phoneNumber') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
      // 010-1234-5678 형식으로 포맷팅
      if (numbers.length <= 3) {
        newValue = numbers;
      } else if (numbers.length <= 7) {
        newValue = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        newValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
      }
    } else {
      newValue = value;
    }

    // 중첩된 name 처리
    if (name.startsWith('loginRequest.')) {
      const field = name.split('.')[1]; // 'email' 또는 'password'
      setForm((prev) => ({
        ...prev,
        loginRequest: {
          ...prev.loginRequest,
          [field]: newValue,
        },
      }));
    } else if (name.startsWith('addressRequest.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        addressRequest: {
          ...prev.addressRequest,
          [field]: newValue,
        },
      }));
    } else {
      // 일반 필드
      setForm((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    const errorMsg = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // 숫자만 추출
    let formattedValue = rawValue;

    if (rawValue.length === 8) {
      formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(4, 6)}-${rawValue.slice(6)}`;
    }

    setForm((prev) => ({
      ...prev,
      birthDate: formattedValue,
    }));
  };

  const handleAddressSelect = (data: DaumPostcodeData) => {
    setForm((prev) => ({
      ...prev,
      addressRequest: {
        ...prev.addressRequest,
        address: data.address,
        addressJibun: data.jibunAddress,
        regionCity: data.sigungu,
        zonecode: data.zonecode,
      },
    }));
  };

  // const handleAddressSelect = (selectedAddress: string) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     addressRequest: {
  //       ...prev.addressRequest,
  //       address: selectedAddress,
  //     },
  //   }));
  // };

  const handleClearAddress = () => {
    setForm((prev) => ({
      ...prev,
      addressRequest: {
        ...prev.addressRequest,
        address: '',
      },
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.loginRequest.password || !/^.{8,16}$/.test(form.loginRequest.password)) {
      newErrors.password = '비밀번호는 8~16자여야 합니다';
    }
    if (!form.name) newErrors.name = '이름을 입력하세요';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)) {
      newErrors.birthDate = '생년월일은 YYYY-MM-DD 형식이어야 합니다 (예: 2000-03-19)';
    }

    if (!form.loginRequest.email.trim()) {
      newErrors.email = '아이디(이메일)를 입력하세요';
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(form.loginRequest.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다';
    }
    // 하이픈 제거 후 검증
    const phoneDigits = form.phoneNumber.replace(/[^0-9]/g, '');
    if (!/^\d{10,11}$/.test(phoneDigits)) newErrors.phoneNumber = '휴대폰 번호는 10~11자리여야 합니다';
    if (!form.addressRequest.address) newErrors.address = '주소를 입력하세요';

    return newErrors;
  };

  // validateField 함수도 email 부분 수정
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'loginRequest.password':
        return /^.{8,16}$/.test(value) ? '' : '비밀번호는 8~16자여야 합니다';
      case 'name':
        return value.trim() ? '' : '이름은 필수입니다';
      case 'birthDate':
        return /^\d{8}$/.test(value) ? '' : '생년월일은 8자리 숫자여야 합니다';
      case 'loginRequest.email':
        if (!value.trim()) return '아이디(이메일)를 입력하세요';
        return /^[\w.-]+@[\w.-]+\.\w+$/.test(value) ? '' : '유효한 이메일 형식이 아닙니다';
      case 'phoneNumber': {
        const phoneDigits = value.replace(/[^0-9]/g, '');
        return /^\d{10,11}$/.test(phoneDigits) ? '' : '휴대폰 번호는 10~11자리여야 합니다';
      }
      case 'addressRequest.address':
        return value ? '' : '주소는 필수입니다';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // 서버 전송 전 전화번호 하이픈 제거
        const submitData = {
          ...form,
        };

        await dispatch(signUp(submitData)).unwrap();
        await dispatch(login(form.loginRequest)).unwrap();

        navigate('/');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // axios 에러인 경우
          alert('회원가입 실패: ' + (error.response?.data?.message || '알 수 없는 오류'));
        } else {
          // axios 에러가 아닌 경우 (네트워크 등)
          alert('서버와 통신 중 오류가 발생했습니다.');
        }
        console.error(error);
      }
    }
  };

  const inputClass = (field: string) => (errors[field] ? 'input-error' : '');

  return (
    <div className="signup-form-wrapper">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* 1️⃣ 이메일 (아이디) */}
        <input
          name="loginRequest.email"
          placeholder="ex)email@job.co.kr"
          value={form.loginRequest.email}
          onChange={handleChange}
          className={inputClass('loginRequest.email')}
        />
        {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
        {errors['loginRequest.email'] && <p className="error-text">{errors['loginRequest.email']}</p>}

        {/* 2️⃣ 비밀번호 */}
        <input
          name="loginRequest.password"
          placeholder="비밀번호"
          value={form.loginRequest.password}
          type="password"
          onChange={handleChange}
          className={inputClass('loginRequest.password')}
        />
        {errors['loginRequest.password'] && <p className="error-text">{errors['loginRequest.password']}</p>}

        {/* 3️⃣ 이름 */}
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className={inputClass('name')}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* 4️⃣ 생년월일 */}
        <input
          name="birthDate"
          placeholder="생년월일 (YYYYMMDD)"
          value={form.birthDate}
          onChange={handleBirthDateChange}
          className={inputClass('birth')}
        />
        {errors.birthDate && <p className="error-text">{errors.birthDate}</p>}

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <input
            name="addressRequest.address"
            placeholder="도로명 주소를 입력해 주세요"
            value={form.addressRequest.address}
            readOnly
            className={inputClass('address')}
            style={{ flex: 1, paddingRight: '60px' }}
          />
          <input type="hidden" name="addressRequest.addressJibun" value={form.addressRequest.addressJibun} readOnly />
          <input type="hidden" name="addressRequest.regionCity" value={form.addressRequest.regionCity} readOnly />
          <input type="hidden" name="addressRequest.zonecode" value={form.addressRequest.zonecode} readOnly />
          {form.addressRequest.address && (
            <button
              type="button"
              onClick={handleClearAddress}
              aria-label="주소 지우기"
              style={{
                position: 'absolute',
                right: '50px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                scale: '0.9',
              }}
            >
              <ClearAddressIcon />
            </button>
          )}
          <div style={{ position: 'absolute', right: '8px' }}>
            <AddressSearch onAddressSelect={handleAddressSelect} />
          </div>
        </div>
        {errors['addressRequest.address'] && <p className="error-text">{errors['addressRequest.address']}</p>}

        <input
          name="addressRequest.addressDetail"
          placeholder="상세 주소 (예: 아파트, 동·호수 등)"
          value={form.addressRequest.addressDetail}
          onChange={handleChange}
          className={inputClass('addressRequest.addressDetail')}
        />

        <div className="phone-row">
          <input
            name="phoneNumber"
            placeholder="휴대폰 번호"
            value={form.phoneNumber}
            onChange={handleChange}
            className={inputClass('phoneNumber')}
          />
        </div>
        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

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
