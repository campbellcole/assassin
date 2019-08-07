import React from "react";
import ReactDOM from "react-dom";

import RootContainer from "./js/components/RootContainer.jsx";
import StandingsContainer from "./js/components/StandingsContainer.jsx";

import UsersContainer from "./js/components/pages/admin/UsersContainer.jsx";
import TeamsContainer from "./js/components/pages/admin/TeamsContainer.jsx";

import { getJSON } from "./js/utils.js";

ReactDOM.render(<RootContainer />, document.getElementById("root"));

document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
});

function getStandings() {
  getJSON("game", "", (res) => {
    var progbar = document.getElementById("progbar");
    var p = progbar.parentNode;
    p.removeChild(progbar);
    var stel = document.getElementById("standings");
    ReactDOM.render(<StandingsContainer standings={ res } />, stel);
    stel.style.display = "block";
  });
}

function populateAdminPanel() {
  getJSON("admin/users", "", (res) => {
    ReactDOM.render(<UsersContainer users={ res } />, document.getElementById("users"));
  });
  getJSON("admin/teams", "", (res) => {
    ReactDOM.render(<TeamsContainer teams={ res } />, document.getElementById("teams"));
  });
}

export {
  getStandings,
  populateAdminPanel
};
