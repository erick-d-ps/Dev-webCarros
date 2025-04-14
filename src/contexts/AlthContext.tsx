import { ReactNode, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUsre: ({ name, email, uid}: UserProps) => void;
  user: UserProps | null
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (user) => {
       if(user){
        setUser({
            uid: user.uid,
            name: user?.displayName,
            email: user?.email
        })

        setLoadingAuth(false)

       }else{
        setUser(null);
        setLoadingAuth(false);
       }

    })

    return () => {
        unsub();
    }

  }, []);
  
  function handleInfoUsre({ name, email, uid }: UserProps){
    setUser({
      name,
      uid,
      email
    })

  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        handleInfoUsre,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
