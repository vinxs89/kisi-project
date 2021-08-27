import './App.css';
import { useLogin } from './app/hooks/LoginHook';
import { Login } from './app/pages/Login';
import { Main } from './app/pages/Main';

function App() {
  const authenticated = useLogin();
  if (authenticated === false) {
    return ( <Login /> );
  } else if (authenticated === true) {
    return ( <Main /> );
  }
  return <p>.... Loading ....</p>
}

export default App;
