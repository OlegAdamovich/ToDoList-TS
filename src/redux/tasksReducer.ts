import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from './todolistsReducer';
import {PropertyUpdateTaskType, RequestStatusCodes, TaskType} from '../entities';
import {Dispatch} from 'redux';
import {tasksAPI, UpdateTaskModelType} from '../dal/tasksAPI';
import {AppRootStateType} from './store';
import {setErrorAC, setStatusAC} from './appReducer';

type ActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>

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
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? action.updatedTask : task)
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
export const updateTaskAC = (todolistId: string, taskId: string, updatedTask: TaskType) => ({
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    updatedTask
} as const);
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET_TASKS',
    todolistId,
    tasks
} as const);


// Thunk Creators
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(todolistId, response.data.items))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('failed'))
            })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        tasksAPI.deleteTask(todolistId, taskId)
            .then(response => {
                if (response.data.resultCode === RequestStatusCodes.success) {
                    dispatch(deleteTaskAC(todolistId, taskId))
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
export const addTaskTC = (todolistId: string, newTaskTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        tasksAPI.createTask(todolistId, newTaskTitle)
            .then(response => {
                if (response.data.resultCode === RequestStatusCodes.success) {
                    dispatch(addTaskAC(response.data.data.item))
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
export const updateTaskTC = (todolistId: string, taskId: string, propertyUpdateTask: PropertyUpdateTaskType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const taskToUpdate = getState().tasks[todolistId].find(task => task.id === taskId);

        if (taskToUpdate) {
            const updateTaskModel: UpdateTaskModelType = {
                deadline: taskToUpdate.deadline,
                description: taskToUpdate.description,
                priority: taskToUpdate.priority,
                startDate: taskToUpdate.startDate,
                title: taskToUpdate.title,
                status: taskToUpdate.status,
                ...propertyUpdateTask
            };

            dispatch(setStatusAC('loading'))
            tasksAPI.updateTask(todolistId, taskId, updateTaskModel)
                .then(response => {
                    if (response.data.resultCode === RequestStatusCodes.success) {
                        dispatch(updateTaskAC(todolistId, taskId, response.data.data.item))
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
}
