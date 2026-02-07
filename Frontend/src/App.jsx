import { useState,useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])

  function fatchNotes(){
     axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
    setNotes(res.data.notes)
    console.log(res.data.notes)
  })
  }

  function handleSubmit (elem){
    elem.preventDefault()
    const {title, description} = elem.target.elements
    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description: description.value
    })
    .then((res)=>{
      console.log(res.data)
      fatchNotes()
    })
  }
  useEffect(()=>{
   fatchNotes()
  },[])

  function handleDeleteNote(id){
    axios.delete("http://localhost:3000/api/notes/"+id)
    .then((res)=>{
      console.log(res.data)
      fatchNotes()
    })
  }

  function handleUpdateNote(id){
    console.log(id)
    return <>
    <form>
      <input type="text" placeholder='enter your title' />
      <input type="text" placeholder='enter your description' />
      <h1>hhk</h1>
    </form>
    </>
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="note-create-form">
      <input name='title' type="text" placeholder='Title' />
      <input name='description' type="text" placeholder='Description' />
      <button type='submit'>Create Note</button>
    </form>
      <div className="notes">
        {notes.map((elem)=>{
          return <div className="note">
            <h1>{elem.title}</h1>
            <p>{elem.description}</p>
            <button onClick={()=>{handleDeleteNote(elem._id)}}>delete</button>
            <button onClick={()=>{handleUpdateNote(elem._id)}}>Update</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
