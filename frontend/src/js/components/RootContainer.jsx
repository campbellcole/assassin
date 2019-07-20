import React from "react";
import ReactDOM from "react-dom";

import css from '../../css/Root.css';

import { HomePage, RegisterPage, StandingsPage } from "./Pages.jsx"

import HeaderContainer from "./HeaderContainer.jsx";
import FooterContainer from "./FooterContainer.jsx";

var pages = [ HomePage, RegisterPage, StandingsPage ];

class RootContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0
    }
    this.loadPage = this.loadPage.bind(this);
  }

  loadPage(index) {
    this.setState({ currentPage: index });
  }

  render() {
    const CurrentPage = pages[this.state.currentPage];
    return (
      <div className="full-flex">
        <HeaderContainer currentPage={this.state.currentPage} clickHandler={(ind) => this.loadPage(ind) }/>
        <main className="full-flex">
          <CurrentPage />
        </main>
        <FooterContainer />
      </div>
    );
  }
}

export default RootContainer;

ReactDOM.render(<RootContainer />, document.getElementById("root"));
