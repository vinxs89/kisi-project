import { useEffect, useState } from "react"
import Kisi from '../KisiWrapper';

export const useLogin = () => {
  const [userId, setUserId] = useState(undefined as unknown as  string | null);

  const notifyLogout = () => {
    setUserId(null);
  };

  const notifyLogin = (userId: string) => {
    setUserId(userId);
  };

  useEffect(() => {
    Kisi.verifyAuthentication()
      .then(setUserId)
      .catch(e => {
        console.error(e);
        setUserId(null);
      });

    Kisi.onLogout(notifyLogout);
    Kisi.onLogin(notifyLogin);

    return () => {
      Kisi.offLogout(notifyLogout);
      Kisi.offLogin(notifyLogin);
    }
  }, []);

  return userId;
}