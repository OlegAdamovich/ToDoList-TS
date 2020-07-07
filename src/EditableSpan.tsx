import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    renameTaskTitle: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    // Local State
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    // Callbacks
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.renameTaskTitle(title)
    }

    const onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    const getTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    // Component
    return (
        editMode ?
            <TextField size='small' variant="outlined" label='Type Here' onKeyPress={onPressEnter} onChange={getTitle}
                       onBlur={offEditMode} value={title} autoFocus/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}