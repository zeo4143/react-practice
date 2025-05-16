import { BASE_API_URL } from '../../conifg';
import axios, { AxiosResponse } from 'axios';
import {
    addTodo,
    addTodoFailure,
    addTodoSuccess, deleteTodo,
    fetchTodos,
    fetchTodosFailure,
    fetchTodosSuccess,
    Todo, updateTodo, updateTodoSuccess,
} from './todoSlice';
import { all, call, put, takeLatest } from 'redux-saga/effects';

const TODOS = `${BASE_API_URL}/todos`;

function* fetchTodosSaga(action?: { type: string; payload?: { queryParams?: any} }) {
    try {
        const response: AxiosResponse<Todo[]> = yield call(() =>
            axios.get(TODOS, { params: action?.payload?.queryParams || {} })
        );
        yield put( fetchTodosSuccess(response.data))
    } catch (error: any) {
        yield put(fetchTodosFailure(error.message));
    }
}

function* addTodoSaga(action: { type: string, payload: Todo  }) {
    try {
        const response: AxiosResponse<Todo> = yield call(() =>
            axios.post(TODOS, action.payload)
        );
        yield put(addTodoSuccess(response.data));
    } catch (error: any) {
        yield put(addTodoFailure(error.message));
    }
}

function* updateTodoSaga(action: { type: string, payload: Todo  }) {
    try {
        const response: AxiosResponse<Todo> = yield call(() =>
            axios.put(`${TODOS}/${action.payload.id}`, action.payload)
        );
        yield put(updateTodoSuccess(response.data));
    } catch (error: any) {
        yield put(addTodoFailure(error.message));
    }
}

function* deleteTodoSaga(action: { type: string, payload: number }) {
    try {
        yield call(() => axios.delete(`${TODOS}/${action.payload}`));
    } catch (error: any) {
        yield put(addTodoFailure(error.message));
    }
}

export default function* todoSaga() {
    yield all([
        takeLatest(fetchTodos.type, fetchTodosSaga),
        takeLatest(addTodo.type, addTodoSaga),
        takeLatest(updateTodo.type, updateTodoSaga),
        takeLatest(deleteTodo.type, deleteTodoSaga),
    ]);
}