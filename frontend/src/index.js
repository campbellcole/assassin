import React from "react";
import ReactDOM from "react-dom";

import RootContainer from "./js/components/RootContainer.jsx";

ReactDOM.render(<RootContainer />, document.getElementById("root"));

document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
});
