import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (newTaskTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);  // set для ошибки
    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required")
            return;
        }
        props.addTasks(title.trim());
        setTitle(""); // очищаем поле ввода

    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const keyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask()
        }
    }

    const setAllFilter = () => {
        props.changeFilter("all")
    }
    const setActiveFilter = () => {
        props.changeFilter("active")
    }
    const setCompletedFilter = () => {
        props.changeFilter("completed")
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={changeTitle}
                           onKeyPress={keyPressAddTask}
                           className={error ? "error" : ""}/>
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map((k) => {
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(k.id, e.currentTarget.checked)
                                }
                                const onRemoveHandler = () => {props.removeTasks(k.id)}
                                return <li key={k.id} className={k.isDone ? "is-done" : ""}>
                                    <input type="checkbox"
                                           checked={k.isDone}
                                           onChange={onChangeHandler}
                                    />
                                    <span>{k.title}</span>
                                    <button onClick={onRemoveHandler}>x
                                    </button>
                                </li>
                            }
                        )
                    }

                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""} onClick={setAllFilter}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={setActiveFilter}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={setCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}
