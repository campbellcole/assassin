import React from 'react';
import PropTypes from 'prop-types';

import { logout } from '../utils';

const HeaderContainer = ({ currentPage, status, clickHandler }) => (
  <nav className="grey darken-3">
    <div id="nav-wrapper">
      <a className="brand-logo">Assassin</a>
      <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <HeaderItem text="Home" active={currentPage === 0} clickHandler={() => clickHandler(0)} />
        {!status.loggedIn
        && <HeaderItem text="Register" active={currentPage === 1} clickHandler={() => clickHandler(1)} />}
        {!status.loggedIn
        && <HeaderItem text="Log In" active={currentPage === 2} clickHandler={() => clickHandler(2)} />}
        {status.loggedIn
        && <HeaderItem text="Dashboard" active={currentPage === 3} clickHandler={() => clickHandler(3)} />}
        {status.loggedIn
        && <HeaderItem text="Logout" active={false} clickHandler={() => logout()} />}
        <HeaderItem text="Standings" active={currentPage === 4} clickHandler={() => clickHandler(4)} />
        {status.level === 1
        && <HeaderItem text="Moderation Panel" active={currentPage === 5} clickHandler={() => clickHandler(5)} />}
      </ul>
    </div>
  </nav>
);

HeaderContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  status: PropTypes.node.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

const HeaderItem = ({ text, active, clickHandler }) => (
  <li className={active ? 'active' : ''}>
    <a role="button" tabIndex={0} onClick={() => clickHandler()}>
      { text }
    </a>
  </li>
);

HeaderItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default HeaderContainer;
export { HeaderItem };
