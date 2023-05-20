import { createSlice } from '@reduxjs/toolkit'

export const articleSlice = createSlice({
  name: 'artile',
  initialState: {
    isLoading: false,
    articles: [],
    articleDetail: null,
    error: null,

  },
  reducers: {
    getArticleStart: state => {
      state.isLoading = true;
    },
    getArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
    },
    getArticleFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    getArticleDetailStart: state => {
      state.isLoading = true;
    },
    getArticleDetailSuccess: (state, action) => {
      state.articleDetail = action.payload;
      state.isLoading = false;
    },
    getArticleDetailFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    postArticleStart: state => {
      state.isLoading = true;
    },
    postArticleSuccess: state => {
      state.isLoading = false;
    },
    postArticleFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    reset: state => {
      state.error = [];
    },
  }
});


export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleDetailFailure,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
  reset
} = articleSlice.actions;

export default articleSlice.reducer;