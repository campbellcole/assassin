import React from "react";
import ReactDOM from "react-dom";

import PageHome from "./pages/PageHome.jsx";
import PageRegister from "./pages/PageRegister.jsx";
import PageStandings from "./pages/PageStandings.jsx";

class HomePage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return PageHome;
  }
}

class RegisterPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return PageRegister;
  }
}

class StandingsPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return PageStandings;
  }
}

export {
  HomePage,
  RegisterPage,
  StandingsPage
}
