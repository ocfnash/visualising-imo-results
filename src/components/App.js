import React, { Component } from 'react';
import ScatterChart from './scatter-chart.js';
import ResultsHistogram from './results-histogram.js';
import SelectorPanel from './selector-panel.js';
import ProblemDescription from './problem-description.js';
import '../css/App.css';

const problems = require('../problems.json');
const stats = require('../stats.json');
const years = Object.keys(stats).map(k => k.substring(0, 4)).reduce((p, c) => {
  if (p.indexOf(c) === -1) p.push(c);
  return p;
}, []);

class App extends Component {
  constructor(props) {
    super(props);
    this.selectProblemByKey = this.selectProblemByKey.bind(this);
    var key = window.location.search.slice(1);
    if (!problems.hasOwnProperty(key))
       key = "1997-2";
    this.state = {
      selectedProblem: key,
    };
    this.updateQueryString(key);
  }
  updateQueryString(key) {
    window.history.replaceState({}, null, 'index.html?' + key);
  }
  selectProblemByKey(key) {
    this.setState({selectedProblem: key});
    this.updateQueryString(key);
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
        <ProblemDescription
          problemId={this.state.selectedProblem}
          problemDescription={problems[this.state.selectedProblem]} />
      </div>
    );
  }
}

export default App;
