import React from "react";
import ReactDOM from "react-dom";

import css from "./../../css/Header.css";

import HeaderItem from "./HeaderItem.jsx";

class HeaderContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { currentPage, clickHandler } = this.props;
    return (
      <div id="header">
        <ul>
          <HeaderItem text="Home" active={ currentPage == 0 ? true : false } clickHandler={() => clickHandler(0) } />
          <HeaderItem text="Register" active={ currentPage == 1 ? true : false } clickHandler={() => clickHandler(1) } />
          <HeaderItem text="Standings" active={ currentPage == 2 ? true : false } clickHandler={() => clickHandler(2) } />
        </ul>
      </div>
    );
  }
}

export default HeaderContainer;
