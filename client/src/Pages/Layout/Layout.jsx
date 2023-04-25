import { Outlet, Link } from "react-router-dom";
import {useAtom} from "jotai"
import state from '../Atom'

import "./Layout.css";

const Layout = () => {

  const [filter, setFilter] = useAtom(state.filter);
  const [rearrangement, setRearrangement] = useAtom(state.rearrangement);


  const handleInput = (event) => {
    setFilter(event.target.value);
  }

  const handleSortByFirstName = () => {
    setRearrangement('firstName');
  }

  const handleSortByLasttName = () => {
    setRearrangement('lastName');
  }

  const handleSortByMiddletName = () => {
    setRearrangement('middleName');
  }

  const handleSortByPosition = () => {
    setRearrangement('position');
  }

  const handleSortByLevel = () => {
    setRearrangement('level');
  }
return(
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
        <button onClick={handleSortByFirstName}>Sort by First Name</button>
        </li>
        <li>
        <button onClick={handleSortByLasttName}>Sort by Last Name</button>
        </li>
        <li>
        <button onClick={handleSortByMiddletName}>Sort by Middle Name</button>
        </li>
        <li>
        <button onClick={handleSortByPosition}>Sort by Position</button>
        </li>
        <li>
        <button onClick={handleSortByLevel}>Sort by Level</button>
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
