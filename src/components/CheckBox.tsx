import React, {ChangeEvent} from 'react';

type onChangeHandlerType = {
    checked: boolean
    callBack: (eventChecked:boolean) => void
}

export const CheckBox = (props:onChangeHandlerType) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={props.checked}
               onChange={onChangeHandler}
        />
    );
};

export default CheckBox;