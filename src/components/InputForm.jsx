import React, { useState } from "react";

export default function InputForm({setSubmittedValue}) {
  const [inputValue,setInputValue] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    setSubmittedValue(inputValue);
  };
  
  const handleInputChange=(e)=>{
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder="Add a new task"
      onChange={handleInputChange}
      >

      </input>

      <button type="submit" className="submit--button">ADD TODO</button>
    </form>
  );
}
