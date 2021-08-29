import { useEffect, useState } from "react"
import Kisi from '../KisiWrapper';
import { User } from "../Types";

export const useLogin = () => {
  const [user, setUser] = useState(undefined as unknown as User | null);

  const notifyLogout = () => {
    setUser(null);
  };

  const notifyLogin = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    Kisi.verifyAuthentication()
      .then(setUser)
      .catch(e => {
        console.error(e);
        setUser(null);
      });

    Kisi.onLogout(notifyLogout);
    Kisi.onLogin(notifyLogin);

    return () => {
      Kisi.offLogout(notifyLogout);
      Kisi.offLogin(notifyLogin);
    }
  }, []);

  return user;
}