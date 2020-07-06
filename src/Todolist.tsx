import React, {useState} from 'react';
import {FilterValuesType} from './App';

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
}

export function Todolist(props: PropsType) {
    // Local State
    let [error, setError] = useState<string | null>(null)
    let [taskText, setTaskText] = useState<string>('')

    // Callbacks
    const getTaskText = (e: React.ChangeEvent<HTMLInputElement>) => setTaskText(e.currentTarget.value)

    const addTask = () => {
        if (taskText.trim() !== '') {
            props.addTask(props.id, taskText)
            setTaskText('')
        } else {
            setError('Fill In To Add')
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (taskText.trim() !== '') {
                props.addTask(props.id, taskText)
                setTaskText('')
            } else {
                setError('Fill In To Add')
            }
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return <div>
        <div className='todolist-header'>
            <h3>{props.title}</h3>
            <button onClick={() => props.removeTodolist(props.id)}>X</button>
        </div>
        <div>
            <input onKeyPress={onKeyPressHandler} onChange={getTaskText} value={taskText} className={error? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, props.id, e.currentTarget.checked)

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
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
