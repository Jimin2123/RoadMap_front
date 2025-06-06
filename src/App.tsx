// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import useInitializeSession from './hooks/useInitializeSession';

const App = () => {
  useInitializeSession();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
