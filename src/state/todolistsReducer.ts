import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type StateType = Array<TodolistType>;

// Action Types
export type deleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    todolistId: string
}

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = deleteTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType;

// Action Creators
export const deleteTodolistAC = (todolistId: string): deleteTodolistActionType => ({type: 'DELETE-TODOLIST' as const, todolistId});
export const addTodolistAC = (title: string): addTodolistActionType => ({type: 'ADD-TODOLIST', title});
export const changeTodolistTitle = (id: string, title: string): changeTodolistTitleActionType => ({type: 'CHANGE-TODOLIST-TITLE', id, title});
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): changeTodolistFilterActionType => ({type: 'CHANGE-TODOLIST-FILTER', id, filter});

// Reducer
export const todolistsReducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'};
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => {
                if (todolist.id === action.id) {
                    return {...todolist, title: action.title}
                } else {
                    return todolist
                }
            });
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => {
                if (todolist.id === action.id) {
                    return {...todolist, filter: action.filter}
                } else {
                    return todolist;
                }
            })
        default:
            throw new Error('Invalid Action Type');
    }
}