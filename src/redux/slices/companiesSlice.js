import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  companies: [
    {
      id: "clientedge",
      name: "ClientEdge",
      domain: "clientedge.com",
      owner: "Jane Cooper",
      phone: "078 5432 8505",
      industry: "Legal Services",
      city: "Toronto",
      type: "Customer",
      country: "Canada",
      employees: "50-100",
      revenue: "15,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "relatia",
      name: "Relatia",
      domain: "relatia.com",
      owner: "Wade Warren",
      phone: "077 5465 8785",
      industry: "Healthcare",
      city: "Amsterdam",
      type: "Partner",
      country: "Netherlands",
      employees: "200-500",
      revenue: "45,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "trustsphere",
      name: "TrustSphere",
      domain: "trustsphere.com",
      owner: "Brooklyn Simmons",
      phone: "070 4531 9507",
      industry: "Real Estate",
      city: "Bangalore",
      type: "Vendor",
      country: "India",
      employees: "100-120",
      revenue: "20,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "salestrail",
      name: "SalesTrail",
      domain: "salestrail.com",
      owner: "Leslie Alexander",
      phone: "078 2824 3334",
      industry: "Financial Advisory",
      city: "Zurich",
      type: "Partner",
      country: "Switzerland",
      employees: "75-150",
      revenue: "30,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "pipelineiq",
      name: "PipelineIQ",
      domain: "pipelineiq.com",
      owner: "Jenny Wilson",
      phone: "079 8761 9681",
      industry: "Retail & E-commerce",
      city: "Austin",
      type: "Vendor",
      country: "USA",
      employees: "300-600",
      revenue: "80,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "syncfolio",
      name: "Syncfolio",
      domain: "syncfolio.com",
      owner: "Guy Hawkins",
      phone: "078 5432 8505",
      industry: "Logistics & Supply Chain",
      city: "Dubai",
      type: "Vendor",
      country: "UAE",
      employees: "150-300",
      revenue: "35,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "custologic",
      name: "CustoLogic",
      domain: "custologic.com",
      owner: "Robert Fox",
      phone: "077 5465 8785",
      industry: "Marketing Agencies",
      city: "Singapore",
      type: "Vendor",
      country: "Singapore",
      employees: "80-120",
      revenue: "25,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: "engageware",
      name: "EngageWare",
      domain: "engageware.com",
      owner: "Cameron Williamson",
      phone: "078 2824 3334",
      industry: "Education Technology",
      city: "Cape Town",
      type: "Vendor",
      country: "South Africa",
      employees: "60-100",
      revenue: "18,00,00,000",
      created: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
  ],
  status: 'idle',
  error: null,
  loading: false,
};

// Async thunks
export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new ID and add created date
      const newCompany = {
        ...companyData,
        id: companyData.domain.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
        created: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZoneName: 'short'
        })
      };
      
      return newCompany;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return companyData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (companyId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return companyId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.companies.unshift(action.payload);
        state.error = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const index = state.companies.findIndex(company => company.id === action.payload.id);
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.companies = state.companies.filter(company => company.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError, resetStatus } = companiesSlice.actions;

// Selectors
export const selectAllCompanies = (state) => state.companies.companies;
export const selectCompanyById = (state, companyId) => 
  state.companies.companies.find(company => company.id === companyId);
export const selectCompaniesStatus = (state) => state.companies.status;
export const selectCompaniesLoading = (state) => state.companies.loading;
export const selectCompaniesError = (state) => state.companies.error;

export default companiesSlice.reducer;