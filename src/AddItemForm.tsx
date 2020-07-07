import React, {useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
    str?: string
}

export const AddItemForm = (props: PropsType) => {
    // Local State
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState<string>('')

    // Callbacks
    const getTaskText = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTitle = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError("Type something to add")
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (title.trim() !== '') {
                props.addItem(title)
                setTitle('')
            } else {
                setError("Type something to add")
            }
        }
    }

    // Component
    return (
        <div>
            <TextField size='small' variant="outlined" label={!!error ? error: props.str} onKeyPress={onKeyPressHandler}
                       onChange={getTaskText} value={title} error={!!error} style={{margin: '10px 0'}}/>
            <IconButton onClick={addTitle}>
                <Add />
            </IconButton>
        </div>
    )
}