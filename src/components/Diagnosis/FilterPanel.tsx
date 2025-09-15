import styles from './FilterPanel.module.css';

// 임시 필터 데이터
const filters = {
  job: ['프론트엔드', '백엔드', '디자이너', 'PM'],
  experience: ['신입', '경력 (1~3년)', '경력 (3~5년)'],
  location: ['서울', '경기', '부산', '원격'],
};

const FilterPanel = () => {
  return (
    <div className={styles.filterCard}>
      <h3>필터</h3>
      <div className={styles.filterSection}>
        <h4>직무</h4>
        {filters.job.map(item => (
          <div key={item} className={styles.checkboxItem}>
            <input type="checkbox" id={item} name={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <div className={styles.filterSection}>
        <h4>경력</h4>
        {filters.experience.map(item => (
          <div key={item} className={styles.checkboxItem}>
            <input type="checkbox" id={item} name={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <div className={styles.filterSection}>
        <h4>지역</h4>
        {filters.location.map(item => (
          <div key={item} className={styles.checkboxItem}>
            <input type="checkbox" id={item} name={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;