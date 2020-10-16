import {
    FilterValuesType,
    RequestStatusCodes,
    RequestStatusType,
    TodolistType,
    TodolistWithFilterType
} from '../entities';
import {Dispatch} from 'redux';
import {todolistAPI} from '../dal/todolistAPI';
import {setErrorAC, setStatusAC} from './appReducer';



type ActionsType =
    ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistsStateType = Array<TodolistWithFilterType>;
const initialState: TodolistsStateType = [];

export const todolistsReducer = (state: TodolistsStateType = initialState, action: ActionsType): TodolistsStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.newTodolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.newTodolistTitle
            } : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.newFilter
            } : todolist);
        case 'SET_TODOLISTS':
            return action.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}));
        case 'CHANGE_ENTITY_STATUS':
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, entityStatus: action.entityStatus} : todolist)
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
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({type: 'CHANGE_ENTITY_STATUS', entityStatus, todolistId} as const)

// Thunks
export const setTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(response => {
                if (response.data.resultCode === RequestStatusCodes.success) {
                    dispatch(deleteTodolistAC(todolistId))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    if (response.data.messages.length) {
                        dispatch(setErrorAC(response.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusAC('failed'))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.createTodolist(todolistTitle)
            .then(response => {
                if (response.data.resultCode === RequestStatusCodes.success) {
                    dispatch(addTodolistAC(response.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    if (response.data.messages.length) {
                        dispatch(setErrorAC(response.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusAC('failed'))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, newTodolistTitle)
            .then(response => {
                debugger
                if (response.data.resultCode === RequestStatusCodes.success) {
                    dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    if (response.data.messages.length) {
                        dispatch(setErrorAC(response.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusAC('failed'))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}