import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/brandApi";

export const getBrand = createAsyncThunk(
  "brand/getallbrand",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllBrand();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/createbrand",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postBrand(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updatebrand",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateBrand(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deletebrand",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteBrand(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brand: [],
    isLoading: true,
    isLoadingAction: false,
    error: "",
  },
  extraReducers: {
    //GET BRAND
    [getBrand.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getBrand.fulfilled]: (state, action) => {
      state.brand = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ADD BRAND
    [createBrand.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createBrand.fulfilled]: (state, action) => {
      state.brand.unshift(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createBrand.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE BRAND
    [updateBrand.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateBrand.fulfilled]: (state, action) => {
      state.brand = state.brand.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateBrand.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE BRAND
    [deleteBrand.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.brand = state.brand.filter(
        (item) => item._id !== action.payload.deleteBrand._id
      );
      console.log(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteBrand.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const brandReducer = brandSlice.reducer;
export default brandReducer;
