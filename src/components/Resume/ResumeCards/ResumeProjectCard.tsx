import React, { useState, useRef, useCallback, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../utils/axiosInstance';
import styles from '../ResumeCard.module.css';
import Card from '../ResumeCard';
import { ProjectCardData } from '../../../types/interfaces/ResumeData';
import { FaPencilAlt, FaCode } from 'react-icons/fa';

const emptyAchievement = '';

interface ResumeProjectCardProps {
  value: ProjectCardData[];
  onChange: (projects: ProjectCardData[]) => void;
}

interface SkillAutoCompleteResponse {
  id: number;
  name: string;
}

const ResumeProjectCard: React.FC<ResumeProjectCardProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<ProjectCardData>({
    name: '',
    period: '',
    description: '',
    role: '',
    techStack: [],
    achievements: [],
    url: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<SkillAutoCompleteResponse[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);
  const abortCtrl = useRef<AbortController | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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
        setHighlightIndex(-1);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('자동완성 실패', err);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightIndex]);

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

  const handleAddSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !formData.techStack.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, trimmed] }));
    }
    setInputValue('');
    setSuggestions([]);
    setHighlightIndex(-1);
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((s) => s !== skill),
    }));
  };

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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      period: '',
      description: '',
      role: '',
      techStack: [],
      achievements: [],
      url: '',
    });
    setEditIndex(null);
    setMode('form');
  };

  const handleEdit = (index: number) => {
    setFormData(value[index]);
    setEditIndex(index);
    setMode('form');
  };

  const handleSave = () => {
    const updated =
      editIndex !== null ? value.map((item, idx) => (idx === editIndex ? formData : item)) : [...value, formData];

    onChange(updated);
    setEditIndex(null);
    setMode('list');
  };

  const handleAchievementChange = (projIndex: number, achIndex: number, value: string) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements[achIndex] = value;
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const handleAddAchievement = (projIndex: number) => {
    setFormData((prev) => ({ ...prev, achievements: [...(prev.achievements || []), emptyAchievement] }));
  };

  const handleRemoveAchievement = (projIndex: number, achIndex: number) => {
    setFormData((prev) => ({ ...prev, achievements: (prev.achievements || []).filter((_, i) => i !== achIndex) }));
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return mode === 'list' ? (
    <Card title="프로젝트">
      {value.length === 0 ? (
        <p>등록된 프로젝트가 없습니다.</p>
      ) : (
        <div>
          {value.map((p, i) => (
            <div key={i} className={styles.item}>
              <p>
                <strong>{p.name}</strong>
              </p>
              <p>{p.period}</p>
              <p>{p.techStack.join(', ')}</p>
              <p>역할: {p.role}</p>
              {p.url && <p>URL: <a href={p.url} target="_blank" rel="noopener noreferrer">{p.url}</a></p>}
              {p.achievements && p.achievements.length > 0 && (
                <div>
                  <strong>주요 성과:</strong>
                  <ul>{p.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}</ul>
                </div>
              )}
              <p>{p.description}</p>
              <div className={styles.actions}>
                <button type="button" onClick={() => handleEdit(i)} className={styles.btnSecondary}>
                  <FaPencilAlt />
                </button>
                <button type="button" onClick={() => handleDelete(i)} className={styles.removeButton}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={handleAddClick} className={styles.addButton}>
        + 프로젝트 추가
      </button>
    </Card>
  ) : (
    <Card title={editIndex !== null ? '프로젝트 수정' : '프로젝트 작성'}>
      <label>프로젝트명</label>
      <input
        name="name"
        type="text"
        placeholder="포트폴리오 웹사이트 제작"
        value={formData.name}
        onChange={handleChange}
      />
      <label>참여 기간</label>
      <input
        name="period"
        type="text"
        placeholder="2023.03 ~ 2023.05"
        value={formData.period}
        onChange={handleChange}
      />
      <label>역할</label>
      <input name="role" type="text" placeholder="백엔드 개발" value={formData.role} onChange={handleChange} />
      <label>설명</label>
      <textarea
        name="description"
        rows={3}
        placeholder="기능 및 역할 등 간단히 작성"
        value={formData.description}
        onChange={handleChange}
      />
      <label style={{ marginTop: '16px' }}>기술 스택</label>
      <div className={styles.skillInputBox}>
        {formData.techStack.map((skill) => (
          <span key={skill} className={styles.skillTag}>
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(skill)}>
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
      <label style={{ marginTop: '16px' }}>주요 성과</label>
      {(formData.achievements || []).map((ach, achIndex) => (
        <div key={achIndex} className={styles.achievementItem}>
          <input
            type="text"
            placeholder="로그인 API 응답 시간 50% 단축"
            value={ach}
            onChange={(e) => handleAchievementChange(editIndex!, achIndex, e.target.value)}
            className={styles.input}
          />
          <button type="button" onClick={() => handleRemoveAchievement(editIndex!, achIndex)} className={styles.removeButton}>
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddAchievement(editIndex!)} className={styles.addButton}>
        성과 추가
      </button>

      <label style={{ marginTop: '16px' }}>URL</label>
      <input
        name="url"
        type="url"
        placeholder="https://github.com/your-repo"
        value={formData.url}
        onChange={handleChange}
      />
      <div className={styles.btnGroup}>
        <button type="button" onClick={handleSave} className={styles.btnPrimary}>
          완료
        </button>
        <button type="button" onClick={() => setMode('list')} className={styles.btnSecondary}>
          취소
        </button>
      </div>
    </Card>
  );
};

export default ResumeProjectCard;
