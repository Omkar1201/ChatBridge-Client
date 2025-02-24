import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice.js";
import conversationReducer from "./conversationSlice.js";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // Optional: Add if you want to blacklist any reducer
    // blacklist: ['reducerName']
};

const rootReducer = combineReducers({
    user: userReducer,
    conversation: conversationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                // Optional: Add if you need to ignore specific paths in state
                ignoredPaths: [], // Add paths if needed, but better to fix the root cause
            },
        }),
});

export default store;