/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function InputForm({ setSubmittedValue }) {
  InputForm.propTypes = {
    setSubmittedValue: PropTypes.func.isRequired,
  };
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={(e)=>{handleSubmit(e)}} className="input--form">
      <textarea
        ref={textareaRef}
        className="notes-input--element"
        placeholder="Add a new task"
        onChange={handleInputChange}
        value={inputValue}
        rows={1}
      ></textarea>
      <button type="submit" className="notes-submit--button">
        Add Todo
      </button>
    </form>
  );
}