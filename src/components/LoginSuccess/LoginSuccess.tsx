import { useEffect, useState } from 'react';
import './LoginSuccess.css';
import { MdSettings, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutThunk } from '../../hooks/useAuth';
import { RootState } from '../../state/store';
import { YouthPolicyItemResponse } from '../../types/interfaces/response/YouthPolicyResponse';
import { openExternalUrl } from '../../utils/openExternalUrl';
import { getPolicyListServiceForMember } from '../../services/policyService';

const LoginSuccess: React.FC = () => {
  const dispatch = useAppDispatch();
  const { member } = useAppSelector((state: RootState) => state.user);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  const [policies, setPolicies] = useState<YouthPolicyItemResponse[]>([]);
  const [loadingPolicies, setLoadingPolicies] = useState(true);

  useEffect(() => {
    if (!member?.id) return;

    const fetchPolicies = async () => {
      try {
        const response = await getPolicyListServiceForMember();
        setPolicies(response.result.youthPolicyList);
      } catch (error) {
        console.error('정책 불러오기 실패:', error);
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, [member?.id]);

  return (
    <div className="login-form-container">
      {/* 상단 영역 */}
      <div className="login-top-section">
        {/* 왼쪽: 프로필 */}
        <div className="profile-image-section">
          <img src="/defaultProfileImage.svg" alt="Profile" className="main-avatar" draggable="false" />
        </div>

        <div className="profile-info-section">
          <div className="profile-header">
            <h2 className="username">{member?.name}</h2>
            <div className="icon-buttons">
              <button>
                <Link to="/settings">
                  <MdSettings size={20} color="#333" />
                </Link>
              </button>
              <button onClick={handleLogout}>
                <MdLogout size={20} color="#333" />
              </button>
            </div>
          </div>

          {!member?.profile && (
            <div className="create-profile-section">
              <p>아직 프로필이 없어요. </p>
              <p>지금 바로 프로필을 만들어보세요!</p>
              <Link to="/resume" className="create-profile-button">
                프로필 생성하러 가기
              </Link>
            </div>
          )}

          {/* 스킬셋 자격증 입력 안되어있으면 입력하러가기 등 링크 추가 */}

          {member && member.profile && member.profile.skills && (
            <div className="skill-tags-wrapper">
              <p className="skills-label">보유중인 스킬셋</p>
              <div className="skill-tags">
                {member?.profile.skills.map((skill, index) => (
                  <span className="tag" key={index}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member && member.profile && member.profile.resume.certificates && (
            <div className="certificate-slider-wrapper">
              <div className="certificate-slider">
                {member?.profile.resume.certificates.map((cert, index) => (
                  <div className="certificate-card" key={index}>
                    <div className="certificate-icon">🎓</div>
                    <h4>{cert.name}</h4>
                    <p>{cert.agency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="policy-box">
        <h3>청년 지원 정책 안내 리스트</h3>
        {loadingPolicies ? (
          <p>로딩 중...</p>
        ) : policies.length === 0 ? (
          <p>정책이 없습니다.</p>
        ) : (
          <ul>
            {policies.map((policy, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openExternalUrl(policy.aplyUrlAddr, `${policy.plcyNm}은/는 신청 가능한 링크가 없습니다.`);
                  }}
                >
                  {policy.plcyNm}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LoginSuccess;
