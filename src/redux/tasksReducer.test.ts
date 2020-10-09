import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType
} from './tasksReducer';
import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from './todolistsReducer';
import {TaskStatuses} from '../entities';

// Start State
let startState: TasksStateType;

beforeEach(() => {
    startState = {
        ['todolist1']: [
            {
                description: '',
                title: 'Read Book',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolist1',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Watch Film',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolist1',
                order: 0,
                addedDate: ''
            }

        ],
        ['todolist2']: [
            {
                description: '',
                title: 'Cola',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolist2',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Pizza',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolist2',
                order: 0,
                addedDate: ''
            }
        ]
    }
})

// Tests
test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, deleteTaskAC('todolist2', '2'));

    expect(endState['todolist2'].length).toBe(1);
    expect(endState['todolist2'][0].id).toBe('1');
})

test('correct task should be added to correct array', () => {
    const newTask = {
        description: '',
        title: 'Go For A Walk',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: '3',
        todoListId: 'todolist1',
        order: 0,
        addedDate: ''
    }

    const endState = tasksReducer(startState, addTaskAC(newTask));

    expect(endState[newTask.todoListId].length).toBe(3);
    expect(endState['todolist2'].length).toBe(2);
    expect(endState[newTask.todoListId][0].id).toBe('3');
    expect(endState[newTask.todoListId][0].title).toBe('Go For A Walk');
})

test('status of correct task should be changed', () => {
    const changedTask = {
        description: '',
        title: 'Read Book',
        status: 2,
        priority: 0,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: 'todolist1',
        order: 0,
        addedDate: ''
    }

    const endState = tasksReducer(startState, changeTaskStatusAC('todolist1', '1', changedTask));

    expect(endState['todolist1'][0].status).toBe(TaskStatuses.Completed);
    expect(endState['todolist2'][0].status).toBe(TaskStatuses.New);
})

test('title of correct task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todolist1', '2', 'Good Night'));

    expect(endState['todolist1'][1].title).toBe('Good Night');
    expect(endState['todolist2'][1].title).toBe('Pizza');
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

test('empty arrays should be added when todolists set to state', () => {
    const action = setTodolistsAC([
        {
            id: 'todolistId1',
            title: 'Evening',
            addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2',
            title: 'Food',
            addedDate: '',
            order: 0
        }
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId1']).toStrictEqual([])
    expect(endState['todolistId2']).toStrictEqual([])
})

test('tasks should be set to state', () => {
    const tasks = [
        {
            description: '',
            title: 'Read Book',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: 'todolist1',
            order: 0,
            addedDate: ''
        },
        {
            description: '',
            title: 'Watch Film',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            id: '2',
            todoListId: 'todolist1',
            order: 0,
            addedDate: ''
        },
        {
            description: '',
            title: 'Cook Dinner',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            id: '3',
            todoListId: 'todolist1',
            order: 0,
            addedDate: ''
        }

    ]

    const action = setTasksAC('todolistId2', tasks)

    const state = {
        'todolistId1': [],
        'todolistId2': []
    }

    const endState = tasksReducer(state, action)

    expect(endState['todolistId2'].length).toBe(3)
})