import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {Container, Grid, Paper} from "@material-ui/core";
import {FullInput} from "./FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {addTasksAC, addTasksListAC, changeStatusAC, removeTasksAC, TaskReducer} from "./reducers/TaskReducer";
import {addTodoListAC, changeFilterAC, TodoListReducer} from "./reducers/TodoListReducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false}
    // ])
    // let [filter, setFilter] = useState<FilterValuesType>("all")

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(TodoListReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    // let [tasks, setTasks] = useState({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });
    let [tasks, dispatchTasks] = useReducer(TaskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTasks(todolistID: string, id: string) {
        dispatchTasks(removeTasksAC(todolistID, id))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(filtered => filtered.id != id)});
    }

    function changeFilter(ChangeTodolistID: string, value: FilterValuesType) {
        dispatchTodolists(changeFilterAC(ChangeTodolistID, value))
        // setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    const addTasks = (todolistID: string, newTaskTitle: string) => {
        dispatchTasks(addTasksAC(todolistID,newTaskTitle))
        // let newTitle = {id: v1(), title: newTaskTitle, isDone: false};
        // setTasks({...tasks, [todolistID]: [newTitle, ...tasks[todolistID]]})
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeStatusAC(todolistID,taskId,isDone))
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
        dispatchTodolists(addTodoListAC(titleTodo, newTodoListID))
        dispatchTasks(addTasksListAC(newTodoListID))
        // let newId = v1();
        // const newTodoList: todolistsType = {id: newId, title: titleTodo, filter: 'all'}
        // setTodolists([...todolists, newTodoList])
        // setTasks({...tasks, [newId]: []})
    }

    const editTotolistTitle = (todolistID: string, newTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }
    const deleteTotolistTitle = (todolistID: string) => {
        // setTodolists(todolists.filter(el => el.id != todolistID))
    }

    const editTask = (todolistID: string, taskId: string, newTitle: string) => {
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
                        let tasksForTodoList = tasks[mapForTodolists.id]

                        if (mapForTodolists.filter === "completed") {
                            tasksForTodoList = tasks[mapForTodolists.id].filter((k: TaskType) => k.isDone == true)
                        }
                        if (mapForTodolists.filter === "active") {
                            tasksForTodoList = tasks[mapForTodolists.id].filter((k: TaskType) => k.isDone == false)
                        }

                        return (<Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolistID={mapForTodolists.id}
                                    key={mapForTodolists.id}
                                    title={mapForTodolists.title}
                                    tasks={tasksForTodoList}
                                    removeTasks={removeTasks}
                                    changeFilter={changeFilter}
                                    addTasks={addTasks}
                                    changeStatus={changeStatus}
                                    filter={mapForTodolists.filter}
                                    editTotolistTitle={editTotolistTitle}
                                    editTask={editTask}
                                    deleteTotolistTitle={deleteTotolistTitle}
                                />
                            </Paper>
                        </Grid>)

                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
