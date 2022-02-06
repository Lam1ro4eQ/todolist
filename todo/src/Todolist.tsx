import React from "react";

export function Todolist() {
    return (
        <div>
            <h3>Wat to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    <li><input type="checkbox" checked={true}/><span>CSS</span></li>
                    <li><input type="checkbox" checked={true}/><span>HTML</span></li>
                    <li><input type="checkbox" checked={false}/><span>React</span></li>
                </ul>
            </div>
            <div>
                <button>Add</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}