import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  singlePost: {},
};

export const blogSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<any>) {
      state.post = action.payload.post;
    },
    setSingleBlogs(state, action: PayloadAction<any>) {
      state.singlePost = action.payload.singlePost;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
