import React, {useState} from "react";

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
            <input value={inputValue}
                   onChange={getInputValue}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm