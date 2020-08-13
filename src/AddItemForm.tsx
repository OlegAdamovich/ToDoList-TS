import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

type PropsType = {
    addItem: (inputValue: string) => void
};

const AddItemForm = (props: PropsType) => {
    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    function getInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    function onKeyPressHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addItem();
        }
    }

    function addItem() {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue);
            setInputValue('');
        } else {
            setError("Title is required");
            setInputValue('');
        }
    }

    return (
        <div>
            <TextField error={!!error} helperText={error} label="Enter Title" variant="outlined" size={'small'} value={inputValue} onChange={getInputValue} onKeyPress={onKeyPressHandler}/>
            <Button variant={"outlined"} color={"default"} size={"small"} onClick={addItem}>ADD</Button>
        </div>
    )
}

export default AddItemForm