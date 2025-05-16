import { BASE_API_URL } from '../../conifg';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    addUser,
    addUserFailure,
    addUserSuccess,
    deleteUser,
    deleteUserFailure,
    deleteUserSuccess,
    fetchUserById,
    fetchUserByIdSuccess,
    fetchUsers,
    fetchUsersFailure,
    fetchUsersSuccess,
    updateUser,
    updateUserFailure,
    updateUserSuccess,
    User,
} from './userSlice';
import axios, { AxiosResponse } from 'axios';

const USERS = `${BASE_API_URL}/users`;

function* fetchUsersSaga() {
    try {
        const response: AxiosResponse<User[]> = yield call(() => axios.get(USERS));
        yield put(fetchUsersSuccess(response.data));
    } catch (error: any) {
        yield put(fetchUsersFailure(error.message));
    }
}

function* fetchUserByIdSaga(action: { type: string; payload: { id: string } }) {
    try {
        const response: AxiosResponse<User> = yield call(() => axios.get(`${USERS}/${action.payload.id}`));
        yield put(fetchUserByIdSuccess(response.data));
    } catch (error: any) {
        yield put(fetchUsersFailure(error.message));
    }
}

function* addUserSaga(action: { type: string; payload: User }) {
    try {
        const response: AxiosResponse<User> = yield call(() => axios.post(USERS, action.payload));
        yield put(addUserSuccess(response.data));
    } catch (error: any) {
        yield put(addUserFailure(error.message));
    }
}

function* updateUserSaga(action: { type: string; payload: User }) {
    try {
        const response: AxiosResponse<User> = yield call(() => axios.put(USERS, action.payload));
        yield put(updateUserSuccess(response.data));
    } catch (error: any) {
        yield put(updateUserFailure(error.message));
    }
}

function* deleteUserSaga(action: { type: string; payload: number }) {
    try {
        yield call(() => axios.delete(`${USERS}/${action.payload}`));
        yield put(deleteUserSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteUserFailure(error.message));
    }
}


export default function* userSaga() {
    yield all([
        takeLatest(fetchUsers.type, fetchUsersSaga),
        takeLatest(fetchUserById.type, fetchUserByIdSaga),
        takeLatest(addUser.type, addUserSaga),
        takeLatest(updateUser.type, updateUserSaga),
        takeLatest(deleteUser.type, deleteUserSaga),
    ]);
}