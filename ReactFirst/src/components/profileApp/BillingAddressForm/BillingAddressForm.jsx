import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { billFormActions, initFormActions } from '../../store/ReduxStore';

import classes from '../ProfileApp.module.css';

export const BillingAddressForm = ({setBillFormDone}) => {
    const [initialState, setInitialState] = useState(
        {
            billingAddressLine1: '',
            billingAddressLine2: '',
            billingCity: '',
            billingZipCode: '',
            billingState:'',
            billingCountry: '',
        }
    );
    const initForm = useSelector(state => state.initForm);
    const billForm = useSelector(state => state.billForm);
    console.log(billForm, initForm, initialState);
    const dispatch = useDispatch();

    const onChangeHandler = (event) => {

        if (event.target.checked) {

            setInitialState((prevState) => {
                return {
                    billingAddressLine1: initForm.addressLine1,
                    billingAddressLine2: initForm.addressLine2,
                    billingCity: initForm.city,
                    billingZipCode: initForm.zipCode,
                    billingState: initForm.state,
                    billingCountry: initForm.country,
                }
            });
        } else {
            const key = event.target.id;
            const value = event.target.valuel;
            console.log(key, value);
            setInitialState((prevState) => {
                return {
                    ...prevState,
                   [key]: value
                }
            });
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(billFormActions, data);
        dispatch(billFormActions.save(data));
        setBillFormDone(() => true);
        console.log(billForm, initForm);
    };

    return (
        <form className={classes["billing-mgmt-form"]} encType="multipart/form-data" action="" onSubmit={onSubmitHandler}>    
            <div className={classes["grid-layout-form"]} >
                <div>
                    <label htmFor="billingChk">Use Home Address as Billing Address</label>
                    <input type="checkbox" name="billingChk" id="billingChk" onChange={onChangeHandler}/>
                </div>
                <div className={classes["span-column-two"]}>
                    <label htmFor="billingAddressLine1">Address Line 1:</label>
                    <input type="text" id="billingAddressLine1" name="billingAddressLine1" value = {initialState.billingAddressLine1} onChange={onChangeHandler}></input>
                </div>    
                <div className={classes["span-column-two"]}>
                    <label htmFor="billingAddressLine2">Address Line 2:</label>
                    <input type="text" id="billingAddressLine2" name="billingAddressLine2" value={initialState.billingAddressLine2} onChange={onChangeHandler}></input>
                </div> 
                <div>
                    <label htmFor="billingCity">City:</label>
                    <input type="text" id="billingCity" name="billingCity" value = {initialState.billingCity}  onChange={onChangeHandler}></input>
                </div>
                <div>
                    <label htmFor="billingZipCode">Zip Code:</label>
                    <input type="text" id="billingZipCode" name="billingZipCode" value = {initialState.billingZipCode}  onChange={onChangeHandler}></input>
                </div>
                <div>
                    <label htmFor="billingState">State:</label>
                    <input type="text" id="billingState" name="billingState" value = {initialState.billingState}  onChange={onChangeHandler}></input>
                </div>
                <div>
                    <label htmFor="billingCountry">Country:</label>
                    <input type="text" id="billingCountry" name="billingCountry" value = {initialState.billingCountry} onChange={onChangeHandler}></input>
                </div>
            </div> 
            <div className={classes["form-save-reset"]}>
                <input type="submit" value="Save" className={classes["form-button-style"]}/>
                <input type="reset" value="Reset" className={classes["form-button-style"]}/>
            </div>       
        </form>
    );
};