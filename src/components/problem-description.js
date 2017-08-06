// @flow
import React, { Component } from 'react';

class ProblemDescription extends Component {
  tryMathJax() {
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
  }
  componentDidMount() {
    this.tryMathJax();
  }
  componentDidUpdate(prevProps, prevState) {
    this.tryMathJax();
  }
  getProblemYear() {
    return this.props.problemId.slice(0, 4);
  }
  renderParagraphs() {
    return this.props.problemDescription.map(
      (paragraph, i) => {
        return (
          <div className="problem-description-paragraph" key={`problem-paragraph-${i}`}>
            {paragraph}
          </div>
        );
      }
    );
  }
  render() {
    return (
      <div className="problem-description-container">
        <div className="problem-id">
          {this.props.problemId}
          <span className="problem-pdf-link">
            &nbsp;[<a href={`assets/${this.getProblemYear()}-eng.pdf`} target="_blank">pdf</a>]
          </span>
        </div>
        <div className="problem-description>">
          {this.renderParagraphs()}
        </div>
      </div>
    )
  };
}

export default ProblemDescription;
