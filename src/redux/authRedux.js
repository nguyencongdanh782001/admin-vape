import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api/authApi";

export const signIn = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.signIn(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.signUp(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentAuthUser: {},
    isLoading: false,
    error: "",
  },
  reducers: {
    logout: (state, action) => {
      Cookies.remove("token");
    },
  },
  extraReducers: {
    // ----------------------------------------------------------SIGNIN----------------------------------------------------------
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [signIn.fulfilled]: (state, action) => {
      state.currentAuthUser = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----------------------------------------------------------REGISTER----------------------------------------------------------
    [signUp.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [signUp.fulfilled]: (state, action) => {
      state.currentAuthUser = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authReducer;
