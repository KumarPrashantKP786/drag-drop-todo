/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import "#v1/components/styles/note-styles.css";
import { addTodoListToLocalStorage } from "../helpers";

const Note = forwardRef(({ content, initialPos, id, ...props }, ref) => {
  const { setNotes, notes, note,  onMouseDown } = props;
  console.log(note) 
  const onRemove = (event, id) => {
    event.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    let userAction = false;
    if (updatedNotes.length === 0) {
      userAction = true;
    }
    addTodoListToLocalStorage(updatedNotes, userAction);
  };

  const onToggleDone = (event, id) => {
    event.stopPropagation();
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, done: !note.done };
      }

      return note;
    });
    setNotes(updatedNotes);
    addTodoListToLocalStorage(updatedNotes, false);
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
        // background: "lightyellow",
        textDecorationLine : `${note?.done
          ? "line-through" 
          : "none"}`, background: `${ note?.done ? "lightgreen" : "lightyellow"}`
      }}
      onMouseDown={onMouseDown}
    >
      <div>
        <section style={{ position: "relative" }}>
          <span className="note--pin">📌</span>
          <button
            type="submit"
            style={{ marginLeft: "10px", backgroundColor: "grey" }}
            onClick={(event) => onToggleDone(event, id)}
          >
            Mark as done
          </button>
          <span
            className="note--remove"
            onClick={(event) => {
              onRemove(event, id);
            }}
            style={{
              position: "absolute",
              right: "0px",
              marginRight: "2px",
              cursor: "pointer",
            }}
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
