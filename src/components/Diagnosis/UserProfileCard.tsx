import ReactECharts from 'echarts-for-react';
import styles from './UserProfileCard.module.css';

interface UserProfileCardProps {
  name: string;
  skills: string[];
}

const UserProfileCard = ({ name, skills }: UserProfileCardProps) => {
  const chartOption = {
    radar: {
      indicator: [
        { name: '프론트엔드', max: 100 },
        { name: '백엔드', max: 100 },
        { name: '데이터베이스', max: 100 },
        { name: 'UI/UX', max: 100 },
        { name: '커뮤니케이션', max: 100 },
      ],
      radius: 60, // 차트 크기 조절
    },
    series: [
      {
        name: '역량',
        type: 'radar',
        data: [
          {
            value: [85, 60, 70, 80, 90],
            name: '나의 역량',
          },
        ],
        areaStyle: { // 차트 내부 색상
          color: 'rgba(79, 70, 229, 0.4)'
        },
        lineStyle: { // 차트 라인 색상
          color: 'rgba(79, 70, 229, 1)'
        },
        itemStyle: { // 꼭짓점 색상
          color: 'rgba(79, 70, 229, 1)'
        }
      },
    ],
    tooltip: { // 마우스 호버 시 툴팁 표시
      trigger: 'item'
    },
    // 차트의 여백을 조절
    grid: {
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%',
    },
  };

  return (
    <div className={styles.profileCard}>
      <h2>{name}님을 위한 맞춤 채용 정보</h2>
      
      {/* ECharts 레이더 차트 */}
      <div className={styles.chartContainer}>
        <ReactECharts option={chartOption} style={{ height: '250px' }} />
      </div>

      <div className={styles.skillTags}>
        <p>보유 기술</p>
        {skills.map(skill => (
          <span key={skill} className={styles.tag}>
            #{skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserProfileCard;