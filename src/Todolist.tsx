import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {FullInput} from "./FullInput";


type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (todolistID:string, id: string) => void
    changeFilter: (todolistID:string, value: FilterValuesType) => void
    addTasks: (todolistID:string, newTaskTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    // const [title, setTitle] = useState("");
    // const [error, setError] = useState<string | null>(null);  // set для ошибки
    // const addTask = () => {
    //     if (title.trim() === "") {
    //         setError("Field is required")
    //         return;
    //     }
    //     props.addTasks(props.todolistID, title.trim());
    //     setTitle(""); // очищаем поле ввода
    //
    // };
    // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    // const keyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === "Enter") {
    //         addTask()
    //     }
    // }

    const setAllFilter = () => {
        props.changeFilter(props.todolistID,"all")
    }
    const setActiveFilter = () => {
        props.changeFilter(props.todolistID,"active")
    }
    const setCompletedFilter = () => {
        props.changeFilter(props.todolistID,"completed")
    }

    const addTaskHandler = (newTaskTitle:string) => {
        props.addTasks(props.todolistID, newTaskTitle)
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                    <FullInput
                        callBack={addTaskHandler}
                    />
                <ul>
                    {
                        props.tasks.map((k) => {
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(props.todolistID, k.id, e.currentTarget.checked)
                                }
                                const onRemoveHandler = () => {props.removeTasks(props.todolistID,k.id)}
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
