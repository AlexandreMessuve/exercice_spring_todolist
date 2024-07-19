import api from './api';
import {URL_GET_TODO_LIST,URL_GET_TODO_ADMIN, URL_CREATE_TODO, URL_UPDATE_TODO, URL_DELETE_TODO} from "../../constant/urlBack.js";

const bearerToken = (token) => {
    return `Bearer ${token}`
}

export function getTodoList(token) {
    const bearer = bearerToken(token);
    return api.get(URL_GET_TODO_LIST, {
        headers: {
            Authorization: bearer
        }
    })
}

export function getMyTodo(token) {
    const bearer = bearerToken(token);
    return api.get(URL_GET_TODO_ADMIN, {
        headers: {
            Authorization: bearer
        }
    })
}

export function addTodo(values, token) {
    const bearer = bearerToken(token);
    return api.post(URL_CREATE_TODO, values, {
        headers: {
            Authorization: bearer
        }
    })
}
export function updateTodo(todoId, values, token) {
    const bearer = bearerToken(token);
    return api.put(URL_UPDATE_TODO, values, {
        params:{
            id: todoId
        },
        headers: {
            Authorization: bearer
        }
    })
}

export function deleteTodo(todoId, token) {
    const bearer = bearerToken(token);
    return api.delete(URL_DELETE_TODO, {
        params:{
            id: todoId
        },
        headers: {
            Authorization: bearer
        }
    })
}