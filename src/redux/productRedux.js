import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/productApi";

export const getProduct = createAsyncThunk(
  "product/getallproduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.fetchProduct();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getPeoductDetail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.fetchProductDetail(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.deleteProduct(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createproduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.postProduct(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateproduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.updateProduct(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    productDetail: {},
    isLoadingProductDetail: true,
    isLoadingUpdate: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoading: true,
    error: "",
  },
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getProductDetail.pending]: (state) => {
      state.isLoadingProductDetail = true;
      state.error = "";
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.productDetail = action.payload;
      state.isLoadingProductDetail = false;
      state.error = "";
    },
    [getProductDetail.rejected]: (state, action) => {
      state.isLoadingProductDetail = false;
      state.error = action.payload;
    },

    [deleteProduct.pending]: (state) => {
      state.isLoadingDelete = true;
      state.error = "";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.product = state.product.filter(
        (item) => item._id !== action.payload.deleteProduct._id
      );
      state.isLoadingDelete = false;
      state.error = "";
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoadingDelete = false;
      state.error = action.payload;
    },

    [createProduct.pending]: (state) => {
      state.isLoadingCreate = true;
      state.error = "";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.product.push(action.payload);
      state.isLoadingCreate = false;
      state.error = "";
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoadingCreate = false;
      state.error = action.payload;
    },

    [updateProduct.pending]: (state) => {
      state.isLoadingUpdate = true;
      state.error = "";
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.product = state.product.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.productDetail = action.payload;
      state.isLoadingUpdate = false;
      state.error = "";
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoadingUpdate = false;
      state.error = action.payload;
    },
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
