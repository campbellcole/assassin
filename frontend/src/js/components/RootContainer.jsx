import React from "react";
import ReactDOM from "react-dom";

import autoBind from "auto-bind";

import { getJSON } from "../utils.js";

import css from "../../css/Root.css";

import { pages } from "./Pages.jsx"

import HeaderContainer from "./HeaderContainer.jsx";
import SideNavContainer from "./SideNavContainer.jsx";
import FooterContainer from "./FooterContainer.jsx";

class RootContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 0,
      status: {
        username: undefined,
        level: -1,
        loggedIn: false
      }
    }
    autoBind.react(this);
  }

  componentDidMount() {
    getJSON("login/lstat", "", (res) => {
      this.setState((state) => {
        return {
          currentPage: state.currentPage,
          status: res
        }
      })
    });
  }

  loadPage(index) {
    this.setState((state) => {
      return {
        currentPage: index,
        status: state.status
      }
    });
  }

  render() {
    const CurrentPage = pages[this.state.currentPage];
    return (
      <div className="content">
        <HeaderContainer currentPage={ this.state.currentPage } status={ this.state.status } clickHandler={ (ind) => this.loadPage(ind) } />
        <SideNavContainer status={ this.state.status } clickHandler={ (ind) => this.loadPage(ind) } />
        <div id="page">
          <CurrentPage />
        </div>
        <FooterContainer />
      </div>
    );
  }

}

export default RootContainer;
