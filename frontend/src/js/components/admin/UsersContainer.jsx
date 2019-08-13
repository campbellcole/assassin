import React from "react";
import autoBind from "auto-bind";

import { sendVerifyUser, sendDeverifyUser, sendPromoteUser, sendDemoteUser, userToString } from "../../utils.js";

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
      var teList = [];
      this.setState((state) => {
        for (var user of state.users) {
          teList.push(this.UserRow(user));
        }
        return { users: state.users, eList: teList, selectedUsers: state.selectedUsers }
      })
      this.wasElems = true;
    } else this.wasElems = false;

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
    this.setState((state) => {
      for (var user of state.users) {
        teList.push(this.UserRow(user));
      }
      return { users: state.users, eList: teList, selectedUsers: state.selectedUsers }
    })
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
    console.log(this.state.selectedUsers.indexOf(username));
    return (-1 !== this.state.selectedUsers.indexOf(username));
  }

  _setUserValue(username, key, value) {
    for (var [index, value] of this.state.users.entries()) {
      if (username === value.username) {
        this.setState((state) => {
          var us = state.users.slice(0);
          us[index][key] = value;
          return { users: us, eList: state.eList, selectedUsers: state.selectedUsers }
        });
      }
    }
  }

  UserRow(user) {
    return (
      <li className="collection-item" key={ user.username }>
        { userToString(user) }
        <a className="secondary-content cursor-pointer" onClick={ () => this.toggleUser(user.username) }>
          <i className="material-icons black-text">
            { (this.state.selectedUsers.indexOf(user.username) !== -1) &&
              "check_box"
            }
            { (this.state.selectedUsers.indexOf(user.username) === -1) &&
              "check_box_outline_blank"
            }
          </i>
        </a>
      </li>
    );
  }
  /*
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
  */
}

export default UsersContainer;
