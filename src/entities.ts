export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TodolistWithFilterType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type FilterValuesType = 'all' | 'active' | 'completed';


export enum RequestStatusCodes {
    success = 0,
    error = 1
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type PropertyUpdateTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}