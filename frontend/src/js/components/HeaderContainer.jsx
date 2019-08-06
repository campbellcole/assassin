import React from "react";
import ReactDOM from "react-dom";

class HeaderContainer extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { currentPage, clickHandler } = this.props;
    return (
      <nav className="grey darken-3">
        <div id="nav-wrapper">
          <a className="brand-logo">Assassin</a>
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <HeaderItem text="Home" active={ currentPage == 0 ? true : false } clickHandler={() => clickHandler(0) } />
            <HeaderItem text="Register" active={ currentPage == 1 ? true : false } clickHandler={() => clickHandler(1) } />
            <HeaderItem text="Standings" active={ currentPage == 2 ? true : false } clickHandler={() => { clickHandler(2); } } />
            <HeaderItem text="Admin Panel" active={ currentPage == 3 ? true : false } clickHandler={() => { clickHandler(3); } } />
          </ul>
        </div>
      </nav>
    );
  }

}

const HeaderItem = ({ text, active, clickHandler }) => (
  <li className={ active ? "active" : "" }>
    <a onClick={() => clickHandler() }>
      { text }
    </a>
  </li>
);

export default HeaderContainer;
export { HeaderItem };
