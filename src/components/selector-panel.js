import React, { Component } from 'react';

class SelectorPanel extends Component {
  problemSelected(i) {
    this.props.problemSelected(i);
  }
  problemCellClassNames(year, i) {
    var s = `selector-panel-problem scatter-chart-point-problem-${i}`;
    if (`${year}-${i}` === this.props.selectedProblem)
      s += " selector-panel-problem-selected";
    return s;
  }
  renderRow(i) {
    const row = this.props.years.map(year =>
      (
        <td className={this.problemCellClassNames(year, i)}
          onClick={() => this.props.cellClicked(`${year}-${i}`)}
          key={year} >
        </td>
      )
    );
    return (
      <tr className={`selector-panel-row-${i}`}>
        <td className="selector-panel-row-label">{i}</td>
        {row}
      </tr>
    );
  }
  renderColumnHeadings() {
    const years = this.props.years.map(year =>
      (
        <td className="selector-panel-column-heading" key={year}>
          {"'" + year.toString().slice(2,4)}
        </td>
      )
    );
    return (
      <tr className="selector-panel-column-headings">
        <td className="selector-panel-spacer"></td>
        {years}
      </tr>
    );
  }
  render() {
    return (
      <table className="selector-panel-container">
        <tbody>
          {this.renderColumnHeadings()}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
          {this.renderRow(6)}
        </tbody>
      </table>
    );
  }
}

export default SelectorPanel;
