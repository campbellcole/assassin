import React from "react";
import ReactDOM from "react-dom";
import autoBind from "auto-bind";

import TeamContainer from "./TeamContainer.jsx"

class TeamsContainer extends React.Component {

  constructor(teams) {
    super();
    this.teams = teams.teams;
    this.state = {
      team: this.teams[0] // currently selected team
    }
    autoBind.react(this);
    this.generateElements();
  }

  render() {
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Teams</h4></li>
        { this.eList }
      </ul>
    );
  }

  generateElements() {
    this.eList = [];
    for (var team of this.teams) {
      this.eList.push(this.TeamRow(team));
    }
  }

  displayTeam(team) {
    this.setState({ team: team });
    ReactDOM.render(<TeamContainer team={ team }/>, document.getElementById("selected-team"));
  }

  TeamRow(team) {
    return (
      <li className="collection-item" key={ team.name }>
        { team.name }
        <a className="secondary-content cursor-pointer" onClick={() => this.displayTeam(team)}>
          <i className="material-icons">more</i>
        </a>
      </li>
    );
  }

}

export default TeamsContainer;