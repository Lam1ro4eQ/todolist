import React, {useState} from "react";
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
}


export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={(e) => {
                    setNewTaskTitle(e.currentTarget.value)
                }}
                onKeyPress={(e) => {
                    console.log(e);
                    if(e.key === "Enter") {
                        props.addTasks(newTaskTitle);
                        setNewTaskTitle("");
                    }
                }}
                />
                <button onClick={() => {
                    props.addTasks(newTaskTitle);
                    setNewTaskTitle("");
                } }>+</button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map((t) => {
                            return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={() => props.removeTask(t.id)}>x</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}