import React, { useState } from 'react';
import styles from './Resume.module.css';
import Card from './ResumeCard';

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

const Resume: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setInputValue('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const filtered = allSkills.filter(
    (skill) => skill.toLowerCase().includes(inputValue.toLowerCase()) && !selectedSkills.includes(skill)
  );
  return (
    <div className={styles.resumeContainer}>
      <Card title="기본 정보">
        <label>이름</label>
        <input type="text" placeholder="홍길동" />
        <label>이메일</label>
        <input type="email" placeholder="email@example.com" />
        <label>연락처</label>
        <input type="tel" placeholder="010-1234-5678" />
        <label>주소</label>
        <input type="text" placeholder="거주지 주소 입력" />
        <label>직업</label>
        <input type="text" placeholder="예: 학생 / 개발자" />
      </Card>

      <Card title="자기소개">
        <textarea rows={6} placeholder="직무 경험과 핵심 역량 등 구체적인 내용을 작성해 보세요." />
      </Card>

      <div className={styles.cardRow}>
        <Card title="자격증">
          <label>자격증명</label>
          <input type="text" placeholder="정보처리기사" />
          <label>발급 기관</label>
          <input type="text" placeholder="한국산업인력공단" />
          <label>취득 연도</label>
          <input type="text" placeholder="2023" />
        </Card>
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
            <input type="text" placeholder="스킬 입력" value={inputValue} onChange={handleChange} />
          </div>
          <label>자동완성 목록</label>
          {filtered.length > 0 && (
            <ul className={styles.suggestionBox}>
              {filtered.map((skill) => (
                <li key={skill} onClick={() => handleSelectSkill(skill)}>
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className={styles.cardRow}>
        <Card title="교육">
          <label>학교</label>
          <input type="text" placeholder="서울대학교" />
          <label>전공</label>
          <input type="text" placeholder="컴퓨터공학과" />
          <label>재학 기간</label>
          <input type="text" placeholder="2020.03 ~ 2024.02" />
          <label>상태</label>
          <input type="text" placeholder="재학 / 졸업" />
        </Card>
        <Card title="대외활동">
          <label>활동명</label>
          <input type="text" placeholder="봉사단, 해커톤 등" />
          <label>소속/기관</label>
          <input type="text" placeholder="기관명 입력" />
          <label>활동 기간</label>
          <input type="text" placeholder="2022.01 ~ 2022.06" />
          <label>활동 상세 설명</label>
          <textarea rows={6} placeholder="활동 내용과 본인의 역할, 기여도 등 구체적인 내용을 작성해보세요." />
        </Card>
      </div>

      <div className={styles.cardRow}>
        <Card title="프로젝트">
          <label>프로젝트명</label>
          <input type="text" placeholder="포트폴리오 웹사이트 제작" />
          <label>참여 기간</label>
          <input type="text" placeholder="2023.03 ~ 2023.05" />
          <label>기술 스택</label>
          <input type="text" placeholder="React, Node.js" />
          <label>설명</label>
          <textarea rows={3} placeholder="기능 및 역할 등 간단히 작성" />
        </Card>
        <Card title="포트폴리오">
          <label>포트폴리오 제목</label>
          <input placeholder="청년취업역량증진 길라잡이" />
          <label>포트폴리오 URL</label>
          <input type="url" placeholder="https://yourportfolio.com" />
        </Card>
      </div>

      <div className={styles.submitArea}>
        <button type="submit">이력서 제출</button>
      </div>
    </div>
  );
};

export default Resume;
