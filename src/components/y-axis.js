// @flow
import React, { Component } from 'react';

const tickLength = 5;
const labelOffset = 45;

class Yaxis extends Component {
  getLabelStart() {
    const {y1, y2, label} = this.props;
    return (y2 + y1)/2 + label.length*4; // TODO Fix this hack,
  }
  getTickXValue(tickX, tickValue) {
    // Major hack alert below :)
    return tickX - 15 - tickValue.toString().length*6;
  }
  render() {
    const {ticks, x, y1, y2, label} = this.props;
    const elements = [
      <line fill="none" x1={x} y1={y1} x2={x} y2={y2} key="y-axis" />,
      <text className="axis-label" stroke="none" transform={`translate(${x-labelOffset},${this.getLabelStart()})rotate(-90)`} key="y-axis-label" >{label}</text>
    ];
    ticks.forEach(
      tick => {
        elements.push(<line fill="none" x1={x-tickLength} y1={tick.Y} x2={x} y2={tick.Y} key={`y-axis-tick-${tick.Value}`} />);
        elements.push(<text className="axis-tick-label" stroke="none" x={this.getTickXValue(x, tick.Value)} y={tick.Y+5} key={`y-axis-tick-label-${tick.Value}`}>{tick.Value}</text>);
      }
    );
    return (<g className="axis-root">{elements}</g>);
  }
}

export default Yaxis;
