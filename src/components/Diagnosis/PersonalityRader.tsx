import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import styles from './PersonalityRadar.module.css';

const data = [
  { trait: '정직겸손성', score: 85 },
  { trait: '외향성', score: 10 },
  { trait: '원만성', score: 40 },
  { trait: '정서안정성', score: 15 },
  { trait: '성실성', score: 72 },
  { trait: '개방성', score: 52 },
];

const PersonalityRadar = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>성격 강점 진단</h2>
      <p className={styles.subtitle}>6가지 성격 요인, 18가지 세부 특질 분석을 통해 나만의 성격 강점을 알려드려요.</p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={100} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="trait" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="성격 점수" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PersonalityRadar;
