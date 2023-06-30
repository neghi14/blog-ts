import blogrApi from "@lib/actions/blogr.actions";

const post = blogrApi.injectEndpoints({
  endpoints: (build) => ({
    blogs: build.query<any, { params: string }>({
      query: (params) => `blogs?sort=${params}`,
    }),
    singleBlog: build.query<any, { slug: string }>({
      query: ({ slug }) => `blogs/${slug}`,
    }),
    comments: build.query<any, { id: string }>({
      query: ({ id }) => `blogs/${id}/comments?sort=-created_at`,
    }),
    likes: build.query<any, { id: string }>({
      query: ({ id }) => `blogs/${id}/likes?sort=-created_at`,
    }),
    addBlog: build.mutation({
      query: (body) => ({
        url: "blogs",
        method: "POST",
        body: body,
      }),
    }),
    addComment: build.mutation<any, { id: string }>({
      query: ({ id, ...body }) => ({
        url: `blogs/${id}/comments`,
        method: "POST",
        body: body,
      }),
    }),
    addLike: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `blogs/${id}/likes`,
        method: "POST",
      }),
    }),
    deleteLike: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `blogs/${id}/likes`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useBlogsQuery,
  useSingleBlogQuery,
  useCommentsQuery,
  useLikesQuery,
  useAddBlogMutation,
  useAddCommentMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
} = post;
