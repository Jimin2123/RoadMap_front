import styles from './JobCard.module.css';

interface Job {
    id: number;
    company: string;
    title: string;
    skills: string[];
    deadline: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={styles.jobCard}>
      <h4>{job.company}</h4>
      <p>{job.title}</p>
      <div className={styles.skillTags}>
        {job.skills.map(skill => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
      </div>
      <p>마감일: {job.deadline}</p>
    </div>
  );
};

export default JobCard;
