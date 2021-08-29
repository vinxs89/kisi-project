import { useLogin } from './app/hooks/LoginHook';
import { Login } from './app/pages/Login';
import { Main } from './app/pages/Main';

function App() {
  const user = useLogin();
  if (user === undefined) {
    return <p>.... Loading ....</p>
  } else if (user === null) {
    return ( <Login /> );
  } else {
    return ( <Main user={user} /> );
  }
}

export default App;
