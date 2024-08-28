import { Fragment, useContext, useEffect, useState } from "react";
import classes from './Login.module.css';
import avatar from '../../assets/avatar.jpg';
import { LoginContext } from "../store/LoginContext";
import { useNavigate } from "react-router-dom";
import { DisableCloak } from "../disableCloak/DisableCloak";
import { tryLogin } from "../../data/Data";

const classesForContainer = classes.login + " " + "background-cover-white";

const Login = function(props) {
    const loginContext = useContext(LoginContext);
    const[disableCloakDisplay, setDisableCloakDisplay] = useState(false);
    const[dispalyError, setDispalyError] = useState(false);

    const navigate = useNavigate();

    
    const onSignUpHandler = (event) => {
        props.setDisplaySignUp(true);
    };
    
    let loginDisabled = true;

    if (loginContext.userName && loginContext.password &&
        loginContext.userName.trim().length > 0 && loginContext.password.trim().length > 0) {
        loginDisabled = false;
    }

    const onCheckboxChangeHandler = (event) => {

        if (event.target.checked) {
            loginContext.showPasswordFn((prevState) => {
                return true;
            });
        } else {
            loginContext.showPasswordFn(false);
        }
    };

    const onLoginHandler = async (event) => {
        setDisableCloakDisplay(true);
        const role = await tryLogin(loginContext.userName, loginContext.password);

        if (role.trim().length == 0) {
            setDispalyError(true);
            setDisableCloakDisplay(false);
        }
        loginContext.setUserRoleFn(role);
    }

    useEffect( () => {

        if (loginContext.role.trim().length > 0) {
            navigate(`/welcome/${loginContext.userName}?role=${loginContext.role}`);
        }
    } , [loginContext.role]);
    return (
        <Fragment>
            <DisableCloak display={disableCloakDisplay}></DisableCloak>

            <div className = {classesForContainer}>
                <form action="" id="LoginForm">
                    <div className={classes['avatar-container']}>
                        <img className={classes["avatar-pic"]} src={avatar} />
                    </div>
                   {dispalyError ? <p className={classes["login-uname-error"]}>* Error in User Name or password</p> : null}
                    <label htmlFor="uname">Username:</label>
                    <input type = "text" id="uname" className={classes["login-userid"]} placeholder="Username" onChange={loginContext.userNamePwdFn} value={loginContext.userName}/>
                    <label htmlFor="pwd">Password:</label>
                    <input type = {!loginContext.showPassword ? "password" : "text"} id ="pwd" className={classes["login-password"]} placeholder="Password" onChange={loginContext.userNamePwdFn} value={loginContext.password}/>
                    <input type = "checkbox" tabIndex="-1" className="show-pwd-checkbox" data-for-pwd="login-password" onChange={onCheckboxChangeHandler}/>
                    <input type="button" className={classes["login-button"]} value="Login" disabled={loginDisabled} onClick={onLoginHandler}/>
                </form>
                <div className={classes["new-user-link-container"]} onClick={onSignUpHandler}><div></div><a className={classes["signup-link"]}>Click to signup</a><div></div></div>
            </div> 
        </Fragment>
    );
};

export default Login;