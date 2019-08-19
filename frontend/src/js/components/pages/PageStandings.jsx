import React from 'react';
import ReactDOM from 'react-dom';

import StandingsContainer from './StandingsContainer.jsx';

import { getJSON } from '../../utils';

class PageStandings extends React.Component {
  componentDidMount() {
    getJSON('game', '', (res) => {
      const bar = document.getElementById('progbar');
      const p = bar.parentNode;
      p.removeChild(bar);
      const el = document.getElementById('standings');
      ReactDOM.render(<StandingsContainer standings={res} />, el);
      el.style.display = 'block';
    });
  }

  render() {
    return (
      <div className="container center-align">
        <h2>Standings</h2>
        <div className="progress" id="progbar">
          <div className="indeterminate" />
        </div>
        <div id="standings" />
      </div>
    );
  }
}

export default PageStandings;
