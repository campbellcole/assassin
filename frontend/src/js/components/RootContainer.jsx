import React from 'react';

import autoBind from 'auto-bind';

import { getJSON } from '../utils';

// eslint-disable-next-line no-unused-vars
import css from '../../css/Root.css';

import PageAdmin from './pages/PageAdmin';
import PageDashboard from './pages/PageDashboard';
import PageHome from './pages/PageHome';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageStandings from './pages/PageStandings';

import HeaderContainer from './HeaderContainer';
import SideNavContainer from './SideNavContainer';
import FooterContainer from './FooterContainer';

const pages = [PageAdmin, PageDashboard, PageHome, PageLogin, PageRegister, PageStandings];

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
    const CurrentPage = pages[currentPage];
    return (
      <div className="content">
        <HeaderContainer
          currentPage={currentPage}
          status={status}
          clickHandler={(ind) => this.loadPage(ind)}
        />
        <SideNavContainer status={status} clickHandler={(ind) => this.loadPage(ind)} />
        <div id="page">
          <CurrentPage />
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default RootContainer;
