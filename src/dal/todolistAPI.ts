import axios from 'axios';
import {TodolistType} from '../entities';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f63abaf8-4670-4b59-a04c-55e892f4be6a'
    }
})


type CommonTodolistResponseType<T> = {
    resultCode: number
    messages: Array<string>,
    data: T
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonTodolistResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonTodolistResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonTodolistResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}