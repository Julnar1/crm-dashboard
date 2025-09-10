import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leadsReducer from './slices/leadsSlice';
import companiesReducer from './slices/companiesSlice';
import dealsReducer from './slices/dealsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
    companies: companiesReducer,
    deals: dealsReducer,
  },
});

export default store; 