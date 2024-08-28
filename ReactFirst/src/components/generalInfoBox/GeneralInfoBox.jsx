import classes from './GeneralInfoBox.module.css';
import infoImg from '../../assets/info.jpg';
import {createPortal} from 'react-dom';

export const GeneralInfoBox = ({children, display, fnToExecute}) => {
    let displayProp = classes['hidden'];

    if (display) {
        displayProp = classes['general-info'];
    }

    const onCloseHandler = (event) => {
        fnToExecute();
    };
    return createPortal(
        <div className={displayProp}>
        <div className={classes['general-info-cloak']}></div>

        <div className={classes['general-info']}>
            <div className={classes["info-img-container"]}>
                <img className={classes['info-img']} src={infoImg}/>
            </div>
            <div className={classes["info-text-btn-container"]}>
                <div className={classes["continer-x"]} onClick={onCloseHandler}>
                    <p id="general-info-close" className={classes["text-x"]}>X</p>
                </div>

                <div className={classes["info-text-container"]}>
                    <p className={classes["info-text"]}>{children}</p>
                </div>
                <div className={classes["info_ok-contianer"]}>
                    <input type="button" className={classes["info-ok-btn"]} value="ok" onClick={onCloseHandler}></input>
                </div>
            </div>
        </div></div>,
        document.querySelector('#modal')
    );
}