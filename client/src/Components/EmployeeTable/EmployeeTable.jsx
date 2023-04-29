import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import {useAtom} from "jotai";
import React, {useState, useEffect} from "react"
import state from '../../Pages/Atom'

const EmployeeTable = ({ employees, onDelete }) => {

  const [filter, setFilter] = useAtom(state.filter);
  const [counter, setCounter] = useState(0);

  const handleSortByFirstName = () => {
    employees.sort((a, b) => a.name.localeCompare(b.name));
    setCounter(counter+1);
  }

  const handleSortByLastName = () => {
    employees.sort((a,b) => a.name.split(" ")[a.name.split(" ").length-1].localeCompare(b.name.split(" ")[b.name.split(" ").length-1]));
    setCounter(counter+1);
  }

  const handleSortByMiddleName = () => {
    const array1 = employees.filter(employee => employee.name.split(" ").length === 3).sort((a,b) => a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]));
    const array2 = employees.filter(employee => employee.name.split(" ").length !== 3).sort((a, b) => a.name.localeCompare(b.name));

    employees.splice(0, employees.length, ...array1.concat(array2));
    setCounter(counter+1);
  }

  const handleSortByPosition = () => {
    employees.sort((a, b) => a.position.localeCompare(b.position));
    setCounter(counter+1);
  }

  const handleSortByLevel = () => {
    employees.sort((a, b) => a.level.localeCompare(b.level));
    setCounter(counter+1);
  }
 
  return (
  <div className="EmployeeTable">
      <button onClick={handleSortByFirstName}>Sort by First Name</button>
      <button onClick={handleSortByLastName}>Sort by Last Name</button>
      <button onClick={handleSortByMiddleName}>Sort by Middle Name</button>
      <button onClick={handleSortByPosition}>Sort by Position</button>
      <button onClick={handleSortByLevel}>Sort by Level</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
      {employees.filter((employee) =>(!filter || employee.level.includes(filter) || employee.position.includes(filter))).map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
  </div>
  )
};

export default EmployeeTable;
