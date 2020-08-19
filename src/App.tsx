import React, {useState} from 'react';
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

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    // Local State
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Names', filter: "all"},
        {id: todolistId2, title: 'Cars', filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Victoria', isDone: false},
            {id: v1(), title: 'Lena', isDone: false},
            {id: v1(), title: 'Anastasia', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Audi', isDone: false},
            {id: v1(), title: 'Lexus', isDone: false},
        ]
    })
    // Tasks Callbacks
    function changeTaskTitle(todolistId: string, taskId: string, changedTaskTitle: string) {
        let todolistTasks = tasks[todolistId];
        let newTasks = todolistTasks.map(task => {
            if (task.id === taskId) {
                return {...task, title: changedTaskTitle};
            } else {
                return task;
            }
        })
        setTasks({...tasks, [todolistId]: newTasks});
    }

    function removeTask(id: string, todolistId: string) {
        // Находим нужный массив тасок по айди тудулиста
        let todolistTasks = tasks[todolistId];
        // Так как мы удаляем таску, то просто фильтруем массив по айди таски
        let newTasks = todolistTasks.filter(task => task.id !== id);
        setTasks({...tasks, [todolistId]: newTasks})
    }

    function addTask(title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let newTasks = [{id: v1(), title, isDone: false}, ...todolistTasks];
        setTasks({...tasks, [todolistId]: newTasks});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        let todolistTasks = tasks[todolistId];
        let newTasks = todolistTasks.map(task => {
            if (task.id === taskId) {
                return {...task, isDone}
            } else {
                return task
            }
        })
        setTasks({...tasks, [todolistId]: newTasks});
    }

    // Todolist Callbacks
    function changeTodolistTitle(todolistId: string, changedTodolistTitle: string) {
        let newTodolists = todolists.map(todolist => {
            if (todolist.id === todolistId) {
                return {...todolist, title: changedTodolistTitle};
            } else {
                return todolist;
            }
        })
        setTodolists(newTodolists);
    }

    function deleteTodolist(todolistId: string) {
        let newTodolists = todolists.filter(todolist => todolist.id !== todolistId);
        setTodolists(newTodolists);
        delete tasks[todolistId];
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let newTodolists = todolists.map(todolist => {
            if (todolist.id === todolistId) {
                return {...todolist, filter: value}
            } else {
                return todolist
            }
        })
        setTodolists(newTodolists);
    }

    function addTodolist(newTodolistTitle: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: newTodolistTitle, filter: "all"};
        let newTodolists = [newTodolist, ...todolists];
        setTodolists(newTodolists);
        setTasks({...tasks, [newTodolistId]: []})
    }

    // Todolists
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
                              removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
                              changeTaskStatus={changeStatus} filter={todolist.filter} deleteTodolist={deleteTodolist}
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

export default App;
