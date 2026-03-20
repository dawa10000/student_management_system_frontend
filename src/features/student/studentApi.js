import { mainApi } from "../../app/mainApi.js";


const studentApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getStudents: builder.query({
      query: (query) => ({
        url: '/students',
        method: 'GET',
        params: query
      }),
      providesTags: ['Student']
    }),

    getStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET'
      }),
      providesTags: ['Student']
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: '/students',
        method: 'POST',
        body: data.body,
        headers: {
          Authorization: data.token
        }

      }),
      invalidatesTags: ['Student']
    }),

    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/students/${data.id}`,
        method: 'PATCH',
        body: data.body,
        headers: {
          Authorization: data.token
        }
      }),
      invalidatesTags: ['Student']
    }),

    removeStudent: builder.mutation({
      query: (data) => ({
        url: `/students/${data.id}`,
        method: 'DELETE',
        headers: {
          Authorization: data.token
        }
      }),
      invalidatesTags: ['Student']
    })
  })
})

export const { useGetStudentsQuery, useCreateStudentMutation, useRemoveStudentMutation, useGetStudentQuery, useUpdateStudentMutation } = studentApi;