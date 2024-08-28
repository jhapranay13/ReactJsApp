import classes from './DisableCloak.module.css';
import {createPortal} from 'react-dom';

export const DisableCloak = ({display}) => {
    let cloakClasses = classes.hidden;

    if (display) {
        cloakClasses = classes.showCloak;
    }
    return createPortal(
        <div className={cloakClasses}>

        </div>,
        document.querySelector('#modal')
    );
}