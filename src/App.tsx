import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

// Types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    // Local State
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'Todolist 01',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'Todolist 02',
            filter: 'all'
        }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Drink Coffee', isDone: true},
            {id: v1(), title: 'Freeze Water', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Learn Objects', isDone: true},
            {id: v1(), title: 'Watch Way Of Samurai', isDone: true}
        ]
    })

    // Callbacks
    const removeTask = (taskId: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId] // нашли таски тудулиста по айди, это массив
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId) // отфильтровали массив, там сидят таски без удаленной
        setTasks({...tasks}) // отдаем в стейт новый объект тасок
    }

    const addTask = (todolistId: string, taskText: string) => {
        let newTask = {id: v1(), title: taskText, isDone: false}
        let todolistTasks = tasks[todolistId] // Достаем нужный массив тасок по айди тудулиста
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (newFilter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId) // находим в массиве тудулистов нужный по айди
        if (todolist) { // если он не равен undefined
            todolist.filter = newFilter // меняем значение фильтра на новое
            setTodolists([...todolists]) // отдаем в стейт новый массив тудулистов используя spread
        }
        // let newTodolists = todolists.map(tl => {
        //     if (tl.id === todolistId) {
        //         return {
        //             ...tl,
        //             filter: value
        //         }
        //     } else {
        //         return tl
        //     }
        // })
    }

    const removeTodolist = (todolistId: string) => {
        let newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }

                return (
                    <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={tasksForTodolist} removeTask={removeTask}
                              changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus}
                              filter={tl.filter} removeTodolist={removeTodolist}/>
                )
            })}
        </div>
    );
}

export default App;
