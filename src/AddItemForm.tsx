import React, {useState} from "react";

type PropsType = {
    addItem: (title: string) => void
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
            setError('Fill In To Add')
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (title.trim() !== '') {
                props.addItem(title)
                setTitle('')
            } else {
                setError('Fill In To Add')
            }
        }
    }

    // Component
    return (
        <div>
            <input onKeyPress={onKeyPressHandler} onChange={getTaskText} value={title}
                   className={error ? 'error' : ''}/>
            <button onClick={addTitle}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}