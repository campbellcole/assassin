import React from "react";
import autoBind from "auto-bind";

import { sendVerifyUser, userToString } from "../../../utils.js";

class UsersContainer extends React.Component {

  constructor(users) {
    super();
    this.state = {
      users: users.users,
      eList: []
    }
    autoBind.react(this);
  }

  componentDidMount() {
    this.generateElements();
  }

  render() {
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Users</h4></li>
        { this.state.eList }
      </ul>
    );
  }

  generateElements() {
    var teList = [];
    for (var user of this.state.users) {
      teList.push(this.UserRow(user));
    }
    this.setState((state) => {
      return { users: state.users, eList: teList }
    });
  }

  verifyUser(username) {
    sendVerifyUser(username, () => {
      for (var [index, value] of this.state.users.entries()) {
        if (username === value.username) {
          this.setState((state) => {
            var us = state.users.slice(0);
            us[index].verified = true;
            return { users: us, eList: state.eList }
          });
        }
      }
      this.generateElements();
    });
  }

  UserRow(user) {
    return (
      <li className="collection-item" key={ user.username }>
        { userToString(user) }
        { !user.verified &&
          <a className="secondary-content cursor-pointer" onClick={() => this.verifyUser(user.username)}>
            <i className="material-icons">check</i>
          </a>
        }
      </li>
    );
  }

}

export default UsersContainer;
