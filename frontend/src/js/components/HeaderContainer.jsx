import React from "react";
import ReactDOM from "react-dom";

import HeaderItem from "./HeaderItem.jsx";

class HeaderContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { currentPage, clickHandler } = this.props;
    return (
      <nav className="grey darken-3">
        <div id="nav-wrapper">
          <a className="brand-logo">Assassin by Campbell Cole</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <HeaderItem text="Home" active={ currentPage == 0 ? true : false } clickHandler={() => clickHandler(0) } />
            <HeaderItem text="Register" active={ currentPage == 1 ? true : false } clickHandler={() => clickHandler(1) } />
            <HeaderItem text="Standings" active={ currentPage == 2 ? true : false } clickHandler={() => clickHandler(2) } />
          </ul>
        </div>
      </nav>
    );
  }
}

export default HeaderContainer;
