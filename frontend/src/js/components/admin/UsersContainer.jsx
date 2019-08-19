import React from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';

import {
  sendVerifyUser, sendDeverifyUser, sendPromoteUser, sendDemoteUser, sendRemoveUser, userToString,
} from '../../utils';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      eList: [],
      selectedUsers: [],
    };
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

  generateElements() {
    this.setState((state) => {
      const teList = [];
      state.users.forEach((user) => {
        teList.push(<UserRow user={user} parent={this} />);
      });
      return { users: state.users, eList: teList, selectedUsers: state.selectedUsers };
    });
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

  // eslint-disable-next-line class-methods-use-this
  openCreateUser() {
  }

  removeUser(username) { // doesn't accept argument because i want to limit to 1 deletion at a time
    sendRemoveUser(username, () => {
      this.setState((state) => {
        let res = false;
        const us = state.users.slice(0);
        us.entries().forEach((user, index) => {
          if (user.username === username) {
            us.splice(index, 1);
            res = true;
          }
        });
        return { users: us, eList: state.eList, selectedUsers: res ? [] : state.selectedUsers };
      });
    });
  }

  toggleUser(username) {
    const { users, eList, selectedUsers } = this.state;
    const ind = selectedUsers.indexOf(username);
    if (ind !== -1) {
      const t = selectedUsers.slice(0);
      t.splice(ind, 1);
      this.setState({ users, eList, selectedUsers: t });
    } else {
      const t = selectedUsers.slice(0);
      t.push(username);
      this.setState({ users, eList, selectedUsers: t });
    }
  }

  isToggled(username) {
    const { selectedUsers } = this.state;
    return (selectedUsers.indexOf(username) !== -1);
  }

  _performMassUserFunction(action) {
    const { selectedUsers } = this.state;
    selectedUsers.forEach((username) => action(username));
  }

  _setUserValue(username, key, value) {
    const { users } = this.state;
    users.entries().forEach((user, index) => {
      if (username === user.username) {
        this.setState((state) => {
          const us = state.users.slice(0);
          us[index][key] = value;
          return { users: us, eList: state.eList, selectedUsers: state.selectedUsers };
        });
      }
    });
  }

  render() {
    const { eList, selectedUsers } = this.state;
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header"><h4>Users</h4></li>
          { eList }
          <li className="collection-item" key="create">
            <b>Create User</b>
            <a className="secondary-content cursor-pointer" role="button" tabIndex={0} onClick={() => this.openCreateUser()}>
              <i className="material-icons grey-text darken-3">add_circle</i>
            </a>
          </li>
        </ul>
        <h4>User Functions</h4>
        <h6>{ `${selectedUsers.length} users selected` }</h6>
        <FunctionBox parent={this} />
      </div>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const UserRow = ({ user, parent }) => (
  <li className="collection-item" key={user.username}>
    { userToString(user) }
    <a className="secondary-content cursor-pointer" role="button" tabIndex={0} onClick={() => parent.toggleUser(user.username)}>
      <i className="material-icons black-text">
        { (parent.state.selectedUsers.indexOf(user.username) !== -1)
              && 'check_box'}
        { (parent.state.selectedUsers.indexOf(user.username) === -1)
              && 'check_box_outline_blank'}
      </i>
    </a>
  </li>
);

UserRow.propTypes = {
  user: PropTypes.node.isRequired,
  parent: PropTypes.node.isRequired,
};

const FunctionBox = ({ parent }) => (
  <table className="striped centered">
    <tbody>
      <tr>
        <td>
          <a className="cursor-pointer" role="button" tabIndex={0} onClick={() => parent.verifyUsers()}>Verify</a>
        </td>
        <td>
          <a className="cursor-pointer" role="button" tabIndex={0} onClick={() => parent.deverifyUsers()}>Deverify</a>
        </td>
        <td>
          <a className="cursor-pointer" role="button" tabIndex={0} onClick={() => parent.promoteUsers()}>Promote</a>
        </td>
        <td>
          <a className="cursor-pointer" role="button" tabIndex={0} onClick={() => parent.demoteUsers()}>Demote</a>
        </td>
        <td>
          <a className="cursor-pointer" role="button" tabIndex={0} onClick={() => parent.removeUser()}>Remove</a>
        </td>
      </tr>
    </tbody>
  </table>
);

FunctionBox.propTypes = {
  parent: PropTypes.node.isRequired,
};

export default UsersContainer;
