import { useEffect, useState } from 'react';
import './App.css'
import Notes from './components/notes';
import InputForm from './components/InputForm';
import { addTodoListToLocalStorage, getTodoListFromLocalStorage } from '#v1/helpers';

function App() {


  // const testNotes = [
  //   {
  //     id:1,
  //     text:'task1'
  //   },
  //   {
  //     id:2,
  //     text:'task2'
  //   },
  //   {
  //     id:3,
  //     text:'task3'
  //   }
  // ];
  const [notes,setNotes] = useState([])

  const [submittedValue, setSubmittedValue] = useState('');

  useEffect(()=>{
    // build Notes array from localstorage
    const storedNotes = getTodoListFromLocalStorage();
    debugger
    if(storedNotes){
      setNotes(storedNotes);
    }
  },[])
  
  useEffect(()=>{
    if(!submittedValue)
      return;
    const id = notes.length + 1;
    const newNote = {
      id,
      text: submittedValue
    }
    setNotes((prev)=>[...prev,newNote])
  },[submittedValue])

  useEffect(()=>{
    addTodoListToLocalStorage(notes)
  },[notes])




  return (
    <>
      <div id="notes-container">
        <InputForm  setSubmittedValue={setSubmittedValue} />
        <div id="notes-floating-container">
        <Notes notesList={notes} setNotes={setNotes}/>
        </div>
        
      </div>
    </>
  )
}

export default App
