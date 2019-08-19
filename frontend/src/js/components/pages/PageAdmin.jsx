import React from 'react';
import ReactDOM from 'react-dom';

import UsersContainer from '../admin/UsersContainer';
import TeamsContainer from '../admin/TeamsContainer';

import { getJSON } from '../../utils';

class PageAdmin extends React.Component {
  componentDidMount() {
    getJSON('admin/users', '', (res) => {
      ReactDOM.render(<UsersContainer users={res} />, document.getElementById('users'));
    });
    getJSON('admin/teams', '', (res) => {
      ReactDOM.render(<TeamsContainer teams={res} />, document.getElementById('teams'));
    });
  }

  render() {
    return (
      <div>
        <h3 className="center-align">Moderation Panel</h3>
        <div className="row">
          <div className="col s6 l4">
            <div id="users" />
          </div>
          <div className="col s6 l4">
            <div id="teams" />
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1 l6 offset-l3" id="selected-team" />
        </div>
      </div>
    );
  }
}

export default PageAdmin;
