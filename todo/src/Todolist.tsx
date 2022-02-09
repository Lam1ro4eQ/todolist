import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (newTaskTitle: string) => void
    changeStatus: (taskId:string, isDone:boolean) => void
}


export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("");

    const newTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onPresKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTasks(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTasks(newTaskTitle);
        setNewTaskTitle("");
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={newTitleChangeHandler}
                       onKeyPress={onPresKeyHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map((t) => {
                            const onRemoveHandler = () => {props.removeTask(t.id)}
                            const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id, e.currentTarget.checked)}

                            return <li key={t.id}><input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}