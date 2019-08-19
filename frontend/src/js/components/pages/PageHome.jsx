import React from 'react';

const PageHome = (
  <div className="container">
    <h2 className="center-align">Assassin</h2>
    <div className="row center-align">
      <div className="col s5">
        <div className="card grey darken-2">
          <div className="card-content white-text grey darken-1">
            <span className="card-title">Information</span>
            <p>
              <b>What is this?</b>
              <br />
                  This is a work in progress attempting to automate the game called assassin.
              <br />
              <b>When can I use it?</b>
              <br />
                  No idea... &quot;When it&apos;s ready&quot;.
            </p>
          </div>
        </div>
      </div>
      <div className="col s5 offset-s2">
        <div className="card grey darken-2">
          <div className="card-content white-text grey darken-1">
            <span className="card-title">Updates</span>
            <p>
              <b>19 July 2019</b>
              <br />
                  Initial website started.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageHome;
