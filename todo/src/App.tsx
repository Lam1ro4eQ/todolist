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
    [key: string]: Array<TaskType>
}

function App() {

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "Wat to learn", filter: "all"},
        {id: v1(), title: "Wat to buy", filter: "all"},
        {id: v1(), title: "Wat to read", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [todoLists[0].id]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],[todoLists[1].id]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],[todoLists[2].id]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ]
    });

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

   // let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
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

    function addTasks(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => {
            return t.id === taskId
        })
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist title="Wat to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
