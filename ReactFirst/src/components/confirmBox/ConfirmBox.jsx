import { createPortal } from 'react-dom';
import classes from './ConfirmBox.module.css';
import confirmImg from '../../assets/confirm.webp';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';


export const ConfirmBox = forwardRef(({ message, fnToExecuteOnOk, fnToExecuteOnCancel}, ref) => {
    let displayProp = classes['hidden'];
    let displayPropContainer = classes['hidden'];
    const [display, setDisplay] = useState(false);
    const [disabled, setDisabled] = useState(false);
    
    if (display) {
        displayPropContainer = classes["confirm-component"];
        displayProp = classes["cloak"];
    }
    const dialog = useRef();
    const cloak = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                setDisplay((prev) => {
                    return true;
                });
            },
            close() {
                setDisplay((prev) => {
                    setDisabled(() => false);
                    return false;
                });
            }
        };
    });

    const onClickHandler = () => {
        setDisabled(() => true);
        fnToExecuteOnOk();
    };

    const onClickCancelHandler = (event) => {
        fnToExecuteOnCancel();
    }
    return createPortal(
        <>
            <div className={displayProp} ref={cloak}>
            </div>
            <div className={displayPropContainer} ref={dialog}>
                <div className={classes["confirm-container"]}>
                    <div className={classes["confirm-img-container"]}>
                        <img className={classes["confirm-img"]} src={confirmImg}/>
                    </div> 
                    <div className={classes["confirm-text-container"]}>   
                        <p className={classes["confirmation-text"]}>{message}</p>
                        <div className={classes["ok-cancel-btn-tab"]}>
                            <input type="button" className={classes["confirmation-ok"]} value="Ok" onClick={onClickHandler} disabled={disabled}/>
                            <input type="button" className={classes["confirmation-cancel"]} value="Cancel" onClick={onClickCancelHandler} disabled={disabled}/>
                        </div>    
                    </div>    
                </div>
            </div>
        </>,
        document.querySelector('#modal')
    );
});