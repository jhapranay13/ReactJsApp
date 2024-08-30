import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fetchVideoData } from "../../data/Data";


const initStateInitForm = {
    firstName: '',
    LastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    state:'',
    country: '',
}

const initFormSlice = createSlice(
    {
        name: 'initForm',
        initialState: initStateInitForm,
        reducers: {
            save(state, action) {
                console.log("saving", action.payload);
                state.firstName= action.payload.firstName;
                state.LastName= action.payload.LastName;
                state.addressLine1= action.payload.addressLine1;
                state.addressLine2= action.payload.addressLine2;
                state.city= action.payload.city;
                state.zipCode= action.payload.zipCode;
                state.state= action.payload.state;
                state.country= action.payload.country;
            },
            modify(state, action) {
                return {
                    ...state,
                    ...action.payload,
                }
            },
        }
    }
);

const initStatebillingForm =  {
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingCity: '',
    billingZipCode: '',
    billingState:'',
    billingCountry: '',
};

const billingFormSlice = createSlice(
    {
        name: 'billingForm',
        initialState: initStatebillingForm,
        reducers: {
            save(state, action) {
                console.log("Bill address save", action.payload);
                return {...action.payload};
            }
        }
    }
);

const userSliceInitState = [];

const userSlice = createSlice(
    {
        name: 'users',
        initialState: userSliceInitState,
        reducers: {
            save(state, action) {
                console.log("User save", action.payload);
                const {videoSelected, videoAvailable} = action.payload;
                return [[...videoSelected], [...videoAvailable]];
            }
        }
    }
);

export const reduxStore = configureStore({
    reducer: {initForm: initFormSlice.reducer, billForm : billingFormSlice.reducer, userMemo: userSlice.reducer}
});

export const userActionThunk = () => {
    return async (dispatch) => {
        console.log("Fetching data from backend");
        const data = await fetchVideoData();
        dispatch(userActions.save(data));
    };
};

export const initFormActions = initFormSlice.actions;
export const billFormActions = billingFormSlice.actions;
export const userActions = userSlice.actions;
