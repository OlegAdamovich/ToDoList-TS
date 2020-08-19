import {FilterValuesType, TodolistType} from "../AppWithReducers";
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
    todolistId: string
}

export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    changedTodolistTitle: string
}

export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    newFilter: FilterValuesType
}

type ActionsType =
    deleteTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType;

// Action Creators
export const deleteTodolistAC = (todolistId: string): deleteTodolistActionType => ({
    type: 'DELETE-TODOLIST' as const,
    todolistId
});
export const addTodolistAC = (title: string): addTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
});
export const changeTodolistTitleAC = (todolistId: string, changedTodolistTitle: string): changeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    changedTodolistTitle
});
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): changeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    newFilter
});

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: StateType = [
    {id: todolistId1, title: 'Food', filter: "all"},
    {id: todolistId2, title: 'In The Morning', filter: "all"}
];

// Reducer
export const todolistsReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [newTodolist, ...state];
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => {
                if (todolist.id === action.todolistId) {
                    return {...todolist, title: action.changedTodolistTitle}
                } else {
                    return todolist
                }
            });
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => {
                if (todolist.id === action.todolistId) {
                    return {...todolist, filter: action.newFilter}
                } else {
                    return todolist;
                }
            })
        default:
            return state;
    }
}