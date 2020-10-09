import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    deleteTodolistAC, setTodolistsAC,
    todolistsReducer, TodolistsStateType
} from './todolistsReducer';
import {FilterValuesType} from '../entities';

// Start State
let todolistId1: string;
let todolistId2: string;
let startState: TodolistsStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: 'Evening',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: 'Food',
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ];
})

// Tests
test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change title', () => {
    let newTodolistTitle = 'Changed Todolist Title';

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('Evening');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to state', () => {
    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2)
})