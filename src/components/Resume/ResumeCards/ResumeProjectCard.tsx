import React, { useState, useRef, useCallback, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../utils/axiosInstance';
import styles from './ResumeProjectCard.module.css';
import Card from '../ResumeCard';
import { ProjectCardData } from '../../../types/interfaces/ResumeData';

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
    techStack: [],
    description: '',
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
    setFormData({ name: '', period: '', techStack: [], description: '' });
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

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return mode === 'list' ? (
    <Card title="프로젝트">
      {value.length === 0 ? (
        <p>등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className={styles.projectItemList}>
          {value.map((p, i) => (
            <div key={i} className={styles.projectItem}>
              <p className={styles.projectTitle}>
                <strong>{p.name}</strong>
              </p>
              <p>{p.period}</p>
              <p>{p.techStack.join(', ')}</p>
              <p>{p.description}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(i)} className={styles.editButton}>
                  수정
                </button>
                <button onClick={() => handleDelete(i)} className={styles.deleteButton}>
                  삭제
                </button>
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
      <label>기술 스택</label>
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
              {s.name}
            </li>
          ))}
        </ul>
      )}
      <label>설명</label>
      <textarea
        name="description"
        rows={3}
        placeholder="기능 및 역할 등 간단히 작성"
        value={formData.description}
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
