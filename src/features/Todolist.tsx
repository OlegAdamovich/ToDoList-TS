import React, {useCallback, useEffect} from 'react';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {AddItemForm} from '../components/AddItemForm';
import {EditableSpan} from '../components/EditableSpan';
import {FilterValuesType, TaskStatuses, TaskType, TodolistWithFilterType} from '../entities';
import {addTaskTC, deleteTaskTC, setTasksTC} from '../redux/tasksReducer';
import {useDispatch} from 'react-redux';
import {changeTodolistTitleTC, deleteTodolistTC} from '../redux/todolistsReducer';

type PropsType = {
    todolist: TodolistWithFilterType
    tasks: Array<TaskType>
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, changedTaskTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasksTC(props.todolist.id))
    }, [])

    // Todolist Callbacks
    const deleteTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(props.todolist.id))
    }, []);

    const changeTodolistTitle = useCallback((changedTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(props.todolist.id, changedTodolistTitle))
    }, []);

    // Task Callbacks
    const addTask = useCallback((newTaskTitle: string) => {
        dispatch(addTaskTC(props.todolist.id, newTaskTitle));
    }, []);

    const deleteTask = useCallback((taskId: string) => {
        dispatch(deleteTaskTC(props.todolist.id, taskId))
    }, []);

    const changeTaskStatus = (newStatus: TaskStatuses, taskId: string) => {
        props.changeTaskStatus(props.todolist.id, taskId, newStatus);
    };

    const changeTaskTitle = (newTitle: string, taskId: string) => {
        props.changeTaskTitle(props.todolist.id, taskId, newTitle)
    };

    // Change Todolist Filter
    const onAllClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'all');
    }, []);
    const onActiveClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'active');
    }, []);
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'completed');
    }, []);

    // Filtering Tasks
    let filteredTasks;
    switch (props.todolist.filter) {
        case 'all':
            filteredTasks = props.tasks;
            break;
        case 'active':
            filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.New);
            break;
        case 'completed':
            filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.Completed);
            break;
        default:
            filteredTasks = props.tasks;
    }

    // Creating Tasks
    let tasksElements = filteredTasks.map(t => {
        return <Task todolistStatus={props.todolist.entityStatus} key={t.id} task={t} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}
                     changeTaskTitle={changeTaskTitle}/>
    })

    // Component
    return <div>
        <div className='todolist-header'>
            <EditableSpan title={props.todolist.title} setNewTitle={changeTodolistTitle}/>
            <IconButton onClick={deleteTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
        <hr/>
        <div className='buttons-group'>
            <ButtonGroup color="primary" size="small">
                <Button onClick={onAllClickHandler}
                        variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            </ButtonGroup>
        </div>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

        <div>{tasksElements}</div>
    </div>
});
