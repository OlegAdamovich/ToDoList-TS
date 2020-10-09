import axios from 'axios'
import {TaskType} from '../entities';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f63abaf8-4670-4b59-a04c-55e892f4be6a'
    }
})


type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
type CommonTasksResponseType<T> = {
    resultCode: number
    messages: Array<string>,
    data: T
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonTasksResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, updateTaskModel: UpdateTaskModelType) {
        return instance.put<CommonTasksResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...updateTaskModel})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTasksResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}