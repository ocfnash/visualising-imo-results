// @flow
import React, { Component } from 'react';
import ScatterChart from './scatter-chart.js';
import ResultsHistogram from './results-histogram.js';
import SelectorPanel from './selector-panel.js';
import '../css/App.css';

const stats = require('../stats.json');
const years = Object.keys(stats).map(k => k.substring(0, 4)).reduce((p, c) => {
  if (p.indexOf(c) === -1) p.push(c);
  return p;
}, []);

class App extends Component {
  constructor(props) {
    super(props);
    this.selectProblemByKey = this.selectProblemByKey.bind(this);
    this.state = {
      selectedProblem: "1997-2",
    };
  }
  selectedYear() {
    return this.state.selectedProblem.slice(0, 4);
  }
  selectProblemByKey(key) {
    this.setState({selectedProblem: key});
  }
  render() {
    return (
      <div className="App">
        <ScatterChart
          stats={stats}
          dataPointClicked={this.selectProblemByKey}
          selectedProblem={this.state.selectedProblem} />
        <ResultsHistogram
          scoreCounts={stats[this.state.selectedProblem].slice(2)} />
        <SelectorPanel
          years={years}
          cellClicked={this.selectProblemByKey}
          selectedProblem={this.state.selectedProblem} />
        <iframe className="problem-pdf-iframe" title="ProblemSheet" src={`assets/${this.selectedYear()}-eng.pdf`} frameBorder="0"></iframe>
      </div>
    );
  }
}

export default App;
