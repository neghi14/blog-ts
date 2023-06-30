import { RootState } from "@lib/store/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authState } from "@types";

const initialState: authState = {
  loading: false,
  logged_in: false,
  user: {},
  refresh_token: "",
  session_token: "",
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      state.session_token = action.payload.session_token;
      state.refresh_token = action.payload.refresh_token;
      state.logged_in = true;
      state.user = action.payload.user;
    },
    setLogout: (state, action: PayloadAction<any>) => {
      state.session_token = "";
      state.refresh_token = "";
      state.user = "";
      state.logged_in = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export const selectCurrentUser: any = (state: RootState) => state.auth.user;
export const selectCurrentToken: any = (state: RootState) => {
  return {
    session_token: state.auth.session_token,
    refresh_token: state.auth.refresh_token,
  };
};
export default authSlice.reducer;
