import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from '@material-ui/core';
import {FilterValuesType, TaskStatuses, TodolistType, TodolistWithFilterType} from '../entities';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {addTodolistTC, changeTodolistFilterAC, setTodolistsTC, TodolistsStateType} from '../redux/todolistsReducer';
import {changeTaskStatusTC, changeTaskTitleAC, TasksStateType} from '../redux/tasksReducer';
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
        dispatch(changeTaskTitleAC(todolistId, taskId, changedTaskTitle))
    }, []);
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todolistId, taskId, newStatus))
    }, []);

    let todolistElements = todolists.map(todolist => {
        let tasksForTodolist = tasks[todolist.id];
        return (
            <Grid item key={todolist.id}>
                <Paper elevation={5} variant={'elevation'} style={{padding: '20px'}}>
                    <Todolist id={todolist.id} title={todolist.title} tasks={tasksForTodolist}
                              changeTodolistFilter={changeTodolistFilter}
                              changeTaskStatus={changeTaskStatus} filter={todolist.filter}
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