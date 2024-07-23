import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addTodo, deleteTodo, getMyTodo, getTodoList, updateTodo} from "../service/api/api.todo.js";

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
                    return {isAdmin, token};
                } else {
                    return rejectWithValue(response.data);
                }
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const todoUpdate = createAsyncThunk(
    'todo/todoUpdate',
    async ({isAdmin,todoId,todoUp, token}, { rejectWithValue }) => {
        if (isAdmin) {
            try {
                const response = await updateTodo(todoId, todoUp, token);
                if (response.status === 200) {
                    return {isAdmin, token};
                } else {
                    return rejectWithValue(response.data);
                }
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const todoDelete = createAsyncThunk(
    'todo/todoDelete',
    async ({isAdmin,todoId, token}, { rejectWithValue }) => {
        if (isAdmin) {
            try {
                const response = await deleteTodo(todoId, token);
                if (response.status === 200) {
                    return {todoId};
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
                    state.error = null;
                })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(todoUpdate.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(todoUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(todoUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })
            .addCase(todoDelete.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(todoDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todosList = state.todosList.filter((todo) => todo.id != action.payload.todoId)
                state.error = null;
            })
            .addCase(todoDelete.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todosList = action.payload;
                state.error = null;
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
export const selectIsError = (state) => state.todo.error != null;
export const selectTodoById = (state, todoId) => state.todo.todosList.find((todo)=> todo.id == todoId)
export default todoSlice.reducer;