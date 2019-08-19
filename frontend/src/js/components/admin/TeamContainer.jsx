import React from 'react';
import autoBind from 'auto-bind';

import { userToString, userFromUsername } from '../../utils.js';

class TeamContainer extends React.Component {
  constructor(team) {
    super();
    this.team = team.team;
    this.state = {
      eList: [],
    };
    autoBind.react(this);
  }

  componentDidMount() {
    this.getUsersOnTeam((users) => {
      this.generateElements(users);
    });
  }

  getUsersOnTeam(then) {
    const l = this.team.users.length;
    let ct = 0;
    const users = [];
    this.team.users.forEach((username) => {
      userFromUsername(username, (user) => {
        users.push(user);
        ct += 1;
        if (l === ct) then(users);
      });
    });
  }

  generateElements(users) {
    const teList = [];
    users.forEach((user) => {
      teList.push(
        <p key={user.username}>
          { userToString(user) }
        </p>,
      );
    });
    this.setState({ eList: teList });
  }

  render() {
    const { eList } = this.state;
    return (
      <div className="center-align card grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">
            { this.team.name }
          </span>
          { eList }
        </div>
      </div>
    );
  }
}

export default TeamContainer;
