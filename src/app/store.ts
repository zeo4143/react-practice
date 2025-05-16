import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postReducer from './post/postSlice';
import userReducer from './user/userSlice';
import todoReducer from './todo/todoSlice'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer,
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
