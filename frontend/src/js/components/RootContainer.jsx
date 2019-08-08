import React from "react";
import ReactDOM from "react-dom";

import autoBind from "auto-bind";

import { getJSON } from "../utils.js";

import css from "../../css/Root.css";

import { HomePage, RegisterPage, LoginPage, DashboardPage, StandingsPage, AdminPage } from "./Pages.jsx"

import HeaderContainer from "./HeaderContainer.jsx";
import SideNavContainer from "./SideNavContainer.jsx";
import FooterContainer from "./FooterContainer.jsx";

var pages = [ HomePage, RegisterPage, LoginPage, DashboardPage, StandingsPage, AdminPage ];

class RootContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 0,
      loggedIn: false
    }
    autoBind.react(this);
  }

  componentDidMount() {
    this.loadPage(0);
  }

  loadPage(index) {
    getJSON("login/lstat", "", (res) => {
      this.setState((state) => {
        return {
          currentPage: index,
          loggedIn: res.loggedIn
        }
      })
    });
  }

  render() {
    const CurrentPage = pages[this.state.currentPage];
    return (
      <div className="content">
        <HeaderContainer currentPage={ this.state.currentPage } loggedIn={ this.state.loggedIn } clickHandler={ (ind) => this.loadPage(ind) } />
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
