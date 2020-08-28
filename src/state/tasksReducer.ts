import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodolistActionType, deleteTodolistActionType} from "./todolistsReducer";

// Action Types
type deleteTaskActionType = {
    type: 'DELETE-TASK',
    todolistId: string
    taskId: string
}

type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionsType =
    deleteTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | deleteTodolistActionType;

// Action Creators
export const deleteTaskAC = (todolistId: string, taskId: string): deleteTaskActionType => ({
    type: 'DELETE-TASK',
    todolistId,
    taskId
})

export const addTaskAC = (todolistId: string, title: string): addTaskActionType => ({
    type: 'ADD-TASK',
    title,
    todolistId
})

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskId,
    isDone
})

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    taskId,
    title
})

const initialState = {
    // [todolistId1]: [
    //     {id: '1', title: 'Pizza', isDone: false},
    //     {id: '2', title: 'Cola', isDone: false}
    // ],
    // [todolistId2]: [
    //     {id: '1', title: 'Take Shower', isDone: false},
    //     {id: '2', title: 'Brush Teeth', isDone: false},
    //     {id: '3', title: 'Drink Coffee', isDone: false}
    // ]
}

// Reducer
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{title: action.title, id: v1(), isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, isDone: action.isDone}
                    } else {
                        return t
                    }
                })
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, title: action.title}
                    } else {
                        return t
                    }
                })
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "DELETE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        }
        default:
            return state;
    }
}