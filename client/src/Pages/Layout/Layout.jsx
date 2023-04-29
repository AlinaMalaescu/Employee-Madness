import { Outlet, Link } from "react-router-dom";
import {useAtom} from "jotai"
import state from '../Atom'

import "./Layout.css";

const Layout = () => {

  const [filter, setFilter] = useAtom(state.filter);

  const handleInput = (event) => {
    setFilter(event.target.value);
  }

return(
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
        <input onInput={handleInput}></input>
        </li>
        <li>
          <Link to="/create">
          <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
)
};

export default Layout;
