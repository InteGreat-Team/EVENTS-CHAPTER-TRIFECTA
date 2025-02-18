import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserAuth } from './useAuthContext';
import { getUserInfo, getUserInfoByTenant } from '../server/FirebaseClient';

export const UserInfoContext = createContext();

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const { user } = UserAuth();

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        try {
          const currentTenant = await getUserInfo(
            user,
          );
          //console.log("Current User UID:", currentTenant.uid);
          //console.log("Current User Email:", currentTenant.companyEmail);
          //console.log("company Email:", user.email);
          //console.log("company Name:", user.displayName);
          if (currentTenant.companyEmail.toLowerCase() === user.email.toLowerCase()) { 
            setUserInfo(currentTenant);
            console.log(currentTenant);
            console.log(user);
          } else {
            const currentUser = await getUserInfoByTenant(user, user.displayName); // user.displayName is the company name of the user
            console.log("Current User is not a Super Admin");
            setUserInfo(currentUser);
            console.log(currentUser);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUser();
  }, [user]);

  useEffect(() => {
  console.log(userInfo);
}, [userInfo]);

  const contextValue = {
    userInfo,
    setUserInfo,
  };

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
}