import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {EditableSpan} from '../components/EditableSpan';
import {TaskStatuses, TaskType} from '../entities';


type PropsType = {
    task: TaskType
    deleteTask: (taskId: string) => void
    changeTaskStatus: (newStatus: TaskStatuses, taskId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string) => void
}


export const Task = React.memo((props: PropsType) => {


    const changeTaskStatusCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(newStatus, props.task.id);
    }, [])
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(newTitle, props.task.id);
    }, [])
    const deleteTask = useCallback(() => {
        props.deleteTask(props.task.id);
    }, [])


    let styleForTaskIsDone = props.task.status === TaskStatuses.Completed ? "isDone" : "";


    return (
        <div className='task-element'>
            <div className={styleForTaskIsDone}>
                <Checkbox color="default" checked={props.task.status === TaskStatuses.Completed} onChange={changeTaskStatusCallback}/>
                <EditableSpan title={props.task.title} setNewTitle={changeTaskTitle}/>
            </div>
            <div>
                <IconButton onClick={deleteTask}>
                    <Delete/>
                </IconButton>
            </div>
        </div>
    )
})