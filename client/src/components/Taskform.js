import React, { useState } from "react";


const Taskform = () => {

    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState([]);
    
        const inputTextHandler = (e) => {
            console.log(e.target.value);
            setInputText(e.target.value);
        };
        const submitTaskHandler = (e) => {
            e.preventDefault();
            setTasks([
                ...tasks, {text: inputText, id: Math.random() * 1000},
            ]);
    
            setInputText('');
        };
    
      return (
        <form>
          <input 
          value={inputText}
          onChange={inputTextHandler} 
          type="text" 
          className="task-input" 
          />
          <button onClick={submitTaskHandler} className="task-button" type="submit">
            Add
          </button>
        </form>
      ) 
    }
    
    export default Taskform;