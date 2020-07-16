import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistReducer";

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskType = {
    type: 'ADD-TASK'
    todolistId: string,
    taskText: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    newTitle: string
}

type ActionsType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolistActionType | RemoveTodolistActionType

// Reducer
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.taskText, isDone: false};
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

// Action Creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
})

export const addTaskAC = (todolistId: string, taskText: string): AddTaskType  => ({
    type: 'ADD-TASK',
    todolistId,
    taskText
})

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    todolistId,
    isDone
})

export const changeTaskTitleAC = (newTitle: string, todolistId: string, taskId: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    todolistId,
    newTitle
})