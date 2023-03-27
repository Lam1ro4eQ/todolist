import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {Container, Grid, Paper} from "@material-ui/core";
import {FullInput} from "./FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {
    addTasksAC,
    addTasksListAC,
    changeStatusAC,
    editTaskAC,
    removeTasksAC,
    TaskReducer
} from "./reducers/TaskReducer";
import {
    addTodoListAC,
    changeFilterAC,
    deleteTotolistTitleAC,
    editTotolistTitleAC,
    TodoListReducer
} from "./reducers/TodoListReducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    // let tasks = useSelector<AppRootStateType,TasksType>(state => state.tasks)

    const dispatch = useDispatch()


    function removeTasks(todolistID: string, id: string) {
        dispatch(removeTasksAC(todolistID, id))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(filtered => filtered.id != id)});
    }

    function changeFilter(ChangeTodolistID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(ChangeTodolistID, value))
        // setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    const addTasks = (todolistID: string, newTaskTitle: string) => {
        dispatch(addTasksAC(todolistID, newTaskTitle))
        // let newTitle = {id: v1(), title: newTaskTitle, isDone: false};
        // setTasks({...tasks, [todolistID]: [newTitle, ...tasks[todolistID]]})
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistID,taskId,isDone))
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(filtered => filtered.id === taskId ? {
        //         ...filtered,
        //         isDone: isDone
        //     } : filtered)
        // })
    }

    const addtodoList = (titleTodo: string) => {
        let newTodoListID = v1()
        dispatch(addTodoListAC(titleTodo, newTodoListID))
        // let newId = v1();
        // const newTodoList: todolistsType = {id: newId, title: titleTodo, filter: 'all'}
        // setTodolists([...todolists, newTodoList])
        // setTasks({...tasks, [newId]: []})
    }

    const editTotolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(editTotolistTitleAC(todolistID,newTitle))
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }
    const deleteTotolistTitle = (todolistID: string) => {
        dispatch(deleteTotolistTitleAC(todolistID))
        // setTodolists(todolists.filter(el => el.id != todolistID))
    }

    const editTask = (todolistID: string, taskId: string, newTitle: string) => {
        dispatch(editTaskAC(todolistID,taskId,newTitle))
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el => el.id === taskId ? {...el,title:newTitle} : el)})
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container spacing={6} style={{padding: '20px', margin: '50px'}}>
                    <FullInput callBack={addtodoList}
                    />
                </Grid>
                <Grid container spacing={6} style={{padding: '20px'}}>
                    {todolists.map((mapForTodolists) => {
                        // let tasksForTodoList = tasks[mapForTodolists.id]
                        //
                        // if (mapForTodolists.filter === "completed") {
                        //     tasksForTodoList = tasks[mapForTodolists.id].filter((k: TaskType) => k.isDone == true)
                        // }
                        // if (mapForTodolists.filter === "active") {
                        //     tasksForTodoList = tasks[mapForTodolists.id].filter((k: TaskType) => k.isDone == false)
                        // }

                        return (<Grid key={mapForTodolists.id} item>
                            <Paper style={{padding: "10px"}}>
                                <TodolistWithRedux
                                    todolistID={mapForTodolists.id}
                                    title={mapForTodolists.title}
                                    filter={mapForTodolists.filter}
                                />
                            </Paper>
                        </Grid>)

                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
