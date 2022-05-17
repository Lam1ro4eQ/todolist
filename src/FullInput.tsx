import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

type FullInputPropsType = {
    callBack: (newTitle: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    const myRef = useRef<HTMLInputElement>(null)

    // const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);  // set для ошибки

    // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const keyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask()
        }
    }

    const addTask = () => {
        if(myRef.current) {
            props.callBack(myRef.current.value)
        }
    };

    // const addTask = () => {
    //     // const newTitle = title.trim()
    //     if (newTitle.trim() !== "") {
    //         props.callBack(newTitle);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    return (
        <div>
            <input ref={myRef}
                   onKeyPress={keyPressAddTask}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
