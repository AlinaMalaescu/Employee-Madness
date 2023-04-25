import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import React, {useState, useEffect} from "react"


const EquipmentTable = ({ equipment, onDelete }) => {


  return (
  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Functionality</th>
          <th>Quantity</th>
          <th />
        </tr>
      </thead>
      <tbody>
      {equipment.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
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

export default EquipmentTable;