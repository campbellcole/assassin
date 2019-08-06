import React from "react";
import ReactDOM from "react-dom";

import RootContainer from "./js/components/RootContainer.jsx";
import StandingsContainer from "./js/components/StandingsContainer.jsx";

import UsersContainer from "./js/components/pages/admin/UsersContainer.jsx";
import TeamsContainer from "./js/components/pages/admin/TeamsContainer.jsx";

document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
});

function getJSON(url, then) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onload = (e) => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        then(JSON.parse(req.responseText));
      }
    }
  };
  req.send(null);
}

function getStandings() {
  getJSON(window.location.href + "game", (res) => gotStandings(res));
}

function gotStandings(res) {
  var progbar = document.getElementById("progbar");
  var p = progbar.parentNode;
  p.removeChild(progbar);
  var stel = document.getElementById("standings");
  ReactDOM.render(<StandingsContainer standings={ res } />, stel);
  stel.style.display = "block";
}

function populateAdminPanel() {
  getJSON(window.location.href + "admin/users", (res) => gotUsers(res));
  getJSON(window.location.href + "admin/teams", (res) => gotTeams(res));
}

function gotUsers(res) {
  ReactDOM.render(<UsersContainer users={ res } />, document.getElementById("users"));
}

function gotTeams(res) {
  ReactDOM.render(<TeamsContainer teams={ res } />, document.getElementById("teams"))
}

export {
  getStandings,
  populateAdminPanel
};
