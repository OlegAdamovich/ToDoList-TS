import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasksReducer";
import {addTodolistAC, deleteTodolistAC} from "./todolistsReducer";

// Start State
let startState: TasksStateType;

beforeEach(() => {
    startState = {
        ['todolist1']: [
            {id: '1', title: 'Pizza', isDone: false},
            {id: '2', title: 'Cola', isDone: false}
        ],
        ['todolist2']: [
            {id: '1', title: 'Take Shower', isDone: false},
            {id: '2', title: 'Brush Teeth', isDone: false},
            {id: '3', title: 'Drink Coffee', isDone: false}
        ]
    }
})

// Tests
test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, deleteTaskAC('todolist2', '2'));

    expect(endState['todolist2'].length).toBe(2);
    expect(endState['todolist2'][1].id).toBe('3');
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC('todolist1', 'Sauce'));

    expect(endState['todolist1'].length).toBe(3);
    expect(endState['todolist2'].length).toBe(3);
    expect(endState['todolist1'][0].id).toBeDefined();
    expect(endState['todolist1'][0].title).toBe('Sauce');
})

test('status of correct task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolist1', '1', true));

    expect(endState['todolist1'][0].isDone).toBe(true);
    expect(endState['todolist2'][0].isDone).toBe(false);
})

test('title of correct task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todolist1', '2', 'Sprite'));

    expect(endState['todolist1'][1].title).toBe('Sprite');
    expect(endState['todolist2'][1].title).toBe('Brush Teeth');
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('New Todolist Title'));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolist1' && k !== 'todolist2');
    if (!newKey) {
        throw new Error('New key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('correct array should be deleted when todolist is deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolist2'));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
})