import { useState } from 'react';
import { Provider } from 'react-redux';
import { reduxStore } from '../store/ReduxStore';
import { BillingAddressForm } from './BillingAddressForm/BillingAddressForm';
import { IntialAddressForm } from './InitialAddressForm/InitialAddressForm';
import classes from './ProfileApp.module.css';
import { SlicesOutput } from './slicesOutput/SlicesOutput';

export const ProfileApp = () => {
    const [initFormDone, setInitFormDone] = useState(false);
    const [billFormDone, setBillFormDone] = useState(false);
    return (
        <Provider store={reduxStore}>
            <div className={classes["profile-management-draw-area"]}>
                <div className={classes["profile-mgmt-container"]}>
                    <p className={classes["profile-mgmt-header"]}>PROFILE MANAGEMENT</p>
                </div>
                {!initFormDone ? <IntialAddressForm setInitFormDone={setInitFormDone}></IntialAddressForm> : null}
                {initFormDone && !billFormDone ? <BillingAddressForm setBillFormDone={setBillFormDone}></BillingAddressForm> : null}
                {billFormDone ? <SlicesOutput></SlicesOutput> : null}
            </div>
        </Provider>
    );
};