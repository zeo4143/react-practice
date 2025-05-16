import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // get
        fetchPosts: (state, action: PayloadAction<{queryParams?: any} | undefined>) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add
        addPost: (state, action: PayloadAction<Post>) => {
            state.loading = true;
            state.error = null;
        },
        addPostSuccess: (state, action: PayloadAction<Post>) => {
            state.loading = false;
            state.posts.unshift(action.payload);
        },
        addPostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
        },

        // Update
        updatePost: (state) => {
            state.loading = true;
            state.error = null;
        },
        updatePostSuccess: (state, action: PayloadAction<Post>) => {
            state.loading = false;
            const index = state.posts.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        updatePostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deletePost: (state) => {
            state.loading = true;
            state.error = null;
        },
        deletePostSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            const index = state.posts.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.posts.splice(index, 1);
            }
        },
        deletePostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchPosts,
    fetchPostsSuccess,
    fetchPostsFailure,
    addPost,
    addPostSuccess,
    addPostFailure,
    updatePost,
    updatePostSuccess,
    updatePostFailure,
    deletePost,
    deletePostSuccess,
    deletePostFailure,
} = postSlice.actions;

export default postSlice.reducer;
