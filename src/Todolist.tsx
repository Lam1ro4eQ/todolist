import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {FullInput} from "./FullInput";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import EditableSpan from "./EditableSpan";
import InputMap from "./components/CheckBox";


type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTasks: (todolistID: string, newTaskTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    editTotolistTitle: (todolistID: string, newTitle: string) => void
    editTask: (todolistID: string, taskId: string, newTitle: string) => void
    deleteTotolistTitle: (todolistID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
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
        props.changeFilter(props.todolistID, "all")
    }
    const setActiveFilter = () => {
        props.changeFilter(props.todolistID, "active")
    }
    const setCompletedFilter = () => {
        props.changeFilter(props.todolistID, "completed")
    }
    const addTaskHandler = (newTaskTitle: string) => {
        props.addTasks(props.todolistID, newTaskTitle)
    }
    const editTotolistTitleHandler = (newTitle: string) => {
        props.editTotolistTitle(props.todolistID, newTitle)
    }
    const editTaskHandler = (kID: string, newTitle: string) => {
        props.editTask(props.todolistID, kID, newTitle)
    }
    const deleteTotolistTitleHandler = () => {
        props.deleteTotolistTitle(props.todolistID)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan
                        callBack={editTotolistTitleHandler}
                        title={props.title}/>
                    <IconButton onClick={deleteTotolistTitleHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <FullInput
                    callBack={addTaskHandler}
                />
                <ul>
                    {
                        props.tasks.map((k) => {
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(props.todolistID, k.id, e.currentTarget.checked)
                                }
                                const onRemoveHandler = () => {
                                    props.removeTasks(props.todolistID, k.id)
                                }
                                return <li key={k.id} className={k.isDone ? "is-done" : ""}>
                                    {/*<CheckBox checked={}*/}
                                    <input type="checkbox"
                                           checked={k.isDone}
                                           onChange={onChangeHandler}
                                    />
                                    <EditableSpan
                                        callBack={(newTitle) => editTaskHandler(k.id, newTitle)}
                                        title={k.title}/>
                                    <IconButton onClick={onRemoveHandler}>
                                        <Delete/>
                                    </IconButton>
                                </li>
                            }
                        )
                    }

                </ul>
                <div>
                    <Button variant={props.filter === "all" ? "outlined" : "text"}
                            onClick={setAllFilter}>All
                    </Button>
                    <Button variant={props.filter === "active" ? "contained" : "text"}
                            color={"primary"}
                            onClick={setActiveFilter}>Active
                    </Button>
                    <Button variant={props.filter === "completed" ? "contained" : "text"}
                            color={"secondary"}
                            onClick={setCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
        ;
}
