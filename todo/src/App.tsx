import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

let tasks = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false}
]

function removeTask(id:number) {
    let resultTask = tasks.filter( t => t.id !== id)
}


function App() {
  return (
    <div className="App">
        <Todolist title = "Wat to learn" tasks={tasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;
