import classes from './MenuBar.module.css';
import menubarLogo from "../../assets/menubar-icon.png";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DisableCloak } from '../disableCloak/DisableCloak';


export const MenuBar = ({menuItems, queryParams}) => {
    
    const navigate = useNavigate();

    const onMenuClickHandler = (event) => {
        const component = event.target.dataset.componentAssoc;

        if (component === 'Adminstration') {
            navigate(`./administration?role=${queryParams}`);
        }  

        if (component === 'VideoLibrary') {
            navigate(`./videolibrary?role=${queryParams}`);
        }

        if (component === 'CounterApp') {
            navigate(`./counterapp?role=${queryParams}`);
        }

        if (component === 'QuizApp') {
            navigate(`./quizapp?role=${queryParams}`);
        }
    };
    return (
        <div className={classes["menubar"]}>
            <div className={classes["menubar-container"]}>
                <div className={classes["menubar-img-container"]} key="menubar-img-container">
                    <img className={classes["menubar-img"]} src={menubarLogo}/>
                </div>
                <div className={classes["menu-holder"]} onClick={onMenuClickHandler} key="menu-holder">
                    {menuItems}
                </div>
            </div>    
        </div> 
    );
};