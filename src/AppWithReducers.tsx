import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, Paper} from '@material-ui/core';
import {Toolbar} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./state/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    title: string
    filter: FilterValuesType
    id: string
};

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    // Local State
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'Food', filter: "all"},
        {id: todolistId2, title: 'In The Morning', filter: "all"}
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: '1', title: 'Pizza', isDone: false},
            {id: '2', title: 'Cola', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Take Shower', isDone: false},
            {id: '2', title: 'Brush Teeth', isDone: false},
            {id: '3', title: 'Drink Coffee', isDone: false}
        ]
    });

    // Todolist Callbacks
    const addTodolist = (newTodolistTitle: string) => {
        const action = addTodolistAC(newTodolistTitle);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    };

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    };

    const changeTodolistTitle = (todolistId: string, changedTodolistTitle: string) => dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, changedTodolistTitle));

    const changeTodolistFilter = (todolistId: string, newFilter: FilterValuesType) => dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, newFilter));

    // Tasks Callbacks
    const addTask = (title: string, todolistId: string) => dispatchToTasksReducer(addTaskAC(todolistId, title));

    const deleteTask = (taskId: string, todolistId: string) => dispatchToTasksReducer(deleteTaskAC(todolistId, taskId));

    const changeTaskTitle = (todolistId: string, taskId: string, changedTaskTitle: string) => dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, changedTaskTitle));

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone));

    // Map Todolists
    let todolistElements = todolists.map(todolist => {

        let tasksForTodolist = tasks[todolist.id];
        if (todolist.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (todolist.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }

        return (
            <Grid key={todolist.id} item>
                <Paper elevation={5} variant={"elevation"} style={{padding: '20px'}}>
                    <Todolist id={todolist.id} title={todolist.title} tasks={tasksForTodolist}
                              deleteTask={deleteTask} changeTodolistFilter={changeTodolistFilter} addTask={addTask}
                              changeTaskStatus={changeTaskStatus} filter={todolist.filter}
                              deleteTodolist={deleteTodolist}
                              changeTodolistTitle={changeTodolistTitle} changeTaskTitle={changeTaskTitle}/>
                </Paper>
            </Grid>
        )
    })

    // JSX
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid style={{margin: '20px 0'}}
                      container
                    // direction="row"
                    // justify="center"
                    // alignItems="center"
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistElements}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
