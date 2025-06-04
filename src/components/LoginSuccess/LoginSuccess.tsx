import React, { useEffect, useState } from 'react';
import './LoginSuccess.css';
import axios from 'axios';
import { MdSettings, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface ProfileResponse {
  educationLevel: string;
  desiredJob: string;
  major: string;
  skills?: string[];
  certificates?: string[];
}
interface MemberResponse {
  id: number;
  name: string;
  phoneNumber: string;
  profileResponse: ProfileResponse;
}

const LoginSuccess: React.FC = () => {
  const [member, setMember] = useState<MemberResponse | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberId = localStorage.getItem('memberId'); // localStorage에서 꺼내기
        if (!memberId) {
          console.error('회원 ID가 없습니다. 로그인 후 다시 시도해 주세요.');
          return;
        }
        const response = await axios.get<MemberResponse>(`/api/v1/member/${memberId}`);
        console.log('회원 정보:', response.data);
        setMember(response.data);
      } catch (error) {
        console.error('회원 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMember();
  }, []);

  return (
    <div className="login-form-container">
      {/* 상단 영역 */}
      <div className="login-top-section">
        {/* 왼쪽: 프로필 */}
        <div className="profile-image-section">
          <img src="/avatar.jpg" alt="Profile" className="avatar" />
        </div>

        {/* 오른쪽: 이름, 태그, 자격증 */}
        <div className="profile-info-section">
          <div className="profile-header">
            <h2 className="username">{member?.name}</h2>
            <div className="icon-buttons">
              <button>
                <Link to="/settings">
                  <MdSettings size={20} color="#333" />
                </Link>
              </button>
              <button>
                <MdLogout size={20} color="#333" />
              </button>
            </div>
          </div>
          {/* 스킬셋 자격증 입력 안되어있으면 입력하러가기 등 링크 추가 */}
          <p className="skills-label">보유중인 스킬셋</p>
          <div className="skill-tags-wrapper">
            {member && member.profileResponse && member.profileResponse.skills && (
              <div className="skill-tags">
                {member?.profileResponse.skills.map((skill, index) => (
                  <span className="tag" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="certificate-slider-wrapper">
            {member && member.profileResponse && member.profileResponse.certificates && (
              <div className="certificate-slider">
                {member?.profileResponse.certificates.map((cert, index) => (
                  <div className="certificate-card" key={index}>
                    <div className="certificate-icon">🎓</div>
                    <h4>{cert}</h4>
                    <p>국가 공인</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="policy-box">
        <h3>청년 지원 정책 안내 리스트</h3>
        <ul>
          <li>
            <a href="">청년 도약 프로젝트 안내</a>
          </li>
          <li>
            <a href="">국가 기술 자격 지원 제도</a>
          </li>
          <li>
            <a href="">구직활동 지원금 신청</a>
          </li>
          <li>
            <a href="">청년 맞춤형 일자리 매칭</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginSuccess;
