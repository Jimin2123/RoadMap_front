export const educationLevelMap: Record<string, string> = {
  ELEMENTARY: '초등학교',
  MIDDLE: '중학교',
  HIGH: '고등학교 졸업',
  COLLEGE: '(2/3년제) 대학교',
  UNIVERSITY: '4년제 대학교',
  GRADUATE_SCHOOL: '대학원',
};

// 사용 예시 //
// import { educationLevelMap } from './utils/educationLevelMap';

// <h4>학력: {educationLevelMap[member.profileResponse.educationLevel]}</h4>
