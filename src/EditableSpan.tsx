import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    let [edit, setEdit] = useState(true)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }
    const [newTitle, setNewTitle] = useState(props.title);
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return (
        edit
            ? <input value={newTitle} onChange={onChangeTitle} onBlur={onDoubleClickHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;