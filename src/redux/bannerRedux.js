import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/bannerApi";

export const getBanner = createAsyncThunk(
  "banner/getallbanner",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllBanner();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBanner = createAsyncThunk(
  "banner/createbanner",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postBanner(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBanner = createAsyncThunk(
  "banner/updatebanner",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateBanner(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deletebanner",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteBanner(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: [],
    isLoading: true,
    isLoadingAction: false,
    error: "",
  },
  extraReducers: {
    //GET BANNER
    [getBanner.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getBanner.fulfilled]: (state, action) => {
      state.banner = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getBanner.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ADD BRAND
    [createBanner.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createBanner.fulfilled]: (state, action) => {
      state.banner.unshift(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createBanner.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE BANNER
    [updateBanner.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateBanner.fulfilled]: (state, action) => {
      state.banner = state.banner.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateBanner.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE BRAND
    [deleteBanner.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteBanner.fulfilled]: (state, action) => {
      state.banner = state.banner.filter(
        (item) => item._id !== action.payload.deleteBanner._id
      );
      console.log(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteBanner.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const bannerReducer = bannerSlice.reducer;
export default bannerReducer;
