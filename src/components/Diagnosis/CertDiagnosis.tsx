import { useSelector } from 'react-redux';
import { RootState } from '../../types/store';

const CertDiagnosis = () => {
  const certs = useSelector((state: RootState) => state.user.member?.profile?.certificates ?? []);

  const techCertKeywords = ['정보처리', 'SQL', 'AWS', 'Azure', 'Google', '리눅스', '프론트엔드', '백엔드', '개발자'];
  const recentYear = new Date().getFullYear() - 3;

  const score = certs.reduce((acc, cert) => {
    const isTech = techCertKeywords.some((kw) => cert.name.includes(kw));
    const isRecent = parseInt(cert.year) >= recentYear;
    return acc + (isTech ? 10 : 3) + (isRecent ? 5 : 0);
  }, 0);

  const uniqueAgencies = [...new Set(certs.map((c) => c.agency))];

  return (
    <div>
      <p>
        <strong>총 자격증 수:</strong> {certs.length}개
      </p>
      <p>
        <strong>발급 기관 수:</strong> {uniqueAgencies.length}곳
      </p>
      <p>
        <strong>기술 관련 자격증 수:</strong>{' '}
        {certs.filter((c) => techCertKeywords.some((k) => c.name.includes(k))).length}개
      </p>
      <p>
        <strong>총 진단 점수:</strong> {score} / 100
      </p>
    </div>
  );
};

export default CertDiagnosis;
