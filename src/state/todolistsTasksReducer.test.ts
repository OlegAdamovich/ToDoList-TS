import {TasksStateType, TaskType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

test('id should be equals', () => {
    const startTodolistsState: Array<TodolistType> = [];
    const startTasksState: TasksStateType = {};

    const action = addTodolistAC('New Todolist Title');

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTodolists).toBe(action.todolistId);
    expect(idFromTasks).toBe(action.todolistId);
})