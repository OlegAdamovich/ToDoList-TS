import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./AppWithRedux";

type PropsType = {
    task: TaskType
    deleteTask: (taskId: string) => void
    changeTaskStatus: (newIsDone: boolean, taskId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string) => void
}

export const Task = React.memo((props: PropsType) => {
    // Деструктуризация пропсов
    // const {setNewTitle, changeTaskStatus, ...restProps} = props;

    // Callbacks
    const changeTaskStatusCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked;
        props.changeTaskStatus(newIsDone, props.task.id);
    }, [])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(newTitle, props.task.id);
    }, [])

    const deleteTask = useCallback(() => {
        props.deleteTask(props.task.id);
    }, [])

    // Styles
    let styleForTaskIsDone = props.task.isDone ? "isDone" : "";

    return (
        <div className='task-element'>
            <div className={styleForTaskIsDone}>
                <Checkbox color="default" checked={props.task.isDone} onChange={changeTaskStatusCallback}/>
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