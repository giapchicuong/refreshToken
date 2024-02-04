import { createContext, useEffect, useState } from "react";
import { getAvatar, getUserAccount } from "../services/userServices";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    accessToken: "",
    account: {},
  };

  const [user, setUser] = useState(userDefault);

  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const avatarContext = () => {
    fetchUserAccount();
  };

  const fetchUserAccount = async () => {
    let res = await getUserAccount();
    if (res && res.EC === 0) {
      const accessToken = res.DT.accessToken;
      const email = res.DT.email;
      const groupId = res.DT.groupId;
      const resAvatar = await getAvatar(email);
      if (resAvatar && resAvatar.EC === 0) {
        const avatar = resAvatar.DT.avatar;
        let data = {
          isAuthenticated: true,
          accessToken: accessToken,
          account: {
            email,
            avatar,
            groupId,
          },
        };
        setUser(data);
      }
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUserAccount();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loginContext, logoutContext, avatarContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
