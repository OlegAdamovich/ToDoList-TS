import {FilterValuesType, TodolistType} from "../AppWithReducers";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

// Start State
let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {title: 'Food', id: todolistId1, filter: "all"},
        {title: 'Home', id: todolistId2, filter: "all"}
    ];
})

// Tests
test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change title', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("Food");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
