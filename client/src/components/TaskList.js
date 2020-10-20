import React from 'react';
import TaskForm from './TaskForm';

export default TaskList = (props) => {

    const { tasks, setTasks} = props

    return (
        <div className="taskContainer">
            <ul className="taskList">
                {tasks.map(task =>(
                    <TaskForm 
                    text={task.text} 
                    key={task.id}
                    setTodos={setTasks}
                    task={task}
                    task={task}
                    />
                ))}
            </ul>
        </div>
    );
};
