import { useState } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ProfileSettings from '../components/settings/ProfileSettings';
import '../styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
      case 'notifications':
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
              프로필 설정
            </li>
            <li className="disabled">계정 설정</li>
            <li className="disabled">알림</li>
            <li className="disabled">탈퇴하기</li>
          </ul>
        </aside>

        <section className="settings-content">{renderContent()}</section>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
