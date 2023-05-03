import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (limit, page) => {
  return fetch(`/api/employees/pagination/${limit}/${page}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const fetchEmployeesCount = () => {
    return fetch("/api/employees/pagination/count").then((res) => res.json());
  };

const EmployeePagination = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [page, setPage] = useState(0);
  const [pagesNumber, setPagesNumber] = useState(null);

  const pageLimit = 10;

  const handlePageClick = async (data) => {
    setPage(data.selected);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployeesCount()
    .then((result) => {
      setPagesNumber(Math.ceil(result/10))
    })
  },[])

  useEffect(() => {
    fetchEmployees(pageLimit, page)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <EmployeeTable employees={employees} onDelete={handleDelete} />
    <ReactPaginate
    previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    pageCount={pagesNumber}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={"pagination justify-content-center"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    activeClassName={"active"}
  />
  </>
  )
};

export default EmployeePagination;