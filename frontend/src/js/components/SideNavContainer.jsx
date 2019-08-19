import React from 'react';
import PropTypes from 'prop-types';

import { logout } from '../utils';

const SideNavContainer = ({ clickHandler, status }) => (
  <div>
    <ul id="slide-out" className="sidenav">
      <SideNavItem text="Home" clickHandler={() => clickHandler(0)} />
      { !status.loggedIn
          && <SideNavItem text="Register" clickHandler={() => clickHandler(1)} />}
      { !status.loggedIn
          && <SideNavItem text="Log In" clickHandler={() => clickHandler(2)} />}
      { status.loggedIn
          && <SideNavItem text="Dashboard" clickHandler={() => clickHandler(3)} />}
      <SideNavItem text="Standings" clickHandler={() => clickHandler(4)} />
      { status.level === 1
          && <SideNavItem text="Moderation Panel" clickHandler={() => clickHandler(5)} />}
      { status.loggedIn
          && <SideNavItem text="Logout" clickHandler={() => logout()} />}
    </ul>
  </div>
);

SideNavContainer.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  status: PropTypes.node.isRequired,
};

const SideNavItem = ({ text, clickHandler }) => (
  <li>
    <a className="sidenav-close" role="button" tabIndex={0} onClick={() => clickHandler()}>
      { text }
    </a>
  </li>
);

SideNavItem.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default SideNavContainer;
export { SideNavItem };
