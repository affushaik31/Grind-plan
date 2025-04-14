import React from 'react'
import './App.css'
import { useState } from 'react' 
import animation from "js-confetti"

function App() {

  const[task, setTask]= useState([])
  const[finished, setFinished]= useState([])
  const[text, setText]= useState()
  const[cb, setCb]= useState(false)

  const deleteTask=(place)=>{
    task.splice(place,1)
    setTask([...task])
  }

  const completeTheTask= (place) =>{
    const ani=new animation()
    ani.addConfetti({
      emojis: ['✨', '💞', '💫', '🎉'],
  })
  

  setTimeout(()=>{
    let t = task.splice(place,1)
    setFinished([...finished,t])
    setCb(false)
    setTask([...task])
    
  },1000)
}

  const undoTask = (place)=>{
    setTimeout(()=>{
      let t = finished.splice(place,1)
      setTask([...task,t])
      setCb(false)
      setFinished([...finished])
    },500)
  }

  return (
     <>
      <div className='container'>
        <div>
          <h1 id='head'>Daily Grind Plan</h1>
        </div>
       
        <div className='child1'>
          
          <input 
          type='text'
          placeholder='Enter your Plan...'
          id='in-box'
          value={text}
          onChange={(event)=>{setText(event.target.value)}}
          />

          <button id='btn' onClick={()=>{
            let t=text.trim()
            if(t==''){
              alert("You can't add empty plan")
            }
            else{
              setTask([...task,t])
            }
            setText('')
          }}>Add Plan</button>
          

        </div>
        <div className='child2'>
          <div className='active'>
            <h1>Persisting Plan</h1>
            {task.map((item,index)=><div className='rendered-tasks'>
              
           
            <input type='checkbox'
            checked={cb}
            onChange={()=>{completeTheTask(index)}}
            />

            <li key={index}>{item}</li>
            <img src='/edit.png' width="40px"
            onClick={()=>{
              let updated_value=prompt("Previously:"+task[index])
              task.splice(index,1,updated_value)
              setTask([...task])
            }}/>
            <img id={index} src='./delete.png' width="40"
            onClick={()=>{deleteTask(index)}}/>
            </div>)}
          </div>
          <div className='finished'>
            <h1>Accomplished Plan</h1>
            {finished.map((item, index)=>
                <div className='undo'> 
                  <button onClick={()=>{undoTask(index)}}>undo</button>
                  <li key={index}>{item}</li>
                </div> 
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default App
