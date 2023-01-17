import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const AuthContext = React.createContext({
    isLoggedIn: false,
    logout: () => {},
    login: () => {},
    user: null,
    token: null
});

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        const localStorageToken = localStorage.getItem('TOKEN');
        const localStorageUser = localStorage.getItem('USER');
        
         if(localStorageToken && localStorageUser) {
            setUser(localStorageUser);
            setToken(JSON.parse(localStorageToken));
            setIsLoggedin(true);
         }

            setUser(localStorageUser);
            setToken(localStorageToken);
            setIsLoggedin(false);
        
    }, [])

    const logoutHandler = () => {
        console.log("+++++++ Logout");
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER');
        setUser(null);
        setToken(null);
        setIsLoggedin(false);
        history.push('/');
    }

    const loginHandler = ({ data }) => {
        if(data.token && data.newUser) {
            setToken(data.token);
            setUser(data.newUser);
            localStorage.setItem('TOKEN', data.token); 
            localStorage.setItem('USER', JSON.stringify(data.newUser)); 
        } else {
            logoutHandler();
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            logout: logoutHandler,
            login: loginHandler,
            user: user,
            token: token
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;