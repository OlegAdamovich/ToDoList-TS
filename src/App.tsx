import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

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


    let todolistElements = todolists.map(todolist => {

        let tasksForTodolist = tasks[todolist.id];
        if (todolist.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (todolist.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }

        return (
            <Todolist key={todolist.id} id={todolist.id} title={todolist.title} tasks={tasksForTodolist}
                      removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
                      changeTaskStatus={changeStatus} filter={todolist.filter} deleteTodolist={deleteTodolist} changeTodolistTitle={changeTodolistTitle} changeTaskTitle={changeTaskTitle}/>
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistElements}
        </div>
    );
}

export default App;
