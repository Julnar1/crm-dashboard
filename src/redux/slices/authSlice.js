import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  registerStatus: 'idle',
  forgotPasswordStatus: 'idle',
  resetPasswordStatus: 'idle',
};

// Async thunk for login simulation
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        // Mock successful response
        const mockUser = {
          id: 1,
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'user',
        };
        return mockUser;
      } else {
        // Mock error response
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for register simulation
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration - but don't log user in
      // In real implementation, this would just create the account
      return { 
        message: 'Registration successful! Please login with your credentials.',
        email: userData.email 
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for forgot password simulation
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(String(email).trim())) {
        throw new Error('Invalid email address');
      }
      
      // In real implementation, this would:
      // 1. Check if email exists in database
      // 2. Generate a secure, time-limited token
      // 3. Store token hash in database (not localStorage)
      // 4. Send email with reset link containing token
      
      // Simulate token generation
      const token = 'abc123securetoken'; // In real app, generate securely
      // Log the reset link for testing
      console.log(`Simulated reset link: http://localhost:3000/reset-password/${token}`);
      return { message: 'If an account with this email exists, a password reset link has been sent.', email, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for reset password simulation
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real implementation, this would:
      // 1. Send token, password, and confirmPassword to backend
      // 2. Backend validates token against database
      // 3. Backend checks if token is expired or already used
      // 4. Backend updates password in database
      // 5. Backend invalidates/removes the token
      
      // Mock validation
      if (!token) {
        throw new Error('Reset token is required');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful response
      return { 
        message: 'Password reset successful! Please login with your new password.',
        email: 'user@example.com' // In real app, this would come from token validation
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Reset status
    resetStatus: (state) => {
      state.loginStatus = 'idle';
      state.registerStatus = 'idle';
      state.forgotPasswordStatus = 'idle';
      state.resetPasswordStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginStatus = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.loginStatus = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.loginStatus = 'failed';
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerStatus = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't authenticate user after registration
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.registerStatus = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.registerStatus = 'failed';
      })
      // Forgot Password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.forgotPasswordStatus = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.forgotPasswordStatus = 'succeeded';
        // Don't store any tokens in state for security
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.forgotPasswordStatus = 'failed';
      })
      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetPasswordStatus = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.resetPasswordStatus = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.resetPasswordStatus = 'failed';
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loginStatus = 'idle';
        state.registerStatus = 'idle';
        state.forgotPasswordStatus = 'idle';
        state.resetPasswordStatus = 'idle';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError, resetStatus } = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectRegisterStatus = (state) => state.auth.registerStatus;
export const selectForgotPasswordStatus = (state) => state.auth.forgotPasswordStatus;
export const selectResetPasswordStatus = (state) => state.auth.resetPasswordStatus;

// Export reducer as default
export default authSlice.reducer; 