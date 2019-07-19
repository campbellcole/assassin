import React from "react";
import ReactDOM from "react-dom";

import { HomePage, RegisterPage, StandingsPage } from "./Pages.jsx"

import HeaderContainer from "./HeaderContainer.jsx";

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
      <div id="content">
        <HeaderContainer currentPage={this.state.currentPage} clickHandler={(ind) => this.loadPage(ind) }/>
        <CurrentPage />
      </div>
    );
  }
}

export default RootContainer;

ReactDOM.render(<RootContainer />, document.getElementById("root"));
