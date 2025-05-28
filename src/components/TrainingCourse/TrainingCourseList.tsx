import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrainingCourseItem } from '../../utils/TrainingCourseItem';
import Loader from '../common/Loader'; // 경로 확인해서 import

const TrainingCourseList: React.FC = () => {
  const [courses, setCourses] = useState<TrainingCourseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/training-courses?ncsCodes=20010101&ncsCodes=20010202');
        setCourses(response.data);
      } catch (err) {
        setError('훈련과정 데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const displayedCourses = courses.slice(0, 10);

  return (
    <div>
      <h2>훈련과정 목록</h2>

      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {displayedCourses.map((course) => (
            <li key={course.trprId}>
              <h3>{course.title}</h3>
              <p>기관: {course.instCd}</p>
              <p>
                기간: {course.traStartDate} ~ {course.traEndDate}
              </p>
              <p>주소: {course.address}</p>
              <p>만족도: {course.stdgScor}</p>
              <a href={course.titleLink} target="_blank" rel="noopener noreferrer">
                과정 링크 바로가기
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainingCourseList;
