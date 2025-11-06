import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// Persist configuration
const persistConfig = {
     key: 'safevault',
     storage,
     whitelist: ['auth'], // Only persist auth slice (user data)
     blacklist: ['ui'], // Don't persist UI state
};

// Auth persist configuration (for sensitive data)
const authPersistConfig = {
     key: 'auth',
     storage,
     blacklist: ['isLoading', 'error'], // Don't persist loading states and errors
};

// Root reducer
const rootReducer = combineReducers({
     auth: persistReducer(authPersistConfig, authReducer),
     ui: uiReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                    ignoredPaths: ['_persist'],
               },
          }),
     devTools: import.meta.env.DEV,
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;