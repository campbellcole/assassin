import React from "react";
import PropTypes from "prop-types";

const HeaderItem = ({ text, active, clickHandler }) => (
  <li className={ active ? "active" : "" }>
  <a onClick={() => clickHandler() }>
  { text }
  </a>
  </li>
);

HeaderItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired
}

export default HeaderItem;
