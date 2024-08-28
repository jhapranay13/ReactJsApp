import classes from './AccordianCounter.module.css';
import { useState } from 'react';

export const AccordianCounter = ({children, header, counter = 0}) => {
    const [display, setDisplay] = useState(classes['hidden']);

    const onClickHandler = (event) => {

        if (display === classes['hidden']) {
            setDisplay(classes["accord-draw-area"]);
        } else {
            setDisplay(classes["hidden"]);
        }
    };
    return (
        <div className={classes["accord-container"]}>
            <div className={classes["accord-header-container"]}>
                <div className={classes["selected-video-counter"]}>
                                        {counter}
                </div>
                <button className={classes["accord-header"]} onClick={onClickHandler}>{header}</button>
            </div>
            <div className={display}>
                {children}
            </div>
        </div>
    );
}