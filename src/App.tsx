import { useLogin } from './app/hooks/LoginHook';
import { Login } from './app/pages/Login';
import { Main } from './app/pages/Main';

function App() {
  const userId = useLogin();
  if (userId === undefined) {
    return <p>.... Loading ....</p>
  } else if (userId === null) {
    return ( <Login /> );
  } else {
    return ( <Main userId={userId} /> );
  }
}

export default App;
