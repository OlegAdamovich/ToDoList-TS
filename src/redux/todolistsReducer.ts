import {FilterValuesType, TodolistType, TodolistWithFilterType} from '../entities';
import {Dispatch} from 'redux';
import {todolistAPI} from '../dal/todolistAPI';

type ActionsType =
    ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type TodolistsStateType = Array<TodolistWithFilterType>;
const initialState: TodolistsStateType = [];

export const todolistsReducer = (state: TodolistsStateType = initialState, action: ActionsType): TodolistsStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.newTodolist, filter: 'all'}, ...state];
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, title: action.newTodolistTitle} : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, filter: action.newFilter} : todolist);
        case 'SET_TODOLISTS':
            return action.todolists.map(todolist => ({...todolist, filter: 'all'}));
        default:
            return state;
    }
}

// Action Creators
export const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE-TODOLIST', todolistId} as const);
export const addTodolistAC = (newTodolist: TodolistType) => ({type: 'ADD-TODOLIST', newTodolist} as const);
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTodolistTitle
} as const);
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    newFilter
} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const);

// Thunks
export const setTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => todolistAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => dispatch(deleteTodolistAC(todolistId)))
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.createTodolist(todolistTitle)
            .then(response => {
                dispatch(addTodolistAC(response.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.updateTodolist(todolistId, newTodolistTitle)
            .then(response => {
                dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
            })
    }
}