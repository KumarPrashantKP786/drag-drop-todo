import React, { useEffect } from 'react'
import Note from './note'

export default function Notes({notesList, setNotes}) {
    useEffect(()=>{
        console.log(notesList);
        
    },[notesList])
  return (
    <>
    <div className="notes-list">
        {
            notesList.map((note)=>{ 
                return (
                <Note key={note.id} note={note} notesList={notesList} setNotes={setNotes}/>
                )
            })
        }
    </div>
    </>
  )
}
