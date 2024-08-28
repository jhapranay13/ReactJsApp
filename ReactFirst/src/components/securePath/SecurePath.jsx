import { useContext, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import { LoginContext } from "../store/LoginContext";

export const SecurePath = ({children}) => {

    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginContext.userName.length == 0 || loginContext.role.length == 0) {
            navigate('/');
        }
    }, []);

    return (
        <>{children}</>
    );
};