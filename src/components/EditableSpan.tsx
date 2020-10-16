import React, {useCallback, useState} from "react";
import {TextField} from "@material-ui/core";
import {RequestStatusType} from '../entities';

type PropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
};

export const EditableSpan = React.memo((props: PropsType) => {
    console.log('EditableSpan called')

    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputValue, setInputValue] = useState<string>(props.title);

    const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const setNewTitle = () => {
        props.setNewTitle(inputValue);
        setEditMode(false)
    }

    const keyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setNewTitle();
        }
    }

    const setEditModeCallback = () => {
        setEditMode(true);
    }

    return (
        editMode ? <TextField size={'small'} onKeyPress={keyPressEnter} onChange={getInputValue} onBlur={setNewTitle}
                              value={inputValue} autoFocus/> :
            <span onDoubleClick={setEditModeCallback}>{props.title}</span>
    )
})

