// @flow
import React, { Component } from 'react';
import Xaxis from './x-axis.js';
import Yaxis from './y-axis.js';

const MAX_ENTROPY = 2.0794;
const MAX_SCORE = 7;

const maxX = 490;
const scaleX = maxX / MAX_SCORE;

const maxY = 350;
const scaleY = maxY / MAX_ENTROPY;

const xAxisExtension = 30;
const xOffset = 110;
const gapXaxis = 15;
const gapYaxis = 55;

const plot = (x, y) => [xOffset + scaleX * x, maxY - scaleY * y];
const radius = 3;


class ScatterChart extends Component {
  scaleContainerClassNames(key) {
    var problem = key.split('-')[1];
    var s = `scatter-chart-point-scale-container scatter-chart-point-problem-${problem}`;
    if (key === this.props.selectedProblem)
      s += " scatter-chart-selected-point";
    return s;
  }
  dataPointClicked(key) {
    this.props.dataPointClicked(key);
  }
  getYAxisTicks() {
    return [0, 0.5, 1, 1.5, 2].map(
      y => {
        return {
          Value: y,
          Y: maxY - y*scaleY,
        };
      }
    );
  }
  getXaxisTicks() {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(
      x => {
        return {
          Value: x,
          X: xOffset + scaleX * x
        }
      }
    );
  }
  renderPoint(stat, key) {
    const P = plot(stat[0], stat[1]);
    // The ridiculous pair of <g> elements below is to work around
    // transform-origin not working for SVG <circle> elements in Firefox.
    return (
      <g transform={`translate(${P[0]}, ${P[1]})`} key={key}>
        <g className={this.scaleContainerClassNames(key)}>
          <circle cx="0" cy="0" r={radius}
            onClick={() => this.dataPointClicked(key)}
            className="scatter-chart-point"/>
        </g>
      </g>
    );
  }
  getRenderedPointsWithSelectedPointLast() {
    var renderedPoints = [];
    Object.keys(this.props.stats).forEach(k => {
      if (k !== this.props.selectedProblem) {
        renderedPoints.push(this.renderPoint(this.props.stats[k], k))
      }
    });
    var k = this.props.selectedProblem;
    renderedPoints.push(this.renderPoint(this.props.stats[k], k));
    return renderedPoints;
  }
  render() {
    return (
      <div className="scatter-chart-container">
        <svg className="scatter-chart-svg">
          <Xaxis
            ticks={this.getXaxisTicks()}
            x1={xOffset - xAxisExtension}
            x2={xOffset + maxX + xAxisExtension}
            y={maxY + gapXaxis}
            label="Mean" />
          <Yaxis
            ticks={this.getYAxisTicks()}
            x={xOffset - gapYaxis}
            y1={maxY}
            y2={0}
            label="Entropy" />
          {this.getRenderedPointsWithSelectedPointLast()}
        </svg>
      </div>
    );
  }
}

export default ScatterChart;
