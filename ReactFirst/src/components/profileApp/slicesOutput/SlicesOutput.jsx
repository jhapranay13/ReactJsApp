import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionThunk } from '../../store/ReduxStore';
import classes from './SlicesOutput.module.css';


export const SlicesOutput = () => {
    const initForm = useSelector(state => state.initForm);
    const billForm = useSelector(state => state.billForm);
    const userMemo = useSelector(state => state.userMemo);
    console.log(userMemo[0], userMemo[1]);
    const dispatch = useDispatch();
    const selectedVid = [];
    const availableVid = [];

    if (userMemo[0]) {

        userMemo[0].forEach((obj, i, arr) => {
            selectedVid.push( <p>{obj.videoName}  {obj.videoTitle}</p>);
        });
    }

    if (userMemo[1]) {

        userMemo[1].forEach((obj, i, arr) => {
            availableVid.push( <p>{obj.videoName}  {obj.videoTitle}</p>);
        });
    }

    useEffect(() => {
        dispatch(userActionThunk());
    }, []);

    return(
        <div className={classes['sliceOutputContainer']}>
            <p className={classes['outputHeader']}>Intital Address From Redux</p>
                 {[
                    initForm.firstName,
                    initForm.LastName,
                    initForm.addressLine1,
                    initForm.addressLine2,
                    initForm.city,
                    initForm.zipCode,
                    initForm.state,
                    initForm.country
                ]}
            <p className={classes['outputHeader']}>Billing Address From Redux</p>
                {[
                    billForm.billingAddressLine1,
                    billForm.billingAddressLine2,
                    billForm.billingCity,
                    billForm.billingZipCode,
                    billForm.billingState,
                    billForm.billingCountry
                ]}
            <p className={classes['outputHeader']}>Fetching data from backend and updating redux</p>
                <p>SELECTED VIDEOS</p>
                {selectedVid.length ? 

                selectedVid
                : "No Video Selected"}
                <p>AVAILABLE VIDEOS</p>
                {availableVid.length ? 

                availableVid
                : "No Video Selected"}
        </div>
    );
};