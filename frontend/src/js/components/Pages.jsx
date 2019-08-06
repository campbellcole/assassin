import React from "react";
import ReactDOM from "react-dom";

import PageHome from "./pages/PageHome.jsx";
import PageRegister from "./pages/PageRegister.jsx";
import PageStandings from "./pages/PageStandings.jsx";
import PageAdmin from "./pages/PageAdmin.jsx";

import { getStandings, populateAdminPanel } from "./../../index.js";

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
    getStandings();
  }

  render() {
    return PageStandings;
  }

}

class AdminPage extends React.Component {

  constructor() {
    super();
    populateAdminPanel();
  }

  render() {
    return PageAdmin;
  }

}

export {
  HomePage,
  RegisterPage,
  StandingsPage,
  AdminPage
}
