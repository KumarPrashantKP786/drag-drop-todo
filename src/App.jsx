import { useEffect, useState } from "react";
import "./App.css";
import Notes from "./components/Notes";
import InputForm from "./components/InputForm";
import {
  getTodoListFromLocalStorage,
} from "#v1/helpers";

function App() {
  const [notes, setNotes] = useState([]);

  const [submittedValue, setSubmittedValue] = useState("");

  useEffect(() => {
    // build Notes array from localstorage
    const storedNotes = getTodoListFromLocalStorage();
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if (!submittedValue) return;
    const id = crypto.getRandomValues(new Uint32Array(1))[0];
    const newNote = {
      id,
      text: submittedValue,
    };
    setNotes((prev) => [...prev, newNote]);
  }, [submittedValue]);

  return (
    <div className="parent--container">
      <div className="input--container">
          <InputForm setSubmittedValue={setSubmittedValue} />
      </div>
      <div
        id="container"
      >
        <div id="notes-floating-container">
          <Notes notes={notes} setNotes={setNotes} />
        </div>
      </div>
    </div>
  );
}

export default App;
