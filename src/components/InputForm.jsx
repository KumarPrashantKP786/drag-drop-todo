/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";

export default function InputForm({ setSubmittedValue }) {
  InputForm.propTypes = {
    setSubmittedValue: PropTypes.func.isRequired,
  };
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="input--form">
      <input
      className="notes-input--element"
        type="text"
        placeholder="Add a new task"
        onChange={handleInputChange}
        value={inputValue}
      ></input>

      <button type="submit" className="notes-submit--button">
        Add Todo
      </button>
    </form>
  );
}
