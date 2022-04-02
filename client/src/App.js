import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from "react";
import Axios from 'axios'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    getTasks()
  }, [])

  const getTasks = () =>{
    const URL = 'http://localhost:3001/get'
    Axios.get(URL)
    .then(response=>{setTasks(response.data)})
    .catch(error=>{throw error})
  }

  const addTask = (task) =>{
    const URL = 'http://localhost:3001/add'
    Axios.post(URL, task)
    .then(()=>{getTasks()})
    .catch(error=>{throw error})
  }

  const deleteTask = id =>{
    const URL = `http://localhost:3001/delete/${id}`
    Axios.delete(URL)
    .then(()=>{setTasks(tasks.filter((task)=> task.id !== id))})
    .catch(error=>{throw error})

  }

  const toggleReminder = (id) =>{
    const URL = `http://localhost:3001/update/${id}`

    const newReminder = !tasks.filter(task=>task.id===id)[0].reminder
    Axios.put(URL, {reminder: newReminder, id:id})
    .then(()=>{ 
      setTasks(tasks.map((task)=>task.id===id ? {...task, reminder: !task.reminder} : task))
    })
    .catch(error=>{throw error})
    
  }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:'No task to show'}
    </div>
  );
}

export default App;
