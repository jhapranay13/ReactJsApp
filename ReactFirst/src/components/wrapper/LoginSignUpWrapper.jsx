import Signup from "../signupComponent/Signup";
import Login from "../loginComponent/Login";
import { useState } from 'react';
import { Accordian } from "../accordian/Accordian";


const LoginSignUpWrapper = () => {
    const [displaySignUp, setDisplaySignUp] = useState(false);

    return (
        <>
            {!displaySignUp ?
                <Login setDisplaySignUp={setDisplaySignUp}></Login>
                : 
                <Signup setDisplaySignUp={setDisplaySignUp}></Signup>}
        </>
    );
};

export { LoginSignUpWrapper };