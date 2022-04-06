import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/userApi";
import * as authApi from "../api/authApi";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllUser(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailUser = createAsyncThunk(
  "user/getDetailUser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getUserDetail(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserStats = createAsyncThunk(
  "user/getUserStats",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getUserStats();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateUser(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.signUp(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.deleteUser(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    userStats: [],
    listUser: [],
    userDetail: {},
    isLoading: true,
    isLoadingListUser: true,
    isLoadingUserStats: true,
    isLoadingUserDetail: true,
    isLoadingUserUpdate: false,
    isLoadingUserCreate: false,
    isLoadingUserDelete: false,
    error: "",
    errorUpdate: "",
    errorCreate: "",
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getAllUser.pending]: (state) => {
      state.isLoadingListUser = true;
      state.error = "";
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.listUser = action.payload;
      state.isLoadingListUser = false;
      state.error = "";
    },

    [getAllUser.rejected]: (state, action) => {
      state.isLoadingListUser = false;
      state.error = action.payload;
    },

    [getDetailUser.pending]: (state) => {
      state.isLoadingUserDetail = true;
      state.error = "";
    },
    [getDetailUser.fulfilled]: (state, action) => {
      state.userDetail = action.payload;
      state.isLoadingUserDetail = false;
      state.error = "";
    },

    [getDetailUser.rejected]: (state, action) => {
      state.isLoadingUserDetail = false;
      state.error = action.payload;
    },

    [getUserStats.pending]: (state) => {
      state.isLoadingUserStats = true;
      state.error = "";
    },

    [getUserStats.fulfilled]: (state, action) => {
      state.userStats = action.payload;
      state.isLoadingUserStats = false;
      state.error = "";
    },
    [getUserStats.rejected]: (state, action) => {
      state.isLoadingUserStats = false;
      state.error = action.payload;
    },

    [updateUser.pending]: (state) => {
      state.isLoadingUserUpdate = true;
      state.error = "";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoadingUserUpdate = false;
      state.userDetail = action.payload;
      state.listUser = state.listUser.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoadingUserUpdate = false;
      state.errorUpdate = action.payload;
    },

    [createUser.pending]: (state) => {
      state.isLoadingUserCreate = true;
      state.error = "";
    },
    [createUser.fulfilled]: (state, action) => {
      state.isLoadingUserCreate = false;
      state.listUser = state.listUser.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.isLoadingUserCreate = false;
      state.errorCreate = action.payload;
    },

    [deleteUser.pending]: (state) => {
      state.isLoadingUserDelete = true;
      state.error = "";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.product = state.listUser.filter(
        (item) => item._id !== action.payload.deleteUser._id
      );
      state.isLoadingUserDelete = false;
      state.error = "";
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoadingUserDelete = false;
      state.error = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
