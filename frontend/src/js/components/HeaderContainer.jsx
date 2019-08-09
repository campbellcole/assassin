import React from "react";
import ReactDOM from "react-dom";

import { logout } from "../utils.js";

class HeaderContainer extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { currentPage, status, clickHandler } = this.props;
    return (
      <nav className="grey darken-3">
        <div id="nav-wrapper">
          <a className="brand-logo">Assassin</a>
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <HeaderItem text="Home" active={ currentPage == 0 ? true : false } clickHandler={ () => clickHandler(0) } />
            { !status.loggedIn &&
              <HeaderItem text="Register" active={ currentPage == 1 ? true : false } clickHandler={ () => clickHandler(1) } />
            }
            { !status.loggedIn &&
              <HeaderItem text="Log In" active={ currentPage == 2 ? true : false } clickHandler={ () => clickHandler(2) } />
            }
            { status.loggedIn &&
              <HeaderItem text="Dashboard" active={ currentPage == 3 ? true : false } clickHandler={ () => clickHandler(3) } />
            }
            { status.loggedIn &&
              <HeaderItem text="Logout" active={ false } clickHandler={ () => logout() } />
            }
            <HeaderItem text="Standings" active={ currentPage == 4 ? true : false } clickHandler={ () => clickHandler(4) } />
            { 1 === status.level.code &&
              <HeaderItem text="Moderation Panel" active={ currentPage == 5 ? true : false } clickHandler={ () => clickHandler(5) } />
            }
          </ul>
        </div>
      </nav>
    );
  }

}

const HeaderItem = ({ text, active, clickHandler }) => (
  <li className={ active ? "active" : "" }>
    <a onClick={() => clickHandler() }>
      { text }
    </a>
  </li>
);

export default HeaderContainer;
export { HeaderItem };
