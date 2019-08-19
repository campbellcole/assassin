import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'auto-bind';

import TeamContainer from './TeamContainer.jsx';

class TeamsContainer extends React.Component {
  static displayTeam(team) {
    ReactDOM.render(<TeamContainer team={team} />, document.getElementById('selected-team'));
  }

  constructor(teams) {
    super();
    this.teams = teams.teams;
    autoBind.react(this);
    this.generateElements();
  }

  generateElements() {
    this.eList = [];
    this.teams.array.forEach((team) => {
      this.eList.push(this.TeamRow(team));
    });
  }

  TeamRow(team) {
    return (
      <li className="collection-item" key={team.name}>
        { team.name }
        <a className="secondary-content cursor-pointer" role="button" tabIndex={0} onClick={() => this.displayTeam(team)}>
          <i className="material-icons black-text">more</i>
        </a>
      </li>
    );
  }

  render() {
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Teams</h4></li>
        { this.eList }
      </ul>
    );
  }
}

export default TeamsContainer;
