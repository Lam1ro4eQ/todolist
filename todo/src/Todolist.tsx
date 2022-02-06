import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}


export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map((t) => {
                            return <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={()=>props.removeTask(t.id)}>x</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button>Add</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}