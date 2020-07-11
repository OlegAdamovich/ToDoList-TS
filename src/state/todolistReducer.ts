import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistTitle: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistTitle: string
    todolistId: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistId: string
}

// Reducer
export const todolistReducer = (state: Array<TodolistType>, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {
                id: v1(),
                title: action.todolistTitle,
                filter: 'all'
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => {
                if (t.id === action.todolistId) {
                    return {
                        ...t,
                        title: action.todolistTitle
                    }
                } else {
                    return t
                }
            })
        case "CHANGE-TODOLIST-FILTER":
            const todolist = state.find(t => t.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('Unknown Action Type')
    }
}

// Action Creators
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    todolistId
})

export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    todolistTitle
})

export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    todolistTitle
})

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    todolistId
})