import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type FullInputPropsType = {
    callBack: (newTitle: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    // const myRef = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);  // set для ошибки

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    console.log(title)
    const keyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    // const addTask = () => {
    //     setError(null);
    //     if (myRef.current && myRef.current.value !== "") {
    //         props.callBack(myRef.current.value);
    //         myRef.current.value = "";
    //
    //     } else {
    //         setError("Title is required");
    //
    //     }
    // };

    const addTask = () => {
        const newTitle = title.trim()
        if (newTitle.trim() !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                onKeyPress={keyPressAddTask}
                value={title}
                onChange={changeTitle}
                error={!!error}/>


            {/*<input*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={keyPressAddTask}*/}
            {/*    value={changeTitle}*/}
            {/*    />*/}
            <IconButton onClick={addTask} color={'primary'}>
                <ControlPoint/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
