/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import "#v1/components/styles/note-styles.css";
import { addTodoListToLocalStorage } from "../helpers";

const Note = forwardRef(({ content, initialPos, id, ...props }, ref) => {
  const {setNotes, notes, onMouseDown} = props;
  const onRemove = (event, id) => {
    event.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    let userAction = false;
    if(updatedNotes.length === 0){
      userAction = true
    }
    addTodoListToLocalStorage(updatedNotes, userAction);
  };

  return (
    <div
      className="note-item"
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "move",
        background: "lightyellow",
      }}
      onMouseDown={onMouseDown}
    >
      <div>
        <section style={{ position: "relative" }}>
          <span className="note--pin">📌</span>
          <span
            className="note--remove"
            onClick={(event) => {
              onRemove(event, id);
            }}
            style={{ position: "absolute", right: "0px", marginRight: "2px", cursor:"pointer" }}
          >
            ❌
          </span>
        </section>
        <hr />
        {content}
      </div>
    </div>
  );
});

export default Note;
