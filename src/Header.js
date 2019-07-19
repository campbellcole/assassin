import React from 'react';
import './Header.css'

function HeaderItem(props) {
  function click(e) {
    e.preventDefault();
  }
  return (
    <li class={props.active ? "active" : ""}>
    <a href="#" onClick={click}>
    <span>{props.name}</span>
    </a>
    </li>
  );
}

function Header() {
  return (
    <div id="header">
      <ul>
        <HeaderItem name="Home" active={true} />
        <HeaderItem name="Register" active={false} />
        <HeaderItem name="Standings" active={false} />
      </ul>
    </div>
  );
}

export default Header;
