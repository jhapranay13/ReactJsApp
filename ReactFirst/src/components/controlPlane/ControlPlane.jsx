import classes from './ControlPlane.module.css';
import companyLogo from "../../assets/company-logo.jpg";
import profilePic from "../../../public/profile-pic.avif";
import logoutLogo from "../../assets/logout.png";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchMenuItems } from '../../data/Data';
import { useContext, useRef } from 'react';
import { LoginContext } from '../store/LoginContext';
import { MenuBar } from '../menuBar/MenuBar';
import { ConfirmBox } from '../confirmBox/ConfirmBox';

export const ControlPlane = () => {
    const contextData = useContext(LoginContext);
    const ref = useRef();

    const {menuLists, queryParams} = useLoaderData();
    const navigate = useNavigate()
    const menuItems = [];
    let key = 0;

    for (const {text, componentPath} of menuLists) {
        menuItems.push(
            <div className={classes["menu-itme-container"]} key={key++}>
                <button className={classes["menu-item"]} data-component-assoc={componentPath}>{text}</button>
            </div>
        );
    }

    const logoutAction = function() {
        contextData.setUserRoleFn('');
        contextData.userName = '';
        contextData.password = '';
        navigate('/');

    }

    const logOutCancelAction = function() {
        ref.current.close();

    }
    const message = `Are you sure you want to log off??`;
    const logOutHandler = (event) => {
        ref.current.open();
    };
    return (
        <>
            <ConfirmBox ref={ref} message={message} fnToExecuteOnOk={logoutAction} fnToExecuteOnCancel={logOutCancelAction}></ConfirmBox>
            <div className={classes["main-header"]}>
                <div className={classes["main-header-container"]}>
                    <div className={classes["company-img"]} key="company-img">
                        <img className={classes["company-logo"]} src={companyLogo}/>
                    </div>
                    <div className={classes["system-name"]} key="system-name">
                        <p className={classes["system-id"]}>Javascript Experiment</p>
                    </div>
                    <div className={classes["profile-img-logout"]} key="profile-img-logout">
                        <img className={classes["profile-img"]} src={profilePic}/>
                        <img className={classes["logout-img"]} src={logoutLogo} onClick={logOutHandler}/>
                    </div>
                </div>
            </div> 
            <MenuBar menuItems={menuItems} queryParams={queryParams}/>
            <div className={classes["draw-area"]}><Outlet/></div>

        </>
    );
};

export const controlPlaneLoader = async ({request, params}) => {
    const queryParams = new URL(request.url).searchParams.get('role');
    const menuLists = await fetchMenuItems(queryParams);
    return {menuLists, queryParams};
};