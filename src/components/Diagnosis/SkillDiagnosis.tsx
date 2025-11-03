import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const SkillDiagnosis = () => {
  const skills = useSelector((state: RootState) => state.user.member?.profile?.skills ?? []);
  const skillNames = skills.map((s) => s.name);

  // 진단 로직
  const coreSkills = ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
  const backendSkills = ['Node.js', 'Express', 'NestJS', 'Spring'];
  const frontendMatch = coreSkills.filter((s) => skillNames.includes(s));
  const backendMatch = backendSkills.filter((s) => skillNames.includes(s));

  const score = Math.min(100, skillNames.length * 10 + frontendMatch.length * 5 + backendMatch.length * 5);

  return (
    <div>
      <p>
        <strong>보유 기술:</strong> {skillNames.join(', ') || '없음'}
      </p>
      <p>
        <strong>핵심 프론트엔드 기술 포함:</strong> {frontendMatch.join(', ') || '없음'}
      </p>
      <p>
        <strong>백엔드 기술 포함:</strong> {backendMatch.join(', ') || '없음'}
      </p>
      <p>
        <strong>기술 다양성 점수:</strong> {score} / 100
      </p>
    </div>
  );
};

export default SkillDiagnosis;
