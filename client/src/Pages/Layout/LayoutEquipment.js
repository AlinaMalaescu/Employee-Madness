import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const LayoutEquipment = () => {

return (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="grow">
          <Link to="/equipment">Equipment</Link>
        </li>
        <li>
          <Link to="equipment/equipmentCreate">
          <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
)
};

export default LayoutEquipment;