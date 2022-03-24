import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import uploadReducer, { fileUpload } from './uploadSlice';

export const store = configureStore({
  reducer: {
      login: loginReducer,
      upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: fileUpload,
    },
    serializableCheck: false,
  }),
});

export default store;