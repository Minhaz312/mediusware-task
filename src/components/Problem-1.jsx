import React, { useEffect, useState } from "react";
import status_list from "../data/status_list";

const Problem1 = () => {
    const [show, setShow] = useState("all");

    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const [taskList, setTaskList] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === "" || taskStatus.trim() === "") {
            alert("Task name and Task status required!");
        } else {
            const validStatus = status_list.find(
                (ts) => ts.toLowerCase() === taskStatus.toLowerCase()
            );
            if (validStatus === undefined) {
                alert("Task status is not valid!");
            } else {
                const exist = taskList.find(
                    (t) => t.task_name === taskName.trim()
                );
                if (exist === undefined) {
                    const formatedTaskStatus = taskStatus
                        .trim()
                        .substring(0, 1)
                        .toUpperCase()
                        .concat(taskStatus.substring(1).toLowerCase());
                    const newTask = {
                        task_name: taskName.trim(),
                        task_status: formatedTaskStatus,
                    };
                    setTaskList((tl) => [...tl, newTask]);
                    setTaskName("");
                    setTaskStatus("");
                } else {
                    alert(
                        `Task already exist with status ${exist.task_status}`
                    );
                }
            }
        }
    };

    const handleClick = (type) => {
        setShow(type);
        if (type.toLowerCase() === "all") {
            let allActiveTask = [];
            let allCompletedTask = [];
            let restOfTheTask = [];
            taskList.map((task) => {
                const taskStatus = task.task_status.toLowerCase();
                if (taskStatus === "active") {
                    allActiveTask.push(task);
                } else if (taskStatus === "completed") {
                    allCompletedTask.push(task);
                } else {
                    restOfTheTask.push(task);
                }
            });
            setTaskList([
                ...allActiveTask,
                ...allCompletedTask,
                ...restOfTheTask,
            ]);
        } else {
            let newList = [];
            taskList.map((task) => {
                if (task.task_status.toLowerCase() === type.toLowerCase()) {
                    newList.push(task);
                }
            });
            setFilteredTaskList(newList);
        }
    };

    useEffect(() => {}, [filteredTaskList]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "all" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("all")}
                            >
                                All
                            </button>
                        </li>
                        {status_list.map((sl, i) => (
                            <li className="nav-item" key={i}>
                                <button
                                    className={`nav-link ${
                                        show === sl && "active"
                                    }`}
                                    type="button"
                                    onClick={() => handleClick(sl)}
                                >
                                    {sl}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {show === "all" &&
                                taskList.map((task, i) => (
                                    <tr key={i}>
                                        <td>{task.task_name}</td>
                                        <td>{task.task_status}</td>
                                    </tr>
                                ))}
                            {show !== "all" &&
                                taskList
                                    .filter((list) => list.task_status === show)
                                    .map((task, i) => (
                                        <tr key={i}>
                                            <td>{task.task_name}</td>
                                            <td>{task.task_status}</td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
