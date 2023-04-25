import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import {useAtom} from "jotai";
import React, {useState, useEffect} from "react"
import state from '../../Pages/Atom'

const EmployeeTable = ({ employees, onDelete }) => {

  const [filter, setFilter] = useAtom(state.filter);
  const [rearrangement, setRearrangement] = useAtom(state.rearrangement);
  const [howToRearrange, setHowToRearrange] = useState(null);

  useEffect(() => {
    console.log(rearrangement);
    if(rearrangement === 'firstName') {
      let array = employees.sort((a, b) => a.name.localeCompare(b.name));
      setHowToRearrange(array);
    } else if (rearrangement === 'lastName') {
      let array = employees.sort((a,b) => a.name.split(" ")[a.name.split(" ").length-1].localeCompare(b.name.split(" ")[b.name.split(" ").length-1]))
      setHowToRearrange(array);
    } else if (rearrangement === 'middleName') {
      let array = employees.filter(employee => employee.name.split(" ").length === 3).sort((a,b) => a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]));
      setHowToRearrange(array);
    } else if (rearrangement === 'position') {
      let array = employees.sort((a, b) => a.position.localeCompare(b.position));
      setHowToRearrange(array);
    } else if (rearrangement === 'level') {
      let array = employees.sort((a, b) => a.level.localeCompare(b.level));
      setHowToRearrange(array);
    }

  }, [rearrangement]);


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
      {!rearrangement && employees.filter((employee) =>(!filter || employee.level.includes(filter) || employee.position.includes(filter))).map((employee) => (
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
        {rearrangement && howToRearrange && howToRearrange.map((employee) => (
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
