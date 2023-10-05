import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Header'
import Content from './Content';
import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    (async function initTasks() {
      let tasks = (await axios.get(("http://localhost:3002/api/tasks"))).data;
      setTasks(tasks);
    })();
  }, [tasks.length])
  
  //task func
  const handleSave = async (newTask) => {
    try {
      await axios.post(("http://localhost:3002/update-task"), newTask);
      let newTasks = (await axios.get(("http://localhost:3002/api/tasks"))).data;
      setTasks(newTasks);
      return true;
    } catch (e) {
      console.log("save failed");
      return false
    }
  }

  const handleDeleteAll = async () => {
    try {
      await axios.post(("http://localhost:3002/deleteALL-task"));
      let newTasks = (await axios.get(("http://localhost:3002/api/tasks"))).data;
      setTasks(newTasks);
      return true;
    } catch (e) {
      console.log("delete all failed");
      return false;
    }
  }

  const handleDelete = async (newTask) => {
    try {
      await axios.post(("http://localhost:3002/delete-task"), newTask);
      let newTasks = (await axios.get(("http://localhost:3002/api/tasks"))).data;
      setTasks(newTasks);
      return true;
    } catch (e) {
      console.log("delete failed");
      return false
    }
  }

  const handleCreateTask = async (newTask) => {
    try {
      await axios.post(("http://localhost:3002/insert-task"), newTask);
      let newTasks = (await axios.get(("http://localhost:3002/api/tasks"))).data;
      setTasks(newTasks);
      return true;
    } catch (e) {
      console.log("insert failed");
      return false
    }
    
  }

  return (
    <>
      <Header/>
      <Content 
        tasks={tasks} 
        handleSave={handleSave}
        handleDeleteAll={handleDeleteAll}
        handleDelete={handleDelete}
        handleCreateTask={handleCreateTask}
      />
    </>
  );
}

export default App;
