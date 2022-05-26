import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    let [edit, setEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if (newTitle !== "") {
            props.callBack(newTitle)
        } else {
            props.callBack("error")
        }
    }
    const enterClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onDoubleClickHandler()
        }
    }
    const [newTitle, setNewTitle] = useState(props.title);
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return (
        edit
            ? <input
                value={newTitle}
                onChange={onChangeTitle}
                onBlur={onDoubleClickHandler}
                onKeyPress={enterClickHandler}
                autoFocus
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;