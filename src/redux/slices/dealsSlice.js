import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deals: [],
  status: 'idle',
  error: null
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    addDeal: (state, action) => {
      state.deals.push(action.payload);
    },
    updateDeal: (state, action) => {
      const index = state.deals.findIndex(deal => deal.id === action.payload.id);
      if (index !== -1) {
        state.deals[index] = action.payload;
      }
    },
    deleteDeal: (state, action) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
    },
    setDeals: (state, action) => {
      state.deals = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { addDeal, updateDeal, deleteDeal, setDeals, setStatus, setError } = dealsSlice.actions;

// Selectors
export const selectDeals = (state) => state.deals.deals;
export const selectDealsStatus = (state) => state.deals.status;
export const selectDealsError = (state) => state.deals.error;
export const selectDealById = (state, dealId) => 
  state.deals.deals.find(deal => deal.id === dealId);

export default dealsSlice.reducer;
