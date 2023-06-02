import { configureStore } from '@reduxjs/toolkit';
import RepositoriesReducer from './repositories.reducer';

export const store = configureStore({
  reducer: {
    RepositoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// export default store;