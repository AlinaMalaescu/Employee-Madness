import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useAtom} from "jotai"
import state from "./Atom"
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


const fetchEmployees = (search) => {
    console.log(search)
    return fetch(`/api/employees/new/${search}`).then((res) => res.json())
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeSearch = () => {

  const { search } = useParams();
//   const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useAtom(state.employees);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(search)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
      <EmployeeTable employees={employees} onDelete={handleDelete} />
  )
};

export default EmployeeSearch;