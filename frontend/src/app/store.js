import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducers/counter/counterSlice';
import userReducer from '../reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});