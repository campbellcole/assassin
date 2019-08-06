import React from "react";
import ReactDOM from "react-dom";

class StandingsContainer extends React.Component {

  constructor(standings) {
    super();
    console.log(standings);
    this.standings = standings.standings;
    this.gameStatus = this.standings.in_progress ? "The game has started." : "The game has not yet started.";
  }

  render() {
    return (
      <div className="container">
        <h3>{ this.gameStatus }</h3>
      </div>
    );
  }
}

export default StandingsContainer;
