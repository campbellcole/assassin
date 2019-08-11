import React from "react";
import autoBind from "auto-bind";

import { sendVerifyUser, sendDeverifyUser, sendPromoteUser, sendDemoteUser, userToString } from "../../utils.js";

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
        <li className="collection-item" key="create">
          <b>Create User</b>
          <a className="secondary-content cursor-pointer" onClick={ () => this.openCreateUser() }>
            <i className="material-icons grey-text darken-3">add_circle</i>
          </a>
        </li>
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
      this._setUserValue(username, 'verified', true);
    });
  }

  deverifyUser(username) {
    sendDeverifyUser(username, () => {
      this._setUserValue(username, 'verified', false);
    });
  }

  promoteUser(username) {
    sendPromoteUser(username, () => {
      this._setUserValue(username, 'perm', 1);
    });
  }

  demoteUser(username) {
    sendDemoteUser(username, () => {
      this._setUserValue(username, 'perm', 0);
    });
  }

  openCreateUser() {
    alert("not yet implemented");
  }

  _setUserValue(username, key, value) {
    for (var [index, value] of this.state.users.entries()) {
      if (username === value.username) {
        this.setState((state) => {
          var us = state.users.slice(0);
          us[index][key] = value;
          return { users: us, eList: state.eList }
        });
      }
    }
    this.generateElements();
  }

  UserRow(user) {
    return (
      <li className="collection-item" key={ user.username }>
        { userToString(user) }
        <a className="secondary-content cursor-pointer">
          { user.perm === 0 &&
            <i className="material-icons green-text" onClick={ () => this.promoteUser(user.username) }>thumbs_up</i>
          }
          { user.perm === 1 &&
            <i className="material-icons green-text" onClick={ () => this.demoteUser(user.username) }>thumbs_down</i>
          }
          { user.verified &&
            <i className="material-icons red-text" onClick={ () => this.deverifyUser(user.username) }>clear</i>
          }
          { !user.verified &&
            <i className="material-icons green-text" onClick={ () => this.verifyUser(user.username) }>check</i>
          }
        </a>
      </li>
    );
  }

}

export default UsersContainer;
