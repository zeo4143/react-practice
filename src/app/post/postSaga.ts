import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
    addPost,
    addPostFailure,
    addPostSuccess,
    deletePost, deletePostFailure,
    deletePostSuccess,
    fetchPosts,
    fetchPostsFailure,
    fetchPostsSuccess,
    Post,
    updatePost, updatePostFailure,
    updatePostSuccess,
} from './postSlice';
import { BASE_API_URL } from '../../conifg';

const POSTS = `${BASE_API_URL}/posts`;

function* fetchPostsSaga(action: { type: string; payload: { queryParams?: any} }) {
    try {
        const response: AxiosResponse<Post[]> = yield call(() =>
            axios.get(POSTS, { params: action.payload.queryParams || {}}),
        );
        yield put(fetchPostsSuccess(response.data));
    } catch (error: any) {
        yield put(fetchPostsFailure(error.message));
    }
}

function* addPostSaga(action: { type: string; payload: Post }) {
    try {
        const response: AxiosResponse<Post> = yield call(() =>
            axios.post(POSTS, action.payload),
        );
        yield put(addPostSuccess(response.data));
    } catch (error: any) {
        yield put(addPostFailure(error.message));
    }
}

function* updatePostSaga(action: { type: string; payload: Post }) {
    try {
        const response: AxiosResponse<Post> = yield call(() =>
            axios.put(`${POSTS}/${action.payload.id}`, action.payload),
        );
        yield put(updatePostSuccess(response.data));
    } catch (error: any) {
        yield put(updatePostFailure(error.message));
    }
}

function* deletePostSaga(action: { type: string; payload: number }) {
    try {
        yield call(() => axios.delete(`${POSTS}/${action.payload}`));
        yield put(deletePostSuccess(action.payload));
    } catch (error: any) {
        yield put(deletePostFailure(error.message));
    }
}

export default function* postSaga() {
    yield all([
        takeLatest(fetchPosts.type, fetchPostsSaga),
        takeLatest(addPost.type, addPostSaga),
        takeLatest(updatePost.type, updatePostSaga),
        takeLatest(deletePost.type, deletePostSaga),
    ]);
}
