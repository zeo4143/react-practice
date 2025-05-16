import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState  {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        //get
        fetchTodos: (state, action: PayloadAction<{queryParams?: any} | undefined>) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
            state.loading = false;
            state.todos = action.payload;
        },
        fetchTodosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //add
        addTodo: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTodoSuccess: (state, action: PayloadAction<Todo>) => {
            state.loading = false;
            state.todos.unshift(action.payload);
        },
        addTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //update
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.loading = true;
            state.error = null;
        },
        updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
            state.loading = false;
            const index = state.todos.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
        updateTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
        },

        //delete
        deleteTodo: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTodoSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            const index = state.todos.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.todos.splice(index, 1);
            }
        },
        deleteTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

export const {
    fetchTodos,
    fetchTodosSuccess,
    fetchTodosFailure,
    addTodo,
    addTodoSuccess,
    addTodoFailure,
    updateTodo,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;