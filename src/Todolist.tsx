import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import {ButtonGroup} from '@material-ui/core';
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

// JSX
export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')

    // Destructing Props
    // const {id, addTask, ...restProps} = props;

    // Callbacks
    const addTaskCallback = useCallback((newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    }, [props.addTask, props.id]);
    // warning in console about dependencies

    const setTodolistTitle = useCallback((changedTodolistTitle: string) => {
        props.changeTodolistTitle(props.id, changedTodolistTitle);
    }, [props.changeTodolistTitle, props.id]);

    const deleteTodolist = useCallback(() => {
        props.deleteTodolist(props.id);
    }, [props.deleteTodolist]);

    // Callbacks For Filter Buttons
    const onAllClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "all");
    }, []);
    const onActiveClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "active");
    }, []);
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.id, "completed");
    }, []);

    // Filter tasks for todolist
    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    } else if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    // Task Elements And Callbacks
    const deleteTask = (taskId: string) => {
        props.deleteTask(taskId, props.id);
    };
    const changeTaskStatus = (newIsDone: boolean, taskId: string) => {
        props.changeTaskStatus(props.id, taskId, newIsDone);
    };
    const changeTaskTitle = (newTitle: string, taskId: string) => {
        props.changeTaskTitle(props.id, taskId, newTitle)
    };

    let tasksElements = tasksForTodolist.map(t => {
        return <Task key={t.id} task={t} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
    })

    // JSX
    //
    return <div>
        <div className='todolist-header'>
            <EditableSpan title={props.title} setNewTitle={setTodolistTitle}/>
            <IconButton onClick={deleteTodolist}>
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
        <AddItemForm addItem={addTaskCallback}/>

        <div>{tasksElements}</div>
    </div>
});
