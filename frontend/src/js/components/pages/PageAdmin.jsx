import React from "react";

var PageAdmin = (
  <div className="container">
    <h4 className="center-align">This panel is not hidden in order to provide transparency.</h4>
    <div className="row">
      <div className="col s5">
        <div id="users"></div>
      </div>
      <div className="col s5 offset-s2">
        <div id="teams"></div>
      </div>
    </div>
    <div className="row">
      <div className="col s6 offset-s3" id="selected-team"></div>
    </div>
  </div>
);

export default PageAdmin;
