import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerCustomer: builder.mutation({
      query: (newUser) => ({
        url: "/user/create-customer",
        method: "POST",
        body: newUser,
      }),
    }),
    registerVendor: builder.mutation({
      query: (newUser) => ({
        url: "/user/create-vendor",
        method: "POST",
        body: newUser,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterCustomerMutation,
  useRegisterVendorMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
