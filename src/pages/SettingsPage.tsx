import { useState } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Inquiry } from '../types/Inquiry';
import ProfileSettings from '../components/settings/ProfileSettings';
import InquiryForm from '../components/settings/InquiryForm';
import InquiryHistory from '../components/settings/InquiryHistory';
import '../styles/SettingsPage.css';
import { UserIcon, SettingIcon, NotificationIcon, MessageIcon, WarningIcon } from '../components/SettingIcons';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);

  const handleInquirySubmit = (inquiry: Inquiry) => {
    setInquiryList((prev) => [...prev, inquiry]);
    setActiveTab('inquiryHistory');
  };

  const handleViewHistory = () => {
    setActiveTab('inquiryHistory');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'inquiryWrite':
        return <InquiryForm onSubmit={handleInquirySubmit} onViewHistory={handleViewHistory} />;
      case 'inquiryHistory':
        return <InquiryHistory list={inquiryList} onBack={() => setActiveTab('inquiryWrite')} />;
      case 'account':
      case 'notifications':
      case 'password':
      case 'delete':
        return <div style={{ color: '#888' }}>해당 기능은 추후 추가될 예정입니다.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="settings-container">
        <aside className="settings-sidebar">
          <h2>설정</h2>
          <ul>
            <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <span className="icon">
                <UserIcon />
              </span>
              <span>프로필 설정</span>
            </li>
            <li className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
              <span className="icon">
                <SettingIcon />
              </span>
              <span>계정 설정</span>
            </li>
            <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
              <span className="icon">
                <NotificationIcon />
              </span>
              <span>알림</span>
            </li>
            <li className={activeTab === 'inquiryWrite' ? 'active' : ''} onClick={() => setActiveTab('inquiryWrite')}>
              <span className="icon">
                <MessageIcon />
              </span>
              <span>문의 작성</span>
            </li>
            {/* <li
              className={activeTab === 'inquiryHistory' ? 'active' : ''}
              onClick={() => setActiveTab('inquiryHistory')}
            >
              <span className="icon"><MessageIcon /></span>
              <span>문의 내역</span>
            </li> */}
            <li className={activeTab === 'delete' ? 'active' : ''} onClick={() => setActiveTab('delete')}>
              <span className="icon">
                <WarningIcon />
              </span>
              <span>탈퇴하기</span>
            </li>
          </ul>
        </aside>

        <section className="settings-content">{renderContent()}</section>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
