import { all } from 'redux-saga/effects';
import postSaga from './post/postSaga';
import userSaga from './user/userSaga';
import todoSaga from './todo/todoSaga';

export default function* rootSaga() {
    yield all([
        postSaga(),
        userSaga(),
        todoSaga(),
    ]);
}