import blogrApi from "@lib/actions/blogr.actions";

const authService = blogrApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body: body,
      }),
    }),
    verify: build.mutation({
      query: (body) => ({
        url: "auth/verify-me",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyMutation } = authService;
