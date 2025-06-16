import { useSelector } from 'react-redux';
import { RootState } from '../../types/store';

const ActivityDiagnosis = () => {
  const activities = useSelector((state: RootState) => state.user.member?.profile?.resume?.activities ?? []);
  const now = new Date();
  const recentThreshold = now.getFullYear() - 2;

  const count = activities.length;
  const described = activities.filter((a) => a.description && a.description.length >= 10).length;
  const uniqueOrgs = [...new Set(activities.map((a) => a.organization))];
  const recent = activities.filter((a) => {
    const match = a.period.match(/\d{4}/); // 연도 추출
    return match ? parseInt(match[0]) >= recentThreshold : false;
  }).length;

  const score = Math.min(100, count * 10 + described * 5 + uniqueOrgs.length * 3 + recent * 5);

  return (
    <div>
      <p>
        <strong>총 대외활동 수:</strong> {count}개
      </p>
      <p>
        <strong>기관 수:</strong> {uniqueOrgs.length}곳
      </p>
      <p>
        <strong>설명 포함된 활동:</strong> {described}개
      </p>
      <p>
        <strong>최근 활동(2년 이내):</strong> {recent}개
      </p>
      <p>
        <strong>종합 진단 점수:</strong> {score} / 100
      </p>
    </div>
  );
};

export default ActivityDiagnosis;
