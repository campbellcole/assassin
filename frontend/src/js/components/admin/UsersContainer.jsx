import React from "react";
import autoBind from "auto-bind";

import { sendVerifyUser, sendDeverifyUser, sendPromoteUser, sendDemoteUser, sendRemoveUser, userToString } from "../../utils.js";

class UsersContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      eList: [],
      selectedUsers: []
    }
    autoBind.react(this);
  }

  componentDidMount() {
    this.generateElements();
  }

  componentDidUpdate() {
    if (!this.wasElems) {
      this.generateElements();
      this.wasElems = true;
    } else this.wasElems = false;
  }

  render() {
    return (
      <div>
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
        <h4>User Functions</h4>
        <h6>{ this.state.selectedUsers.length + " users selected" }</h6>
        <FunctionBox parent={ this }/>
      </div>
    );
  }

  generateElements() {
    this.setState((state) => {
      var teList = [];
      for (var user of state.users) {
        teList.push(<UserRow user={ user } parent={ this } />);
      }
      return { users: state.users, eList: teList, selectedUsers: state.selectedUsers }
    })
  }

  verifyUser(username) {
    sendVerifyUser(username, () => {
      this._setUserValue(username, 'verified', true);
    });
  }

  verifyUsers() {
    this._performMassUserFunction(this.verifyUser);
  }

  deverifyUser(username) {
    sendDeverifyUser(username, () => {
      this._setUserValue(username, 'verified', false);
    });
  }

  deverifyUsers() {
    this._performMassUserFunction(this.deverifyUser);
  }

  promoteUser(username) {
    sendPromoteUser(username, () => {
      this._setUserValue(username, 'perm', 1);
    });
  }

  promoteUsers() {
    this._performMassUserFunction(this.promoteUser);
  }

  demoteUser(username) {
    sendDemoteUser(username, () => {
      this._setUserValue(username, 'perm', 0);
    });
  }

  demoteUsers() {
    this._performMassUserFunction(this.demoteUser);
  }

  openCreateUser() {
    alert("not yet implemented");
  }

  removeUser() { // doesn't accept argument because i want to limit to 1 deletion at a time
    if (1 === this.state.selectedUsers.length) {
      sendRemoveUser(this.state.selectedUsers[0], () => {
        this.setState((state) => {
          var us = state.users.slice(0);
          for (var [index, v] of us.entries()) {
            if (v.username === this.state.selectedUsers[0]) {
              us.splice(index, 1);
            }
          }
          return { users: us, eList: state.eList, selectedUsers: state.selectedUsers }
        });
      });
    } else {
      M.toast({ html: "You can only remove 1 user at a time.", classes: "rounded red darken-2" });
    }
  }

  toggleUser(username) {
    var ind = this.state.selectedUsers.indexOf(username);
    if (-1 !== ind) {
      var t = this.state.selectedUsers.slice(0);
      t.splice(ind, 1);
      this.setState({ users: this.state.users, eList: this.state.eList, selectedUsers: t });
    } else  {
      var t = this.state.selectedUsers.slice(0);
      t.push(username);
      this.setState({ users: this.state.users, eList: this.state.eList, selectedUsers: t });
    }
  }

  isToggled(username) {
    return (-1 !== this.state.selectedUsers.indexOf(username));
  }

  _performMassUserFunction(action) {
    for (var username of this.state.selectedUsers) action(username);
  }

  _setUserValue(username, key, value) {
    for (var [index, v] of this.state.users.entries()) {
      if (username === v.username) {
        this.setState((state) => {
          var us = state.users.slice(0);
          us[index][key] = value;
          return { users: us, eList: state.eList, selectedUsers: state.selectedUsers }
        });
      }
    }
  }
}

class UserRow extends React.Component {

  constructor(props) {
    super(props);
    this.user = props.user;
    this.parent = props.parent;
  }

  render() {
    return (
      <li className="collection-item" key={ this.user.username }>
        { userToString(this.user) }
        <a className="secondary-content cursor-pointer" onClick={ () => this.parent.toggleUser(this.user.username) }>
          <i className="material-icons black-text">
            { (this.parent.state.selectedUsers.indexOf(this.user.username) !== -1) &&
              "check_box"
            }
            { (this.parent.state.selectedUsers.indexOf(this.user.username) === -1) &&
              "check_box_outline_blank"
            }
          </i>
        </a>
      </li>
    );
  }

}

class FunctionBox extends React.Component {

  constructor(props) {
    super(props);
    this.parent = props.parent;
  }

  render() {
    return (
      <table className="striped centered">
        <tbody>
          <tr>
            <td>
              <a className="cursor-pointer" onClick={ () => this.parent.verifyUsers() }>Verify</a>
            </td>
            <td>
              <a className="cursor-pointer" onClick={ () => this.parent.deverifyUsers() }>Deverify</a>
            </td>
            <td>
              <a className="cursor-pointer" onClick={ () => this.parent.promoteUsers() }>Promote</a>
            </td>
            <td>
              <a className="cursor-pointer" onClick={ () => this.parent.demoteUsers() }>Demote</a>
            </td>
            <td>
              <a className="cursor-pointer" onClick={ () => this.parent.removeUser() }>Remove</a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

}

export default UsersContainer;
