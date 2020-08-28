import React, {useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
};

export const EditableSpan = React.memo((props: PropsType) => {
    console.log('EditableSpan called')
    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputValue, setInputValue] = useState<string>(props.title);

    const getInputValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }, [])

    const setNewTitle = useCallback(() => {
        props.setNewTitle(inputValue);
        setEditMode(false)
    }, [])

    const keyPressEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setNewTitle();
        }
    }, [])

    const setEditModeCallback = useCallback(() => {
        setEditMode(true);
    }, []);

    return (
        editMode ? <TextField size={'small'} onKeyPress={keyPressEnter} onChange={getInputValue} onBlur={setNewTitle}
                              value={inputValue} autoFocus/> :
            <span onDoubleClick={setEditModeCallback}>{inputValue}</span>
    )
})

