import { Inquiry } from '../../types/interfaces/Inquiry';
import './InquiryHistory.css';

interface Props {
  list: Inquiry[];
  onBack: () => void;
}

const InquiryHistory = ({ list, onBack }: Props) => {
  return (
    <div className="inquiry-history">
      <div className="header">
        <h2>문의 내역</h2>
        <button onClick={onBack} className="back-button">
          ← 문의 작성
        </button>
      </div>
      {list.length === 0 ? (
        <p>문의 내역이 없습니다.</p>
      ) : (
        <ul>
          {list.map((item, index) => (
            <li key={index} className="inquiry-item">
              <strong>{item.subject}</strong> <span>({item.category})</span>
              <p>{item.message}</p>
              {item.fileName && <p>📎 {item.fileName}</p>}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryHistory;
