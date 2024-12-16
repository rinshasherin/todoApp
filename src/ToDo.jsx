import React, { useState, useEffect } from "react";

function ToDo() {

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const savedTask = JSON.parse(localStorage.getItem("task"));
        if (savedTask) {
            setTask(savedTask);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task));
    }, [task]);

    const addTask = () => {
        if (newTask.trim() === "") return;
        setTask([...task, { id: Date.now(), text: newTask }]);
        setNewTask("");
    };

    const deleteTask = (id) => {
        setTask(task.filter((task) => task.id !== id));
    };

    const startEdit = (task) => {
        setEditTask(task.id);
        setEditText(task.text);
    };

    const saveEdit = () => {
        setTask(
            task.map((task) =>
                task.id === editTask ? { ...task, text: editText } : task
            )
        );
        setEditTask(null);
        setEditText("");
    };

    return (
        <>

            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '90vh' }}>
                <div className="app-container w-50 p-2 border shadow">
                    <h3 className="text-center mb-4 mt-2">ToDo App</h3>

                    <div className="add-task d-flex justify-content-center">
                        <input className="form-control w-50 me-2" type="text" placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                        <button className="btn btn-success" onClick={addTask}>Add</button>
                    </div>

                    <ul className="task-list ">
                        {task.map((task) => (
                            <li className="d-flex align-items-center justify-content-between mt-3" key={task.id}>
                                {editTask === task.id ? (
                                    <>
                                        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="form-control w-25" />
                                        <button className="btn btn-success" onClick={saveEdit}>Save</button>
                                        <button className="btn btn-secondary" onClick={() => setEditTask(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{task.text}</span>
                                        <button className="btn btn-primary" onClick={() => startEdit(task)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
}

export default ToDo;
