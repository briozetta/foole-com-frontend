import {combineReducers, configureStore,} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import {persistReducer,persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import cartReducer from "./cartSlice";

const rootReducer=combineReducers({
    user:userReducer,
    cartCount:cartReducer
});

const persistConfig = {
    key: 'root', // single key for the root reducer
    version: 1,
    storage,
    whitelist: ['user', 'cartCount'] // specify which slices to persist
};
const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
})

export const persistor=persistStore(store)