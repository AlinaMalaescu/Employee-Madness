import { useEffect, useState } from "react";
import {useAtom} from "jotai"
import state from "./Atom"
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

// const updateAll = () => {
//   const updates = { present: false };

// fetch('/api/employees/updates', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(updates)
// })
//   .then(response => response.json())
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useAtom(state.employees);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    // updateAll();
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable employees={employees} onDelete={handleDelete} />
  )
};

export default EmployeeList;
