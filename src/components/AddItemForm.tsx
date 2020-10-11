import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

type PropsType = {
    addItem: (inputValue: string) => void
    disabled?: boolean
};

// JSX
export const AddItemForm = React.memo((props: PropsType) => {
    console.log('AddItemForm is called')
    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem();
        }
    }

    const addItem = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue);
            setInputValue('');
        } else {
            setError("Title is required");
            setInputValue('');
        }
    }

    return (
        <div className='add-item-form'>
            <TextField disabled={props.disabled} error={!!error} helperText={error} label="Enter Title" variant="outlined" size={'small'}
                       value={inputValue} onChange={getInputValue} onKeyPress={onKeyPressHandler}/>
            <Button disabled={props.disabled} variant={"outlined"} color={"default"} size={"small"} onClick={addItem}>ADD</Button>
        </div>
    )
})
