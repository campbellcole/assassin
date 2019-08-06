import React from "react";
import ReactDOM from "react-dom";

class SideNavContainer extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { clickHandler } = this.props;
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <SideNavItem text="Home" clickHandler={()=>clickHandler(0)} />
          <SideNavItem text="Register" clickHandler={()=>clickHandler(1)} />
          <SideNavItem text="Standings" clickHandler={()=>clickHandler(2)} />
          <SideNavItem text="Admin Panel" clickHandler={()=>clickHandler(3)} />
        </ul>
      </div>
    );
  }

}

const SideNavItem = ({ text, clickHandler }) => (
  <li>
    <a className="sidenav-close" onClick={ () => clickHandler() }>
      { text }
    </a>
  </li>
);

export default SideNavContainer;
export { SideNavItem };
