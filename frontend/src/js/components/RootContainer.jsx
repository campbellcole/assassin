import React from "react";
import ReactDOM from "react-dom";

import autoBind from "auto-bind";

import css from "../../css/Root.css";

import { HomePage, RegisterPage, StandingsPage, AdminPage } from "./Pages.jsx"

import HeaderContainer from "./HeaderContainer.jsx";
import SideNavContainer from "./SideNavContainer.jsx";
import FooterContainer from "./FooterContainer.jsx";

var pages = [ HomePage, RegisterPage, StandingsPage, AdminPage ];

class RootContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 0
    }
    autoBind.react(this);
  }

  loadPage(index) {
    this.setState({ currentPage: index });
  }

  render() {
    const CurrentPage = pages[this.state.currentPage];
    return (
      <div className="content">
        <HeaderContainer currentPage={this.state.currentPage} clickHandler={ (ind) => this.loadPage(ind) } />
        <SideNavContainer clickHandler={ (ind) => this.loadPage(ind) } />
        <div id="page">
          <CurrentPage />
        </div>
        <FooterContainer />
      </div>
    );
  }

}

export default RootContainer;
