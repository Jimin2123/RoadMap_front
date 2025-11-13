// ResumeSkillCard.tsx
import React, { useState, useRef, useCallback, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../utils/axiosInstance';
import styles from './ResumeSkillCard.module.css';
import Card from '../ResumeCard';
import { FaStar, FaCode } from 'react-icons/fa';

export interface SkillData {
  name: string;
  proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

interface ResumeSkillCardProps {
  value: SkillData[];
  onChange: (skills: SkillData[]) => void;
}

interface SkillAutoCompleteResponse {
  id: number;
  name: string;
}

const ResumeSkillCard: React.FC<ResumeSkillCardProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<SkillAutoCompleteResponse[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const abortCtrl = useRef<AbortController | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 자동완성 API 호출 (debounced)
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      try {
        abortCtrl.current?.abort();
        const controller = new AbortController();
        abortCtrl.current = controller;

        const { data } = await axiosInstance.get<SkillAutoCompleteResponse[]>(
          `/api/v1/skills/autocomplete?query=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        setSuggestions(data);
        setHighlightIndex(-1); // 새 목록일 때 초기화
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('자동완성 실패', err);
        }
      }
    }, 300),
    []
  );

  // 하이라이트된 항목이 보이도록 스크롤 이동
  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightIndex]);

  // 입력 처리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);

    const query = raw.trim();
    if (query.length >= 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  // skill 추가
  const handleAddSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !value.find((v) => v.name === trimmed)) {
      onChange([...value, { name: trimmed, proficiency: 'INTERMEDIATE' }]);
    }
    setInputValue('');
    setSuggestions([]);
    setHighlightIndex(-1);
  };

  // skill 제거
  const handleRemoveSkill = (skillName: string) => {
    onChange(value.filter((s) => s.name !== skillName));
  };

  // 숙련도 변경
  const handleProficiencyChange = (skillName: string, proficiency: SkillData['proficiency']) => {
    onChange(value.map((skill) => (skill.name === skillName ? { ...skill, proficiency } : skill)));
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleAddSkill(suggestions[highlightIndex].name);
      } else {
        handleAddSkill(inputValue);
      }
    }

    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      handleRemoveSkill(value[value.length - 1].name);
    }
  };

  const proficiencyLevels: SkillData['proficiency'][] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const getProficiencyValue = (level: SkillData['proficiency']) => {
    return proficiencyLevels.indexOf(level) + 1;
  };

  const handleStarClick = (skillName: string, rating: number) => {
    const newProficiency = proficiencyLevels[rating - 1];
    if (newProficiency) {
      handleProficiencyChange(skillName, newProficiency);
    }
  };

  return (
    <Card title="기술 스택">
      <label>보유 기술</label>
      <div className={styles.skillInputBox}>
        {value.map((skill) => (
          <span key={skill.name} className={styles.skillTag}>
            {skill.name}
            <div className={styles.starRating} onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3].map((star) => {
                const ratingValue = getProficiencyValue(skill.proficiency);
                const isFilled = star <= (hoverRating || ratingValue);
                return (
                  <FaStar
                    key={star}
                    className={styles.star}
                    color={isFilled ? '#ffc107' : '#e4e5e9'}
                    onClick={() => handleStarClick(skill.name, star)}
                    onMouseEnter={() => setHoverRating(star)}
                  />
                );
              })}
            </div>
            <button type="button" onClick={() => handleRemoveSkill(skill.name)}>
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="스킬 입력"
          className={styles.input}
          autoComplete="off"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className={styles.suggestionBox}>
          {suggestions.map((s, idx) => (
            <li
              key={s.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onClick={() => handleAddSkill(s.name)}
              className={highlightIndex === idx ? styles.highlight : ''}
            >
              <FaCode className={styles.suggestionIcon} />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default ResumeSkillCard;
