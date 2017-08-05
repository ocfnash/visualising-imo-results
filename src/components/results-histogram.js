// @flow
import React, { Component } from 'react';
import Xaxis from './x-axis.js';
import Yaxis from './y-axis.js';

const MAX_CONTESTANTS = 650;
const MAX_SCORE = 7;

const barWidth = 35;
const gapWidth = 10;
const maxX = (gapWidth + barWidth) * (1 + MAX_SCORE) - gapWidth;
const scaleX = gapWidth + barWidth;

const maxY = 350;
const scaleY = maxY / MAX_CONTESTANTS;

const xAxisExtension = 30;
const xOffset = 110;
const gapXaxis = 15;
const gapYaxis = 55;

const plot = (x, y) => [xOffset + scaleX * x, maxY - scaleY * y];

class ResultsHistogram extends Component {
  getYAxisTicks() {
    return [0, 100, 200, 300, 400, 500, 600].map(
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
          X: xOffset + barWidth/2 + scaleX * x
        };
      }
    );
  }
  renderBar(count, score) {
    const P = plot(score, count);
    return (
      <rect className="results-histogram-bar"
        x={P[0]}
        y={P[1]}
        width={barWidth}
        height={maxY - P[1]}
        key={score} />
    );
  }
  render() {
    const renderedBars = this.props.scoreCounts.map(
      (count, score) => this.renderBar(count, score));
    return (
      <div className="results-histogram-container">
        <svg className="results-histogram-svg">
          <Xaxis
            ticks={this.getXaxisTicks()}
            x1={xOffset - xAxisExtension}
            x2={xOffset + maxX + xAxisExtension}
            y={maxY + gapXaxis}
            label="Score" />
          <Yaxis
            ticks={this.getYAxisTicks()}
            x={xOffset - gapYaxis}
            y1={maxY}
            y2={0}
            label="Number of contestants" />
          {renderedBars}
        </svg>
      </div>
    );
  }
}

export default ResultsHistogram;
