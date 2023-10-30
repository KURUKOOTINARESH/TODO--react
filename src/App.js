import './App.css';
import { useState } from 'react';
import {v4 as uuid4} from "uuid"
import DisplayTasks from './components/DisplayTasks';
import { useRef,useEffect } from 'react';



function App() {

  const inputRef = useRef(null)

  const [task,setTask] = useState('')
  const [taskList,setTaskList] = useState([])
  const [editId,setEditId] = useState('')

  useEffect(()=>{
    const localData = JSON.parse(localStorage.getItem('tasks'))
    if(localData){
      setTaskList(localData)
    }
  },[])

  const handleTasks = (id,action,text=null)=>{
    if(action === "delete"){
      const updatedTaskList = taskList.filter(eachItem => eachItem.id !== id)
      setTaskList(updatedTaskList)
      localStorage.setItem('tasks',JSON.stringify(updatedTaskList))
      setEditId('')
    }
    else if(action === "edit"){
      inputRef.current.focus()
      setTask(text)
      setEditId(id)
    }else if(action === "check"){
      const updatedTaskList = taskList.map(eachItem=>{
        if(eachItem.id === id){
          return {...eachItem,isChecked:text}
        }
        return eachItem
      })
      setTaskList(updatedTaskList)
      localStorage.setItem('tasks',JSON.stringify(updatedTaskList))
    }
  }

  const onFormSubmit = (e)=>{
    e.preventDefault()
    if(editId){
      const updatedTaskList = taskList.map(eachItem=>{
        if(eachItem.id === editId){
          return {...eachItem,text:task}
        }
        return eachItem
      })
      setTaskList(updatedTaskList)
      localStorage.setItem('tasks',JSON.stringify(updatedTaskList))
    }else{
      const newTask = {
        id:uuid4(),
        text : task,
        isChecked: false
      }
      taskList.push(newTask)
      setTaskList(taskList)
      localStorage.setItem('tasks',JSON.stringify(taskList))
    }
    setTask("")
    setEditId('')
  }

  return (
    <div className="App">
      <h1>TODO APPLICATION</h1>
      <form onSubmit={onFormSubmit} className='form-con'>
        <input type='text' ref={inputRef} value={task} placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)} className='input-field'/>
        <button type='submit' className='submit-btn'>Submit</button>
      </form>
      <div className='display-wraper'>
        <DisplayTasks tasks={taskList} handleTasks = {handleTasks}/>
      </div>
    </div>
  );
}

export default App;
