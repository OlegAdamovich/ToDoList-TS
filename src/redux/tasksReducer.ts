import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from './todolistsReducer';
import {TaskStatuses, TaskType} from '../entities';
import {Dispatch} from 'redux';
import {tasksAPI, UpdateTaskModelType} from '../dal/tasksAPI';
import {AppRootStateType} from './store';

type ActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)};
        case 'ADD-TASK':
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? action.changedTask : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.newTodolist.id]: []};
        case 'DELETE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        }
        case 'SET_TODOLISTS':
            const stateCopy = {...state};
            action.todolists.forEach(todolist => stateCopy[todolist.id] = [])
            return stateCopy;
        case 'SET_TASKS':
            return {...state, [action.todolistId]: action.tasks};
        default:
            return state;
    }
}

// Action Creators
export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE-TASK',
    todolistId,
    taskId
} as const);
export const addTaskAC = (newTask: TaskType) => ({type: 'ADD-TASK', newTask} as const);
export const changeTaskStatusAC = (todolistId: string, taskId: string, changedTask: TaskType) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    changedTask
} as const);
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
} as const);
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET_TASKS',
    todolistId,
    tasks
} as const);


// Thunks
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        tasksAPI.getTasks(todolistId)
            .then(response => dispatch(setTasksAC(todolistId, response.data.items)))
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(response => dispatch(deleteTaskAC(todolistId, taskId)))
    }
}
export const addTaskTC = (todolistId: string, newTaskTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        return tasksAPI.createTask(todolistId, newTaskTitle)
            .then(response => dispatch(addTaskAC(response.data.data.item)))
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const taskToUpdate = getState().tasks[todolistId].find(task => task.id === taskId);

        if (taskToUpdate) {
            const updateTaskModel: UpdateTaskModelType = {
                deadline: taskToUpdate.deadline,
                description: taskToUpdate.description,
                priority: taskToUpdate.priority,
                startDate: taskToUpdate.startDate,
                title: taskToUpdate.title,
                status: newStatus
            };

            tasksAPI.updateTask(todolistId, taskId, updateTaskModel)
                .then(response => {
                    debugger
                    dispatch(changeTaskStatusAC(todolistId, taskId, response.data.data.item))
                })
        }
    }
}