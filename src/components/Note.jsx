import "#v1/components/styles/note-styles.css";
export default function Note({ note, notesList, setNotes }) {
  const onRemove = (event,id)=>{
    event.stopPropagation();
    const updatedNotes = notesList.filter((item)=>item.id!==id);
    setNotes(updatedNotes);

  }

  const onCompleted = () =>{
     alert('you clicked on completed')
  }

  return (
    <div className="note-item">
      <div id={note.id} onClick={onCompleted}>
        <section style={{position:'relative'}}>
          {note.id}
          <span className="note--pin">📌</span>
          <span className="note--remove" onClick={(event)=>{ onRemove(event, note.id)}} style={{position:'absolute', right:'0px', marginRight:'2px'}}>❌</span>
        </section>
        <hr />
        {note.text}
      </div>
    </div>
  );
}
