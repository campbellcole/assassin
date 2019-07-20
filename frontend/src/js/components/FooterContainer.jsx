import React from "react";
import ReactDOM from "react-dom";

class FooterContainer extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <footer className="page-footer grey darken-2">
        <div className="footer-copyright grey darken-3">
          <div className="container">
          Made by Campbell Cole
          <a className="grey-text text-lighten-3 right" href="https://github.com/campbellcole/assassin">Source Code</a>
          </div>
        </div>
      </footer>
    );
  }

}

export default FooterContainer;
