import { ToastProvider } from 'context/ToastProvider';
import RoutesApp from './Routes';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
