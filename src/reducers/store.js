import {configureStore} from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import invoiceReducer from './invoiceSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    invoice: invoiceReducer,
  },
});


export default store;