import React, {useCallback, useEffect} from 'react';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {AddItemForm} from '../components/AddItemForm';
import {EditableSpan} from '../components/EditableSpan';
import {FilterValuesType, RequestStatusType, TaskStatuses, TaskType} from '../entities';
import {addTaskTC, deleteTaskTC, setTasksTC} from '../redux/tasksReducer';
import {useDispatch} from 'react-redux';
import {changeTodolistTitleTC, deleteTodolistTC} from '../redux/todolistsReducer';


type PropsType = {
    title: string
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    filter: FilterValuesType
    id: string
    changeTaskTitle: (todolistId: string, taskId: string, changedTaskTitle: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])


    // Callbacks With Thunk
    const addTaskCallback = useCallback((newTaskTitle: string) => {
        dispatch(addTaskTC(props.id, newTaskTitle));
    }, []);

    const deleteTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(props.id))
    }, []);

    const changeTodolistTitle = useCallback((changedTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(props.id, changedTodolistTitle))
    }, []);



    const onAllClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "all");
    }, []);
    const onActiveClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "active");
    }, []);
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "completed");
    }, []);


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    } else if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }


    const deleteTask = useCallback((taskId: string) => {
        dispatch(deleteTaskTC(props.id, taskId))
    }, []);
    const changeTaskStatus = (newStatus: TaskStatuses, taskId: string) => {
        props.changeTaskStatus(props.id, taskId, newStatus);
    };
    const changeTaskTitle = (newTitle: string, taskId: string) => {
        props.changeTaskTitle(props.id, taskId, newTitle)
    };


    let tasksElements = tasksForTodolist.map(t => {
        return <Task key={t.id} task={t} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
    })


    return <div>
        <div className='todolist-header'>
            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
            <IconButton onClick={deleteTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
        <hr/>
        <div className='buttons-group'>
            <ButtonGroup color="primary" size="small">
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'contained' : "outlined"}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'contained' : "outlined"}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'contained' : "outlined"}>Completed</Button>
            </ButtonGroup>
        </div>
        <AddItemForm addItem={addTaskCallback} disabled={props.entityStatus === 'loading'}/>

        <div>{tasksElements}</div>
    </div>
});
