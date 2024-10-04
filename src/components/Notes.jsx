/* eslint-disable react/prop-types */
import { createRef, useEffect, useRef } from "react";
import Note from "./note";
import {
  addTodoListToLocalStorage,
  getTodoListFromLocalStorage,
} from "../helpers";

export default function Notes({ notes = [], setNotes }) {
  // handling saved notes
  useEffect(() => {
    const savedNotes = getTodoListFromLocalStorage();
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find(
        (savedNote) => savedNote.id === note.id
      );
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });
    addTodoListToLocalStorage(notes);
    setNotes(updatedNotes);
  }, [notes.length]);

  const noteRefs = useRef([]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note, e) => {
    console.log('drag started')
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

    const handleMouseMove = (e) => {
      console.log('handleMouseMove')
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      console.log('handleMouseUp')
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) {
        return false;
      }

      const otherRect =
        noteRefs.current[note.id].current.getBoundingClientRect();
      const overlap = !(
        rect.right < otherRect.left ||
        rect.left > otherRect.right ||
        rect.bottom < otherRect.top ||
        rect.top > otherRect.bottom
      );

      return overlap;
    });
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) => {
      return note.id === id ? { ...note, position: newPosition } : note;
    });

    setNotes(updatedNotes);
    addTodoListToLocalStorage(updatedNotes);
  };
  return (
    <div className="notes-list">
      {notes.map((note) => {
        return (
          <Note
            id={note.id}
            key={note.id}
            ref={
              noteRefs.current[note.id]
                ? noteRefs.current[note.id]
                : (noteRefs.current[note.id] = createRef())
            }
            initialPos={note?.position}
            content={note.text}
            notes={notes}
            setNotes={setNotes}
            onMouseDown={(e) => {
              handleDragStart(note, e);
            }}
          />
        );
      })}
    </div>
  );
}
