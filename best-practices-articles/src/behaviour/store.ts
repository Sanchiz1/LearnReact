import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { articlesApi } from "./articles";

export const rootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});