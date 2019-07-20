import React from "react";

var PageRegister = (
  <div className="container row">
    <h2 className="center-align">Register</h2>
    <form className="col s12" method="POST" action="/register">
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
      <div className="row">
        <div className="input-field col s6">
          <input name="name" id="name" type="text" />
          <label for="name">Full name</label>
        </div>
        <div className="input-field col s6">
          <input name="email" id="email" type="email" />
          <label for="email">Email Address</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input name="phone" id="phone" type="text" />
          <label for="phone">Phone Number</label>
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

export default PageRegister;
