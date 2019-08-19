import React from 'react';

import autoBind from 'auto-bind';

import { getJSON } from '../utils';

// eslint-disable-next-line no-unused-vars
import css from '../../css/Root.css';

import PageAdmin from './pages/PageAdmin.jsx';
import PageDashboard from './pages/PageDashboard.jsx';
import PageHome from './pages/PageHome.jsx';
import PageLogin from './pages/PageLogin.jsx';
import PageRegister from './pages/PageRegister.jsx';
import PageStandings from './pages/PageStandings.jsx';

import HeaderContainer from './HeaderContainer.jsx';
import SideNavContainer from './SideNavContainer.jsx';
import FooterContainer from './FooterContainer.jsx';

const pages = [
  <PageHome />,
  <PageRegister />,
  <PageLogin />,
  <PageDashboard />,
  <PageStandings />,
  <PageAdmin />,
];

class RootContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      status: {
        username: undefined,
        level: -1,
        loggedIn: false,
      },
    };
    autoBind.react(this);
  }

  componentDidMount() {
    getJSON('login/lstat', '', (res) => {
      this.setState((state) => ({
        currentPage: state.currentPage,
        status: res,
      }));
    });
  }

  loadPage(index) {
    this.setState((state) => ({
      currentPage: index,
      status: state.status,
    }));
  }

  render() {
    const { currentPage, status } = this.state;
    return (
      <div className="content">
        <HeaderContainer
          currentPage={currentPage}
          status={status}
          clickHandler={(ind) => this.loadPage(ind)}
        />
        <SideNavContainer status={status} clickHandler={(ind) => this.loadPage(ind)} />
        <div id="page">
          {pages[currentPage]}
        </div>
        {FooterContainer}
      </div>
    );
  }
}

export default RootContainer;
