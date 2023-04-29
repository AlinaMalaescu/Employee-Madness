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

const EmployeesMissing = () => {

  const [loading, setLoading] = useState(true);
  const [missingEmployees, setMissingEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setMissingEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };
  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setMissingEmployees (employees.filter((employee) => employee.present === false));
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    missingEmployees && <EmployeeTable employees={missingEmployees} onDelete={handleDelete} />
  )
};

export default EmployeesMissing;