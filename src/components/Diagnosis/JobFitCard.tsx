import styles from './JobFitCard.module.css';

const JobFitCard = () => {
  return (
    <div className={styles.card}>
      <h2>직군 및 직업 적합도</h2>
      <p>21개 직군 중 나와 가장 잘 맞는 직업은 무엇일까요? 성격과 흥미 2가지 차원에서 분석해드립니다.</p>
      <ul className={styles.ranking}>
        <li className={styles.rank1}>
          1순위 <strong>디자인</strong>
        </li>
        <li className={styles.rank2}>
          2순위 <strong>연구/R&D</strong>
        </li>
        <li className={styles.rank3}>
          3순위 <strong>기획/전략</strong>
        </li>
      </ul>
    </div>
  );
};

export default JobFitCard;
