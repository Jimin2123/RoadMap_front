import ReactECharts from 'echarts-for-react';
import styles from './NcsRadar.module.css';

interface NcsData {
  indicators: { name: string; max: number }[];
  series: { name: string; value: number[] }[];
}

interface NcsRadarProps {
  data: NcsData;
}

const NcsRadar = ({ data }: NcsRadarProps) => {
  const option = {
    legend: {
      data: data.series.map((s) => s.name),
      bottom: 0,
    },
    radar: {
      indicator: data.indicators,
      radius: 140,
      center: ['50%', '45%'],
    },
    series: [
      {
        name: 'NCS 역량', // A general name for the series group
        type: 'radar',
        data: data.series.map((s) => ({
          value: s.value,
          name: s.name,
        })),
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    // Add some colors to distinguish the series
    color: ['#56A3F1', '#FF917C'],
  };

  return (
    <div className={styles.card}>
      <div className={styles.chartWrapper}>
        <ReactECharts option={option} style={{ height: 380 }} />
      </div>
    </div>
  );
};

export default NcsRadar;
