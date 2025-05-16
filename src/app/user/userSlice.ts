import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // get
        fetchUsers: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //get by Id
        fetchUserById: (state, action: PayloadAction<{ id: string }>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserByIdSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.users = [action.payload];
        },
        fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add
        addUser: (state) => {
            state.loading = true;
            state.error = null;
        },
        addUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.users.unshift(action.payload);
        },
        addUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //update
        updateUser: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            const index = state.users.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        updateUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete
        deleteUser: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            const index = state.users.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.users.splice(index, 1);
            }
        },
        deleteUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUserById,
    fetchUserByIdSuccess,
    fetchUserByIdFailure,
    addUser,
    addUserSuccess,
    addUserFailure,
    updateUser,
    updateUserSuccess,
    updateUserFailure,
    deleteUser,
    deleteUserSuccess,
    deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;