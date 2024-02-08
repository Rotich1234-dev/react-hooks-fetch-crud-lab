import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const addQuestion = async (newQuestion) => {
    try {
      await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, {
        method: "DELETE",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onSubmit={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
