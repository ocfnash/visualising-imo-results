import React, { Component } from 'react';

const tickLength = 5;
const labelOffset = 45;

class Xaxis extends Component {
  getLabelStart() {
    const {x1, x2, label} = this.props;
    return (x2 + x1)/2 - label.length*4; // TODO Fix this hack,
  }
  render() {
    const {ticks, x1, x2, y, label} = this.props;
    const elements = [
      <line fill="none" x1={x1} y1={y} x2={x2} y2={y} key="x-axis" />,
      <text className="axis-label" x={this.getLabelStart()} y={y + labelOffset} stroke="none" key="x-axis-label" >{label}</text>
    ];
    ticks.forEach(
      tick => {
        elements.push(<line fill="none" x1={tick.X} y1={y} x2={tick.X} y2={y+tickLength} key={`x-axis-tick-${tick.Value}`} />);
        elements.push(<text className="axis-tick-label" stroke="none" x={tick.X-5} y={y+25} key={`x-axis-tick-label-${tick.Value}`}>{tick.Value}</text>);
      }
    );
    return (<g className="axis-root">{elements}</g>);
  }
}

export default Xaxis;
