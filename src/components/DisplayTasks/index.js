import React, { useState } from 'react'
import {MdEdit,MdDelete} from "react-icons/md"
import "./index.css"

const DisplayTasks = ({tasks,handleTasks}) => {

  return (
    <div className='display-content'>
        <ul className='task-list-con'>
            {tasks.map((eachItem,index)=><li key={index} id={eachItem.id} className='task-item'>
                <div>
                    <input type='checkbox' checked={eachItem.isChecked} onChange={(e)=>{handleTasks(eachItem.id,"check",e.target.checked)}}/>
                    <span>{eachItem.text}</span>
                </div>
                <div>
                    <MdEdit onClick={()=>handleTasks(eachItem.id,"edit",eachItem.text)} className='icon'/> 
                    <MdDelete style={{marginLeft:"2rem"}} onClick={()=>handleTasks(eachItem.id,"delete")} className='icon'/>
                </div>
            </li>)}
        </ul>
    </div>
  )
}

export default DisplayTasks