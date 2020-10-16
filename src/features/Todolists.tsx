import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {FilterValuesType, TaskStatuses} from '../entities';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {addTodolistTC, changeTodolistFilterAC, setTodolistsTC, TodolistsStateType} from '../redux/todolistsReducer';
import {TasksStateType, updateTaskTC} from '../redux/tasksReducer';
import {Todolist} from './Todolist';
import {AddItemForm} from '../components/AddItemForm';

export const Todolists = () => {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistsStateType>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistTC(newTodolistTitle));
    }, []);

    const changeTodolistFilter = useCallback((todolistId: string, newFilter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFilter))
    }, []);

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, changedTaskTitle: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: changedTaskTitle}))
    }, []);
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status: newStatus}))
    }, []);

    let todolistElements = todolists.map(todolist => {
        let tasksForTodolist = tasks[todolist.id];
        return (
            <Grid item key={todolist.id}>
                <Paper elevation={5} variant={'elevation'} style={{padding: '20px'}}>
                    <Todolist todolist={todolist}
                              tasks={tasksForTodolist}
                              changeTodolistFilter={changeTodolistFilter}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            <Grid style={{margin: '20px 0'}} container>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolistElements}
            </Grid>
        </>
    )
}