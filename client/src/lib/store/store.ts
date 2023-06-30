import { configureStore, Middleware } from "@reduxjs/toolkit";
import authSlice from "@lib/features/authSlice";
import blogrApi from "@lib/actions/blogr.actions";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [blogrApi.reducerPath]: blogrApi.reducer,
  },
  middleware: (gDM) => {
    return gDM().concat(blogrApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
