import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const ProjectDiagnosis = () => {
  const projects = useSelector((state: RootState) => state.user.member?.profile?.resume?.projects ?? []);

  const projectCount = projects.length;
  const totalTech = new Set(projects.flatMap((p) => p.techStack)).size;
  const described = projects.filter((p) => p.description && p.description.length >= 10).length;

  const score = Math.min(100, projectCount * 10 + totalTech * 3 + described * 5);

  return (
    <div>
      <p>
        <strong>총 프로젝트 수:</strong> {projectCount}개
      </p>
      <p>
        <strong>사용된 전체 기술 수:</strong> {totalTech}개
      </p>
      <p>
        <strong>상세 설명이 있는 프로젝트:</strong> {described}개
      </p>
      <p>
        <strong>종합 진단 점수:</strong> {score} / 100
      </p>
    </div>
  );
};

export default ProjectDiagnosis;
