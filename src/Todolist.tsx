import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    id: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, changedTodolistTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, changedTaskTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    }

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    function setTodolistTitle(changedTodolistTitle: string) {
        props.changeTodolistTitle(props.id, changedTodolistTitle);
    }

    return <div>
        <div className='todolist-header'>
            <h3>
                <EditableSpan title={props.title} setNewTitle={setTodolistTitle}/>
            </h3>
            <button onClick={() => props.deleteTodolist(props.id)}>X</button>
        </div>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                    }
                    const setNewTitle = (newTitle: string) => props.changeTaskTitle(props.id, t.id, newTitle);

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} setNewTitle={setNewTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
