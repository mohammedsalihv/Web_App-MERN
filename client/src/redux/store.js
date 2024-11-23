import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userManagementReducer from  '../redux/user/userManagement.js';


const rootReducer = combineReducers({user: userReducer,userManagement: userManagementReducer,})

const persistConfig = {
    key: 'root' ,
    version: 1,
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)




export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
      
})



export const persistor = persistStore(store)