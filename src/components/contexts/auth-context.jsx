import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CURRENT_USER_LS_KEY = 'current-user';
const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem(CURRENT_USER_LS_KEY) ?
        JSON.parse(localStorage.getItem(CURRENT_USER_LS_KEY)) : undefined
    );

    const login = (user) => {
        localStorage.setItem(CURRENT_USER_LS_KEY, JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem(CURRENT_USER_LS_KEY);
        setUser(undefined);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);