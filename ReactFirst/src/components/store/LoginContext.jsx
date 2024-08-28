import { createContext, useState } from "react";

const initLoginValue = {
    userName:"",
    password:"",
    role:"",
    showPassword: false,
    loginDisabled: true,
    userNamePwdFn: () => {},
    showPasswordFn: () => {},
    setUserRoleFn: () => {}
};

export const LoginContext = createContext();


export const LoginContextProvider = ({children}) => {
    const [userNamePwd, setUserNamePwd] = useState({
        userName: '',
        password: ''
    });

    const setUserOrPwd = (state) => {

    };
    const [showPassword, setShowPassword] = useState(false);
    const [userRole, setUserRole] = useState('');

    const textChangeHandler = (event) => {

        if (event.target.id === 'uname') {

            setUserNamePwd((prevState) => {
                let returnObj = {
                    ...prevState,
                    userName: event.target.value
                };
                return returnObj;
            });
        }

        if (event.target.id === 'pwd') {

            setUserNamePwd((prevState) => {
                let returnObj = {
                    ...prevState,
                    password: event.target.value
                };
                return returnObj;
            });
        }
    };
    const setRole = (role) => {
        setUserRole(role);
    }
    
    const valueForContext = {...initLoginValue,
        userNamePwdFn: textChangeHandler, 
        showPasswordFn: setShowPassword,
        setUserRoleFn: setRole,
        userName: userNamePwd.userName,
        password: userNamePwd.password,
        role: userRole,
        showPassword
    };

    return (
        <LoginContext.Provider value={valueForContext}>
            {children}
        </LoginContext.Provider>
    );
};