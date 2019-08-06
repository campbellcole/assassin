import React from "react";
import autoBind from "auto-bind";

class UsersContainer extends React.Component {

  constructor(users) {
    super();
    this.users = users.users;
    autoBind.react(this);
    this.generateElements();
  }

  render() {
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Users</h4></li>
        { this.eList }
      </ul>
    );
  }

  generateElements() {
    this.eList = [];
    for (var user of this.users) {
      this.eList.push(this.UserRow(user));
    }
  }

  verifyUser(username) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (this.readyState == 4 && this.status == 200) {
        for (var [index, value] of this.users.entries()) {
          if (username === value.username) {
            this.users[index].verified = true;
          }
        }
        this.generateElements();
      }
    };
    req.open("GET", "/admin/verify/" + username, true);
    req.send();
  }

  UserRow(user) {
    return (
      <li className="collection-item" key={ user.username }>
        { user.name }
        { !user.verified &&
          <a className="secondary-content" onClick={() => this.verifyUser(user.username)}>
            <i className="material-icons">check</i>
          </a>
        }
      </li>
    );
  }

}

export default UsersContainer;
