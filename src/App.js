import React, { useState } from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';

function App() {

  const [student, setStudent] = useState([])
  const [error, setError] = useState("")

  const handleSubmit = (name) => {
    setStudent([...student, name])
  }

  const errorSubmit = (message) => {
    setError(message)
    setTimeout(() => setError(""), 5000);
  }

  return (
    <div className="container">

      <h1>Student List</h1>
      <hr />

      <div className="screen">

        <Search handleSubmit={handleSubmit} errorSubmit={errorSubmit} />

        {error ? <Error message={error} /> : null}
        
      </div>
      
      <ResidentsList student={student} />

    </div>
  );
}

export default App;