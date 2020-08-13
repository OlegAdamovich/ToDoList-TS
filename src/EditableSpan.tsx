import React, {useState} from "react";

type PropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
};

const EditableSpan = (props: PropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputValue, setInputValue] = useState<string>(props.title);

    function getInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value);
    }

    function setNewTitle() {
        props.setNewTitle(inputValue);
        setEditMode(false)
    }

    function keyPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setNewTitle();
        }
    }

    return (
        editMode ? <input onKeyPress={keyPressEnter} onChange={getInputValue} onBlur={setNewTitle} value={inputValue} autoFocus/> : <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
    )
}

export default EditableSpan