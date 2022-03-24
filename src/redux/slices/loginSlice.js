import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gitLogin } from '../../components/gitlogin';

export const getUserName = createAsyncThunk(
  "login/getUserName", 
  async (token) => { 
    const reqToken = "token " + token;
    const result = await gitLogin(reqToken);
    return result; 
  }
)


export const loginSlice = createSlice({
    name: 'login',
    initialState: {
      isLoggedIn: false,
      token: "",
      userName: "",
      error: null
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },

      loginSuccess: (state, action) => {
        state.isLoggedIn = true;
        },

    },
    extraReducers: (builder) => {
      builder
      .addCase(getUserName.fulfilled, (state, action) => {
          state.userName = action.payload;
      })
      .addCase(getUserName.rejected, (state, action) => {
        state.error = action.payload;
      });
    },
  });
  
export const { setToken, loginSuccess } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLogin = ({ login }) => login;