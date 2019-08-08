import React from "react";

var PageLogin = (
  <div className="container row">
    <h2 className="center-align">Log In</h2>
    <form className="col s12" method="POST" action="/login">
      <div className="row">
        <div className="input-field col s12">
          <input name="username" id="username" type="text" />
          <label for="username">Username</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input name="password" id="password" type="password" />
          <label for="password">Password</label>
        </div>
      </div>
      <div className="row center-align">
        <button className="btn waves-effect waves-light grey darken-4" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
);

export default PageLogin;
