import api from './api';
import {URL_GET_TODO_LIST,URL_GET_TODO_ADMIN, URL_CREATE_TODO, URL_UPDATE_TODO, URL_DELETE_TODO} from "../../constant/urlBack.js";

const header = (token) => {
    return {
            Authorization: `Bearer ${token}`
    }
}

export function getTodoList(token) {
    const headers = header(token);
    return api.get(URL_GET_TODO_LIST, {
        headers
    })
}

export function getMyTodo(token) {
    const headers = header(token);
    return api.get(URL_GET_TODO_ADMIN, {
        headers
    })
}

export function addTodo(values, token) {
    const headers = header(token);
    return api.post(URL_CREATE_TODO, values, {
        headers
    })
}

export function updateTodo(todoId, values, token) {
    const headers = header(token);
    return api.put(URL_UPDATE_TODO, values, {
        params:{
            id: todoId
        },
        headers
    })
}

export function deleteTodo(todoId, token) {
    const headers = header(token);
    return api.delete(URL_DELETE_TODO, {
        params:{
            id: todoId
        },
        headers
    })
}