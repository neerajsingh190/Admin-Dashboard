// is folder me basically backend se data lene k liye redux tolkt quer ka use kr rh h 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
      "User",
      "Products",
      "Customers",
      "Transactions","Geography","Sales",
    ],
    endpoints: (build) => ({
      getUser: build.query({
        // isme jo b app use m link h fir route m link h vo dala jata h as an endpoint
        query: (id) => `general/user/${id}`,
        providesTags: ["User"],
      }),
      getProducts: build.query({
        query: () => "client/products",
        providesTags: ["Products"],
      }),
      getCustomers: build.query({
        query: () => "client/customers",
        providesTags: ["Customers"],
      }),
      getTransactions: build.query({
        query: ({ page, pageSize, sort, search }) => ({
          url: "client/transactions",
          method: "GET",
          params: { page, pageSize, sort, search },
        }),
        providesTags: ["Transactions"],
      }),
      getGeography: build.query({
        query: () => "client/geography",
        providesTags: ["Geography"],
      }),
      getSales: build.query({
        query: () => "sales/sales",
        providesTags: ["Sales"],
      }),
    })
})
// exporting the action 
export const {
    useGetUserQuery,useGetProductsQuery,useGetCustomersQuery ,useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery,
} = api;