import { RootState } from "@lib/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

const BACKEND_URL = process.env.endpoint || "http://localhost:8080/api/v1/" ;

const blogrApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const session_token: string = (getState() as RootState).auth
        .session_token;
      const refresh_token: string = (getState() as RootState).auth
        .refresh_token;
      if (session_token && refresh_token) {
        headers.set("authorization", `Bearer ${session_token}`);
        headers.set("x-refresh", refresh_token);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});

export default blogrApi;
