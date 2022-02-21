import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    filter: FilterValuesType
    title: string
}

export type TaskStateType = {
    [todoListId: string]: Array<TaskType>    // любое кол-во неопределнных строковых ключей
}

function App() {

    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const todoListId_3 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "Wat to learn", filter: "all"},
        {id: todoListId_2, title: "Wat to buy", filter: "all"},
        {id: todoListId_3, title: "Wat to read", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ], [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Cola", isDone: false},
            {id: v1(), title: "Donat", isDone: false},
        ], [todoListId_3]: [
            {id: v1(), title: "OOP", isDone: true},
            {id: v1(), title: "TSD", isDone: true},
            {id: v1(), title: "OLO", isDone: false},
            {id: v1(), title: "Hello", isDone: false},
        ]
    });

    function removeTask(id: string, todoListId: string) {
        // const taskFromTodoList = tasks[todoListId];
        // const filteredTask = taskFromTodoList.filter(t => t.id !== id);
        // const copyTasks = {...tasks};
        // copyTasks[todoListId] = filteredTask;
        // setTasks(copyTasks);
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function addTasks(newTaskTitle: string, todoListId: string) {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        const taskFromTodoList = tasks[todoListId]
        const updatedTask = [newTask, ...taskFromTodoList]
        const copyTasks = {...tasks};
        copyTasks[todoListId] = updatedTask
        setTasks(copyTasks)


        setTasks({...tasks, [todoListId]: tasks[todoListId]})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let task = tasks[todoListId].find((t) => {
            return t.id === taskId
        })
        if (task) {
            task.isDone = isDone
            setTasks({...tasks, [todoListId]: [...tasks[todoListId]]})
        }
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map((t)=>t.id === taskId ? {...t, isDone}:t)}) если мапить
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl));
    }


    let taskForTodolist = tasks;
    if (filter === "completed") {
        taskForTodolist = tasks.filter((t) => {
            return t.isDone === true
        })
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter((t) => {
            return t.isDone === false
        })
    }


    const todoListsRender = todoLists.map((ls) => {
        return (<Todolist title="Wat to learn"
                          tasks={taskForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTasks={addTasks}
                          changeStatus={changeStatus}
                          filter={filter}
            />
        )
    });


    return (
        <div className="App">
            <todoListsRender/>
        </div>
    );
}

export default App;
