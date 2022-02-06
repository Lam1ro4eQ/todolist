import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id
        })
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const addTasks = (newTaskTitle: string) => {
        // const newTaskTitle: string = "new task";
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }

        setTasks([...tasks, newTask]);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodoList = tasks
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(k => k.isDone == true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(k => k.isDone == false)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
                      changeStatus={changeStatus}
                      filter={filter}
            />

        </div>
    );
}


export default App;
