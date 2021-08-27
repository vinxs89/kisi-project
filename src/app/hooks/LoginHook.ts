import { useEffect, useState } from "react"
import Kisi from '../KisiWrapper';

export const useLogin = () => {
  const [authenticated, setAuthenticated] = useState(undefined as unknown as boolean);

  const notifyLogout = () => {
    setAuthenticated(false);
  };

  const notifyLogin = () => {
    setAuthenticated(true);
  };

  useEffect(() => {
    Kisi.verifyAuthentication()
      .then(setAuthenticated)
      .catch(e => {
        console.error(e);
        setAuthenticated(false);
      });

    Kisi.onLogout(notifyLogout);
    Kisi.onLogin(notifyLogin);

    return () => {
      Kisi.offLogout(notifyLogout);
      Kisi.offLogin(notifyLogin);
    }
  }, []);

  return authenticated;
}