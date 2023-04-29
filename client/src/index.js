import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import LayoutEquipment from "./Pages/Layout/LayoutEquipment";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EmployeeSearch from "./Pages/EmployeeSearch"
import EmployeesMissing from "./Pages/EmployeesMissing"

import Equipment from "./Pages/Equipment";
import EquipmentCreator from "./Pages/EquipmentCreator"
import EquipmentUpdater from "./Pages/EquipmentUpdater"

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeSearch />,
      },
      {
        path: "/missing",
        element: <EmployeesMissing />
      }
     ]
    },
  {
    path: "/equipment",
    element: <LayoutEquipment />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/equipment",
        element: <Equipment />,
      },
      {
        path: "equipment/equipmentCreate",
        element: <EquipmentCreator />,
      },
      {
        path: "equipment/equipmentUpdate/:id",
        element: <EquipmentUpdater />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
