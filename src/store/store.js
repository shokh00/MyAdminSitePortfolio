import { configureStore } from "@reduxjs/toolkit";
import reducer from "../store/reducer";

const store = configureStore({
  reducer: { app: reducer },
})

export default store;