import classes from '../ProfileApp.module.css';
import { billFormActions, initFormActions } from '../../store/ReduxStore';
import { useDispatch, useSelector } from 'react-redux';

export const IntialAddressForm = ({setInitFormDone}) => {
    const initForm = useSelector(state => state.initForm);
    const firstName = useSelector(state =>  state.initForm.firstName);
    const dispatch = useDispatch();

    console.log(initForm);

    const onSaveHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(initFormActions);
        console.log(billFormActions);


        if (!firstName || firstName.trim().length == 0 ) {
            dispatch(initFormActions.save(data));
        } else {
            dispatch(initFormActions.modify(data));
        }
        setInitFormDone(() => true);
        console.log(initForm);
    }

    return (
        <form className={classes["profile-mgmt-form"]} onSubmit={onSaveHandler}>
            <div className={classes["grid-layout-form"]}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName"></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName"></input>
                </div>
                <div className={classes["span-column-two"]}>
                    <label htmlFor="addressLine1">Address Line 1:</label>
                    <input type="text" id="addressLine1" name="addressLine1"></input>
                </div>    
                <div className={classes["span-column-two"]}>
                    <label htmlFor="addressLine2">Address Line 2:</label>
                    <input type="text" id="addressLine2" name="addressLine2"></input>
                </div> 
                <div>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city"></input>
                </div>
                <div>
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input type="text" id="zipCode" name="zipCode"></input>
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state"></input>
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country"></input>
                </div>
            </div> 
            <div className={classes["form-save-reset"]}>
                <input type="submit" value="Save" className={classes["form-button-style"]} />
                <input type="reset" value="Reset" className={classes["form-button-style"]}/>
            </div> 
        </form>
    );
};