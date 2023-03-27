import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {FullInput} from "./FullInput";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import EditableSpan from "./EditableSpan";
import InputMap from "./components/CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTasksAC, changeStatusAC, editTaskAC, removeTasksAC} from "./reducers/TaskReducer";
import {changeFilterAC, deleteTotolistTitleAC, editTotolistTitleAC} from "./reducers/TodoListReducer";


type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

export function TodolistWithRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()


    const setAllFilter = () => {
        // props.changeFilter(props.todolistID, "all")
        dispatch(changeFilterAC(props.todolistID, "all"))
    }
    const setActiveFilter = () => {
        // props.changeFilter(props.todolistID, "active")
        dispatch(changeFilterAC(props.todolistID, "active"))
    }
    const setCompletedFilter = () => {
        // props.changeFilter(props.todolistID, "completed")
        dispatch(changeFilterAC(props.todolistID, "completed"))
    }

    if (props.filter === "completed") {
        tasks = tasks.filter((k: TaskType) => k.isDone == true)
    }
    if (props.filter === "active") {
        tasks = tasks.filter((k: TaskType) => k.isDone == false)
    }

    const addTaskHandler = (newTaskTitle: string) => {
        dispatch(addTasksAC(props.todolistID, newTaskTitle))
    }
    const editTotolistTitleHandler = (newTitle: string) => {
        dispatch(editTotolistTitleAC(props.todolistID, newTitle))
    }
    const editTaskHandler = (kID: string, newTitle: string) => {
        // props.editTask(props.todolistID, kID, newTitle)
        dispatch(editTaskAC(props.todolistID, kID, newTitle))
    }
    const deleteTotolistTitleHandler = () => {
        dispatch(deleteTotolistTitleAC(props.todolistID))
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
                        tasks.map((k) => {
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(changeStatusAC(props.todolistID, k.id,e.currentTarget.checked))
                                }
                                const onRemoveHandler = () => {
                                    dispatch(removeTasksAC(props.todolistID, k.id))
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
