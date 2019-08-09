import React from "react";
import ReactDOM from "react-dom";

import StandingsContainer from "./StandingsContainer.jsx";
import UsersContainer from "./admin/UsersContainer.jsx";
import TeamsContainer from "./admin/TeamsContainer.jsx";
import { getJSON } from "./../utils.js"

class HomePage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h2 className="center-align">Assassin</h2>
        <div className="row center-align">
          <div className="col s5">
            <div className="card grey darken-2">
              <div className="card-content white-text grey darken-1">
                <span className="card-title">Information</span>
                <p>
                  <b>What is this?</b><br />
                  This is a work in progress attempting to automate the game called assassin.
                  <br />
                  <b>When can I use it?</b><br />
                  No idea... "When it's ready".
                </p>
              </div>
            </div>
          </div>
          <div className="col s5 offset-s2">
            <div className="card grey darken-2">
              <div className="card-content white-text grey darken-1">
                <span className="card-title">Updates</span>
                <p>
                  <b>19 July 2019</b><br />
                  Initial website started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

class RegisterPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container row">
        <h2 className="center-align">Register</h2>
        <form className="col s12" method="POST" action="/register">
          <div className="row">
            <div className="input-field col s12">
              <input name="username" id="username" type="text" />
              <label for="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="password" id="password" type="password" />
              <label for="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input name="name" id="name" type="text" />
              <label for="name">Full name</label>
            </div>
            <div className="input-field col s6">
              <input name="email" id="email" type="email" />
              <label for="email">Email Address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="phone" id="phone" type="text" />
              <label for="phone">Phone Number</label>
            </div>
          </div>
          <div className="row center-align">
            <button className="btn waves-effect waves-light grey darken-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

}

class LoginPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container row">
        <h2 className="center-align">Log In</h2>
        <form className="col s12" method="POST" action="/login">
          <div className="row">
            <div className="input-field col s12">
              <input name="username" id="username" type="text" />
              <label for="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="password" id="password" type="password" />
              <label for="password">Password</label>
            </div>
          </div>
          <div className="row center-align">
            <button className="btn waves-effect waves-light grey darken-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

}

class DashboardPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <p>test</p>
      </div>
    );
  }

}

class StandingsPage extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    getJSON("game", "", (res) => {
      var bar = document.getElementById("progbar"),
          p = bar.parentNode;
      p.removeChild(bar);
      var el = document.getElementById("standings");
      ReactDOM.render(<StandingsContainer standings={ res } />, el);
      el.style.display = "block";
    });
  }

  render() {
    return (
      <div className="container center-align">
        <h2>Standings</h2>
        <div className="progress" id="progbar">
          <div className="indeterminate"></div>
        </div>
        <div id="standings">
        </div>
      </div>
    );
  }

}

class AdminPage extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    getJSON("admin/users", "", (res) => {
      ReactDOM.render(<UsersContainer users={ res } />, document.getElementById("users"));
    });
    getJSON("admin/teams", "", (res) => {
      if (401 === res) alert("no permission");
      ReactDOM.render(<TeamsContainer teams={ res } />, document.getElementById("teams"));
    });
  }

  render() {
    return (
      <div className="container">
      <h3 className="center-align">Moderation Panel</h3>
        <div className="row">
          <div className="col s5">
            <div id="users"></div>
          </div>
          <div className="col s5 offset-s2">
            <div id="teams"></div>
          </div>
        </div>
        <div className="row">
          <div className="col s6 offset-s3" id="selected-team"></div>
        </div>
      </div>
    );
  }

}

// classes aren't hoisted apparently
var pages = [ HomePage, RegisterPage, LoginPage, DashboardPage, StandingsPage, AdminPage ];

export {
  HomePage,
  RegisterPage,
  LoginPage,
  DashboardPage,
  StandingsPage,
  AdminPage,
  pages
}
