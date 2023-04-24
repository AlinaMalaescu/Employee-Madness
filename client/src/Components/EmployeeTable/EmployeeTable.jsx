import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import {useAtom} from "jotai";
import React, {useState} from "react"
import state from '../../Pages/Atom'

const EmployeeTable = ({ employees, onDelete }) => {

  const [filter, setFilter] = useAtom(state.filter);

  return (
  <div className="EmployeeTable">
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
