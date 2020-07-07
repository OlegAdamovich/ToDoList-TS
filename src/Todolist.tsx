import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    return <div>
        <div className='todolist-header'>
            <EditableSpan title={props.title} renameTaskTitle={renameTodolistTitle}/>
            <button onClick={() => props.removeTodolist(props.id)}>X</button>
        </div>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, props.id, e.currentTarget.checked)

                    const renameTaskTitle = (newTitle: string) => {
                        props.renameTaskTitle(newTitle, props.id, t.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} renameTaskTitle={renameTaskTitle}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>
                All
            </button>
            <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>
                Active
            </button>
            <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>
                Completed
            </button>
        </div>
    </div>
}
