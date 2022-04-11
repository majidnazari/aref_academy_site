import { useState, createContext } from 'react';
import { getToken } from '../utils/auth';

interface contextProps {
    isLoggedIn: boolean;
    login: Function;
}
export const AuthContext = createContext<contextProps>({
    isLoggedIn: false,
    login: () => { },
});

const AuthContextProvider = (props: any) => {
    const hasToken = !!getToken();
    const [isSignin, setIsSignin] = useState(hasToken);
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isSignin,
            login: (inp : boolean) => setIsSignin(inp),
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;