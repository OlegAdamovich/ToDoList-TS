import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithReducers';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import {ButtonGroup} from '@material-ui/core';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
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

    const onAllClickHandler = () => props.changeTodolistFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeTodolistFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeTodolistFilter(props.id, "completed");

    function setTodolistTitle(changedTodolistTitle: string) {
        props.changeTodolistTitle(props.id, changedTodolistTitle);
    }

    // JSX
    return <div>
        <div className='todolist-header'>
            <EditableSpan title={props.title} setNewTitle={setTodolistTitle}/>
            <IconButton onClick={() => props.deleteTodolist(props.id)}>
                <Delete/>
            </IconButton>
        </div>
        <hr/>
        <div className='buttons-group'>
            <ButtonGroup color="default" size="small">
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'contained' : "outlined"}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'contained' : "outlined"}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'contained' : "outlined"}>Completed</Button>
            </ButtonGroup>
        </div>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const deleteTask = () => props.deleteTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                    }
                    const setNewTitle = (newTitle: string) => props.changeTaskTitle(props.id, t.id, newTitle);

                    return (
                        // className={t.isDone ? "is-done" : ""} add opacity if task is done
                        <div key={t.id} className='task-element'>
                            <div>
                                <Checkbox color="default" checked={t.isDone} onChange={changeTaskStatus}/>
                                <EditableSpan title={t.title} setNewTitle={setNewTitle}/>
                            </div>
                            <div>
                                <IconButton onClick={deleteTask}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
}
