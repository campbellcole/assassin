import React from "react";
import ReactDOM from "react-dom";

import { logout } from "../utils.js";

class SideNavContainer extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { clickHandler, status } = this.props;
    console.log(status);
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <SideNavItem text="Home" clickHandler={ () => clickHandler(0) } />
          { !status.loggedIn &&
            <SideNavItem text="Register" clickHandler={ () => clickHandler(1) } />
          }
          { !status.loggedIn &&
            <SideNavItem text="Log In" clickHandler={ () => clickHandler(2) } />
          }
          { status.loggedIn &&
            <SideNavItem text="Dashboard" clickHandler={ () => clickHandler(3) } />
          }
          <SideNavItem text="Standings" clickHandler={ () => clickHandler(4) } />
          { 1 === status.level &&
            <SideNavItem text="Moderation Panel" clickHandler={ () => clickHandler(5) } />
          }
          { status.loggedIn &&
            <SideNavItem text="Logout" clickHandler={ () => logout() } />
          }
        </ul>
      </div>
    );
  }

}

const SideNavItem = ({ text, clickHandler }) => (
  <li>
    <a className="sidenav-close" onClick={ () => clickHandler() }>
      { text }
    </a>
  </li>
);

export default SideNavContainer;
export { SideNavItem };
