import React, { useState } from 'react';
import { STUDENTS } from '../studentList'

// DO NOT CHANGE THIS FUNCTION, IT RETURNS TRUE OR FALSE ACCORDING TO GIVEN DATES
// joiningDate COMES FROM input-date, validityDate COMES FROM studentList,
function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split('-');
  const [yyyy, mm, dd] = validityDate.split('-');
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return (maxValid >= selected) && (maxValid >= today);
}

export default function Search({ handleSubmit, errorSubmit }) {

  const [nameVal, setNameVal] = useState("")
  const [dateVal, setDateVal] = useState("")
  const [valid, setValid] = useState(true)

  const handleSearch = () => {

    if (nameVal && dateVal) {

      const findStudent = STUDENTS.find(item => item.name.toLowerCase() == nameVal.toLowerCase())

      if (findStudent) {
        if (checkValidity(dateVal, findStudent.validityDate)) {
          handleSubmit(findStudent.name)
          setValid(true)

        } else {
          errorSubmit(`Sorry, "${nameVal}'s" Not Found! `)
        }
      } else {
        errorSubmit(`Sorry, "${nameVal}" is not a verified student!`)
      }
      setNameVal(""); setDateVal(""); setValid(true)
    } else {
      setValid(false)
    }
  } 

  return (
    <>
      <div className="mb-3">
        <label htmlFor="studentName" className="form-label">Name</label>
        <input id="studentName" data-testid="studentName" type="search"
          onChange={(e) => setNameVal(e.target.value)} value={nameVal}
          className={`form-control` + (valid ? "" : (nameVal ? "" : " invalid"))} />
      </div>

      <div className="mb-4">
        <label htmlFor="joiningDate" className="form-label">Date</label>
        <input id="joiningDate" data-testid="joiningDate" type="date"
          onChange={(e) => setDateVal(e.target.value)} value={dateVal}
          className={`form-control` + (valid ? "" : (dateVal ? "" : " invalid"))} />
      </div>

      <button onClick={handleSearch} type="button" className="btn btn-primary" data-testid="addBtn">Add</button>
    </>
  );
}