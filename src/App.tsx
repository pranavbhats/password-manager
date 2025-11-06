import { AppRouter } from './router';
import AuthInitializer from './components/templates/AuthInitializer';
import './App.css';

function App() {
  return (
    <AuthInitializer>
      <AppRouter />
    </AuthInitializer>
  );
}

export default App;
