import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = e => {
    e.preventDefault();
    axiosWithAuth()
      .get("/api/tasks")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="tasks">
      <button onClick={fetchTasks}>Get Tasks</button>
    </div>
  );
}
