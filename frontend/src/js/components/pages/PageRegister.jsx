import React from 'react';

const PageRegister = (
  <div className="container row">
    <h2 className="center-align">Register</h2>
    <form className="col s12" method="POST" action="/register">
      <div className="row">
        <div className="input-field col s12">
          <label htmlFor="username">
            Username
            <input name="username" id="username" type="text" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <label htmlFor="password">
            Password
            <input name="password" id="password" type="password" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <label htmlFor="name">
            Full Name
            <input name="name" id="name" type="text" />
          </label>
        </div>
        <div className="input-field col s6">
          <label htmlFor="email">
            Email Address
            <input name="email" id="email" type="email" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <label htmlFor="phone">
            Phone Number
            <input name="phone" id="phone" type="tel" />
          </label>
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
