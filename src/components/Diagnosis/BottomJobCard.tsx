import styles from './BottomJobCard.module.css';

interface Job {
  id: number;
  company: string;
  title: string;
  skills: string[];
  deadline: string;
}

interface BottomJobCardProps {
  job: Job;
}

const BottomJobCard = ({ job }: BottomJobCardProps) => {
  return (
    <div className={styles.bottomJobCard}>
      <h4>{job.company}</h4>
      <p>{job.title}</p>
      <div className={styles.skillTags}>
        {job.skills.map((skill) => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
      </div>
      <p>마감일: {job.deadline}</p>
    </div>
  );
};

export default BottomJobCard;
