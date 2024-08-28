import { useState, useRef, useEffect } from 'react';
import classes from './Signup.module.css';
import { ValidationMessage } from './SignupValidation/ValidationMessage';
import { checkForUserNameAndSave } from '../../data/Data';
import { DisableCloak } from '../disableCloak/DisableCloak';
import { GeneralInfoBox } from '../generalInfoBox/GeneralInfoBox';

const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const hasNumber = /\d/; 

const Signup = function({setDisplaySignUp}) {

    const onDisplayHandler = (event) => {
        setDisplaySignUp(false);
    };
    const [signUpState, setSignupState] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
        role: 'premium',
    });
    const[disableCloakDisplay, setDisableCloakDisplay] = useState(false);
    const[generalInfoDisplay, setGeneralInfoDisplay] = useState({message: "", display: false, fnToExecute: () => {}});

    const [validUserName, setValidUserName] = useState(false);

    const dirtyState = useRef({
        userName: false,
        password: false,
        confirmPassword: false,
        validInput: false,
        errorElements: new Map()
    });

    const onChangeStateHandler = (event) => {

        if (event.target.id === 'cuname') {
            dirtyState.current = {
                ...dirtyState.current,
                userName: true
            };
            setSignupState(
                (prevState) => {
                    return {
                        ...prevState,
                        userName: event.target.value
                    };
                }
            );
        }

        if (event.target.id === 'entered-pwd') {
            dirtyState.current = {
                ...dirtyState.current,
                password: true
            };
            setSignupState(
                (prevState) => {
                    return {
                        ...prevState,
                        password: event.target.value
                    };
                }
            );
        }

        if (event.target.id === 'entered-pwd1') {
            dirtyState.current = {
                ...dirtyState.current,
                confirmPassword: true
            };
            setSignupState(
                (prevState) => {
                    return {
                        ...prevState,
                        confirmPassword: event.target.value
                    };
                }
            );
        }

        if (event.target.id === 'role-drp') {
            setSignupState(
                (prevState) => {
                    return {
                        ...prevState,
                        role: event.target.value
                    };
                }
            );
        }
    };
    const errorElements = [];
    useEffect(() => {
        const checkUserNameData = async () => {
            const isValid = await checkForUserNameAndSave(signUpState);
            setDisableCloakDisplay(() => false);

            if (!isValid) {
                dirtyState.current.errorElements.set("user-exists", 
                    <p className="error-message hidden" key="superr7">* Username already exists.</p>
                );
                dirtyState.current.validInput = false;
                dirtyState.current.userName = false;
                setSignupState(
                    (prevState) => {
                        let nextState = prevState.validationAsync + 1;
                        return {
                            ...prevState,
                            validationAsync: nextState,
                            userName:''
                        };
                    }
                );
            } else {
                const fnToExec = function() {
                    setDisplaySignUp(false);
                }
                setGeneralInfoDisplay((prevState) => {
                    return {
                        message: `Sign up for user ${signUpState.userName} is complete!!`, display: true, fnToExecute: fnToExec
                    };
                });

            }
        }

        if (dirtyState.current.userName && signUpState.userName.trim().length > 0) {
            checkUserNameData();
        }
    }, [validUserName]);
    const validateSignUp = function() {
        const userNmDirty = dirtyState.current.userName;
        const pwdDirty = dirtyState.current.password;
        const cnPwdDirty = dirtyState.current.confirmPassword;
        dirtyState.current.validInput = false;

        if (userNmDirty && signUpState.userName.length < 3) {
            dirtyState.current.errorElements.set( "user-length",                   
                <p className="error-message" key="superr1">* Username should be greater than 3 characters</p>  
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("user-length");
        }
        
    
        if (pwdDirty && signUpState.password.length < 6) {
            dirtyState.current.errorElements.set( "pwd-length",                   
                <p className="error-message" key="superr3">* Password is less than 6 characters</p> 
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("pwd-length");
        }
    
        if (pwdDirty && signUpState.password.toLowerCase() === signUpState.password) {  
            dirtyState.current.errorElements.set( "pwd-capital",                 
                <p className="error-message" key="superr4">* Password should contain one capital alphabet</p>
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("pwd-capital");
        }
    
        if (pwdDirty && signUpState.password.toUpperCase() === signUpState.password) {
            dirtyState.current.errorElements.set( "small-alpha",               
                <p className="error-message" key="superr5">* Password should contain one small alphabet</p>
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("small-alpha");
        }
    
        if (pwdDirty && !specialChars.test(signUpState.password)) {
            dirtyState.current.errorElements.set( "spcl-char",               
                <p className="error-message" key="superr6">* Password should contain one special character</p>
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("spcl-char");
        }
    
        if (pwdDirty && !hasNumber.test(signUpState.password)) {
            dirtyState.current.errorElements.set( "numeric-val",                
                <p className="error-message" key="superr8">* Password does not contain a numeric value.</p>
            );
            return;
        } else {
            dirtyState.current.errorElements.delete("numeric-val");
        }
    
        if (pwdDirty && cnPwdDirty && signUpState.confirmPassword !== signUpState.password) {
            dirtyState.current.errorElements.set( "pwd-no-match",                  
                <p className="error-message" key="superr2">* Password and confirm password do not match</p>
            );
            return;
        }  else {
            dirtyState.current.errorElements.delete("pwd-no-match");
        }

        if (!pwdDirty && cnPwdDirty) {
            dirtyState.current.errorElements.set( "pwd-no-match",                 
                <p className="error-message" key="superr2">* Password and confirm password do not match</p>
            );
            return;
        }  else {
            dirtyState.current.errorElements.delete("pwd-no-match");
        }

        if (pwdDirty && cnPwdDirty && userNmDirty) {
            dirtyState.current = {
                ...dirtyState.current,
                validInput: true
            };
        }
    };
    validateSignUp();

    for (const[key, value] of dirtyState.current.errorElements) {
        errorElements.unshift(value);
    }

    const checkUserNameAndSaveHandler = (event) => {
        setDisableCloakDisplay(() => true);
        setValidUserName((prevState) => {
            return !prevState;
        });
        event.preventDefault();
    };
    const[showPwd, setShowPwd] = useState(false);
    const[showPwd1, setShowPwd1] = useState(false);
    const onShowPwdHandler = (event) => {

        if (event.target.id === 'show-pwd') {
            
            if (event.target.checked) {
                setShowPwd(true);
            } else {
                setShowPwd(false);
            }
        }

        if (event.target.id === 'show-pwd1') {
            
            if (event.target.checked) {
                setShowPwd1(true);
            } else {
                setShowPwd1(false);
            }
        }
    };

    return (
        <>
            <div className={classes["signup-contianer"]}>
                <p className={classes["signup-header"]}>Sign Up</p>
                <div className="continer-x"><p id="signup-close" className="text-x" onClick={onDisplayHandler}>X</p></div>
                <DisableCloak display={disableCloakDisplay}></DisableCloak>
                <GeneralInfoBox display={generalInfoDisplay.display} fnToExecute={generalInfoDisplay.fnToExecute}>{generalInfoDisplay.message}</GeneralInfoBox>
                <ValidationMessage errorElements={errorElements}></ValidationMessage>
                <form action="" id="signup-form" onSubmit={checkUserNameAndSaveHandler}>
                    <div className="center-justify">
                        <label htmlFor="cuname">Enter Username:</label>
                        <input type = "text" id="cuname" className="choosen-userid" placeholder="Enter Username" onBlur={onChangeStateHandler} value={setSignupState.userName}/>
                    </div>
                    <div className="center-justify choosen-role">
                        <label htmlFor="role-drp">Select User Role:</label>
                        <select id="role-drp" className={classes["signup-select"]} defaultValue={"premium"} onChange={onChangeStateHandler}>
                            <option key="admin" value="admin">Admin</option>
                            <option key="premium" value="premium">Premium</option>
                            <option key="normal" value="normal">Normal</option>
                        </select>
                    </div>
                    <div className="center-justify">
                        <label htmlFor="entered-pwd">Enter Password:</label>
                        <input type = {showPwd ? 'text' : 'password'} id="entered-pwd" placeholder="Enter Password" onBlur={onChangeStateHandler}/>
                        <input type = "checkbox" tabIndex="-1" className="show-pwd-checkbox" id="show-pwd" onChange={onShowPwdHandler}/>
                    </div>
                    <div className="center-justify">
                        <label htmlFor="entered-pwd1">Confirm Password:</label>
                        <input type = {showPwd1 ? 'text' : 'password'} id="entered-pwd1" placeholder="Confirm Password" onBlur={onChangeStateHandler}/>
                        <input type = "checkbox" tabIndex="-1" className="show-pwd-checkbox" id="show-pwd1" onChange={onShowPwdHandler}/>
                    </div>
                    <div className="center-justify">
                        <input type = "submit" className={classes["signup-save"]} value="Save" disabled={!dirtyState.current.validInput}/>
                    </div>
                    <div className="center-justify">
                        <input type = "button" className={classes["signup-cancel"]} value="Cancel" onClick={onDisplayHandler}/>
                    </div>
                </form>
            </div> 
        </>
    );
};

export default Signup;