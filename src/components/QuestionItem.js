import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectIndexChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value, 10);
    // Call the parent component's function to update correctIndex
    onUpdateCorrectIndex(id, newCorrectIndex);
  };

  const handleDeleteClick = () => {
    // Call the parent component's function to delete the question
    onDelete(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
