import React from "react";
import autoBind from "auto-bind";

import { sendVerifyUser, sendDeverifyUser, userToString } from "../../utils.js";

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

  deverifyUser(username) {
    sendDeverifyUser(username, () => {
      for (var [index, value] of this.state.users.entries()) {
        if (username === value.username) {
          this.setState((state) => {
            var us = state.users.slice(0);
            us[index].verified = false;
            return { users: us, eList: state.eList }
          });
        }
      }
      this.generateElements();
    });
  }

  promoteUser(username) {
    // TODO: implement
  }

  demoteUser(username) {
    // TODO: implement
  }

  UserRow(user) {
    return (
      <li className="collection-item" key={ user.username }>
        { userToString(user) }
        { user.perm === 0 &&
          <a className="secondary-content cursor-pointer" onClick={() => this.promoteUser(user.username)}>
            <i className="material-icons green-text">thumbs_up</i>
          </a>
        }
        { user.perm === 1 &&
          <a className="secondary-content cursor-pointer" onClick={() => this.demoteUser(user.username)}>
            <i className="material-icons green-text">thumbs_down</i>
          </a>
        }
        { user.verified &&
          <a className="secondary-content cursor-pointer" onClick={() => this.deverifyUser(user.username)}>
            <i className="material-icons red-text">clear</i>
          </a>
        }
        { !user.verified &&
          <a className="secondary-content cursor-pointer" onClick={() => this.verifyUser(user.username)}>
            <i className="material-icons green-text">check</i>
          </a>
        }
      </li>
    );
  }

}

export default UsersContainer;
