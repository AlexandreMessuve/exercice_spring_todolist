import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addTodo, getMyTodo, getTodoList} from "../service/api/api.todo.js";

const initialState = {
    todosList:[],
    status: 'idle',
    error: null,
}


export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async ({ isAdmin, todo, token } , { rejectWithValue }) => {
        if (isAdmin) {
            try {
                const response = await addTodo(todo, token);
                if (response.status === 200) {
                    return response.data;
                } else {
                    return rejectWithValue(response.data);
                }
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getTodos = createAsyncThunk(
    'todo/getTodos',
    async ({isAdmin, token}, { rejectWithValue }) => {
        try {
            let response;
            if (isAdmin) {
                response = await getMyTodo(token);
            } else {
                response = await getTodoList(token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                    state.status = 'loading';
                })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todosList.push(action.payload);
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todosList = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectTodos = (state) => state.todo.todosList;
export const selectError = (state) => state.todo.error;
export const selectStatus = (state) => state.todo.status;

export default todoSlice.reducer;