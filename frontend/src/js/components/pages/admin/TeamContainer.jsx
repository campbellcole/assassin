import React from "react";
import autoBind from "auto-bind";

import { userToString, userFromUsername } from "../../../utils.js";

class TeamContainer extends React.Component {

  constructor(team) {
    super();
    this.team = team.team;
    this.state = {
      eList: []
    }
    autoBind.react(this);
  }

  componentDidMount() {
    this.getUsersOnTeam((users) => {
      this.generateElements(users);
    })
  }

  render() {
    return (
      <div className="center-align card grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">
            { this.team.name }
          </span>
          { this.state.eList }
        </div>
      </div>
    );
  }

  getUsersOnTeam(then) {
    var l = this.team.users.length;
    var ct = 0;
    var users = [];
    for (var username of this.team.users) {
      userFromUsername(username, (user) => {
        users.push(user);
        if (l === ++ct) then(users);
      });
    }
  }

  generateElements(users) {
    var teList = [];
    for (var user of users) {
      teList.push(
        <p key={ user.username }>
          { userToString(user) }
        </p>
      );
    }
    this.setState({ eList: teList });
  }
}

export default TeamContainer;
