import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Card from '../ResumeCard';
import styles from '../ResumeCard.module.css';
import { CertCardData } from '../../../types/interfaces/ResumeData';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../utils/axiosInstance';
import { FaPencilAlt } from 'react-icons/fa';

interface Props {
  value?: CertCardData[];
  onChange: (certs: CertCardData[]) => void;
}

interface CertificateAutoCompleteResponse {
  code: string;
  name: string;
  agency: string;
}

const ResumeCertCard: React.FC<Props> = ({ value = [], onChange }) => {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<CertCardData>({ name: '', agency: '', year: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<CertificateAutoCompleteResponse[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 조합 감지
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // suggestions가 변경될 때마다 itemRefs 초기화
  useEffect(() => {
    itemRefs.current = suggestions.map(() => null);
  }, [suggestions]);

  // highlightIndex가 변경될 때마다 해당 항목으로 스크롤
  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]!.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightIndex]);

  const fetchSuggestions = debounce(async (query: string) => {
    try {
      const resp = await axiosInstance.get<CertificateAutoCompleteResponse[]>(
        `/api/v1/certs/autocomplete?query=${encodeURIComponent(query)}`
      );
      setSuggestions(resp.data);
    } catch (err) {
      console.error('자동완성 요청 실패', err);
    }
  }, 300);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name,
      agency: name === '' ? '' : prev.agency,
    }));

    if (name.length >= 2) {
      fetchSuggestions(name);
    } else {
      setSuggestions([]);
    }

    setHighlightIndex(-1); // 입력하면 하이라이트 초기화
  };

  const handleSelectSuggestion = (s: CertificateAutoCompleteResponse) => {
    setFormData((prev) => ({
      ...prev,
      name: s.name,
      agency: s.agency,
    }));
    setSuggestions([]);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        handleSelectSuggestion(suggestions[highlightIndex]);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchToForm = (index: number | null = null) => {
    if (index !== null) {
      setFormData(value[index]);
      setEditIndex(index);
    } else {
      setFormData({ name: '', agency: '', year: '' });
      setEditIndex(null);
    }
    setSuggestions([]);
    setMode('form');
  };

  const handleSave = () => {
    const updatedCerts =
      editIndex !== null ? value.map((c, i) => (i === editIndex ? formData : c)) : [...value, formData];

    onChange(updatedCerts);
    setMode('list');
  };

  const handleDelete = (index: number) => {
    const updatedCerts = value.filter((_, i) => i !== index);
    onChange(updatedCerts);
  };

  return mode === 'list' ? (
    <Card title="자격증">
      {value.length === 0 ? (
        <p>등록된 자격증이 없습니다.</p>
      ) : (
        <div>
          {value.map((cert, index) => (
            <div key={index} className={styles.item}>
              <p><strong>{cert.name}</strong></p>
              <p>{cert.agency}</p>
              <p>{cert.year}</p>
              <div className={styles.actions}>
                <button type="button" className={styles.btnSecondary} onClick={() => switchToForm(index)}>
                  <FaPencilAlt />
                </button>
                <button type="button" className={styles.removeButton} onClick={() => handleDelete(index)}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={() => switchToForm()} className={styles.addButton}>
        + 자격증 추가
      </button>
    </Card>
  ) : (
    <Card title={editIndex !== null ? '자격증 수정' : '자격증 입력'}>
      <div className={styles.suggestionWrapper}>
        <label>자격증명</label>
        <input
          value={formData.name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="정보처리기사"
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestionBox}>
            {suggestions.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={i === highlightIndex ? styles.highlight : ''}
                onClick={() => handleSelectSuggestion(s)}
              >
                {s.name} ({s.agency})
              </li>
            ))}
          </ul>
        )}
      </div>

      <label>발급 기관</label>
      <input name="agency" value={formData.agency} onChange={handleChange} placeholder="발급 기관" />

      <label>취득 연도</label>
      <input name="year" value={formData.year} onChange={handleChange} placeholder="2023" />

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

export default ResumeCertCard;
