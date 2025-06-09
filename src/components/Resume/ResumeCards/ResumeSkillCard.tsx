import React, { useState, useEffect } from 'react';
import Card from '../ResumeCard';
import styles from './ResumeSkillCard.module.css';

interface ResumeSkillCardProps {
  value?: string[];
  onChange?: (skills: string[]) => void;
}

const allSkills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Express',
  'Next.js',
  'Redux',
  'Tailwind CSS',
];

const ResumeSkillCard: React.FC<ResumeSkillCardProps> = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(value);

  useEffect(() => {
    onChange?.(selectedSkills);
  }, [selectedSkills]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const updated = [...selectedSkills, skill];
      setSelectedSkills(updated);
    }
    setInputValue('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updated);
  };

  const filtered = allSkills.filter(
    (skill) => skill.toLowerCase().includes(inputValue.toLowerCase()) && !selectedSkills.includes(skill)
  );

  return (
    <Card title="기술 스택">
      <label>보유 기술</label>
      <div className={styles.skillInputBox}>
        {selectedSkills.map((skill) => (
          <span key={skill} className={styles.skillTag}>
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(skill)}>
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="스킬 입력"
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {filtered.length > 0 && (
        <>
          <label>자동완성 목록</label>
          <ul className={styles.suggestionBox}>
            {filtered.map((skill) => (
              <li key={skill} onClick={() => handleSelectSkill(skill)}>
                {skill}
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
};

export default ResumeSkillCard;
