import React, {ChangeEvent} from "react";

type CheckBoxType = {

}

export const CheckBox(CheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(t.id, e.currentTarget.checked, props.id)
    }

    <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} className={t.isDone ? "is-done" : ""}/>
}