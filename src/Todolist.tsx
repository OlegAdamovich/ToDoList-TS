import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'; // используется импорт по дефолту (без дефолта import {Delete} from '@material-ui/icons')

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (newFilter: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, taskText: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    renameTaskTitle: (newTitle: string, todolistId: string, taskId: string) => void
    renameTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    // Callbacks
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const renameTodolistTitle = (newTitle: string) => {
        props.renameTodolistTitle(newTitle, props.id)
    }

    function deleteTodolist() {
        props.removeTodolist(props.id)
    }

    // Component
    return <div>
        <div>
            <EditableSpan title={props.title} renameTaskTitle={renameTodolistTitle}/>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
        <div>
            <ButtonGroup color="primary" size='small'>
                <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? 'contained' : 'outlined'}>ALL</Button>
                <Button onClick={onActiveClickHandler} variant={props.filter === 'active' ? 'contained' : 'outlined'}>ACTIVE</Button>
                <Button onClick={onCompletedClickHandler} variant={props.filter === 'completed' ? 'contained' : 'outlined'}>COMPLETED</Button>
            </ButtonGroup>
        </div>
        <AddItemForm addItem={addTask} str='What To Do'/>
        <div>
            {
                props.tasks.map(t => {
                    const deleteTask = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, props.id, e.currentTarget.checked)

                    const renameTaskTitle = (newTitle: string) => {
                        props.renameTaskTitle(newTitle, props.id, t.id)
                    }

                    return (
                        <div key={t.id} style={t.isDone ? {opacity: '0.5'} : undefined}>
                            <Checkbox checked={t.isDone} onChange={onChangeHandler} color="default"/>
                            <EditableSpan title={t.title} renameTaskTitle={renameTaskTitle}/>
                            <IconButton onClick={deleteTask}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    )
                })
            }
        </div>
    </div>
}
