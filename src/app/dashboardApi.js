
import { mainApi } from "./mainApi.js";

export const dashboardApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Students"]
    })
  })
});

export const { useGetDashboardStatsQuery } = dashboardApi;