import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authRedux";
import bannerReducer from "../redux/bannerRedux";
import brandReducer from "../redux/brandRedux";
import categoryReducer from "../redux/categoryRedux";
import productReducer from "../redux/productRedux";
import userReducer from "../redux/userRedux";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    banner: bannerReducer,
  },
});
