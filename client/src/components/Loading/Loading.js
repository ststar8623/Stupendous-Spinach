import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="contain">
        <svg style={{height: 80, width: 210}}>
          <ellipse style={{cx: 25, cy: 20, fill: "none", rx: 10, ry: 10}}></ellipse>
        </svg>
        <svg style={{height: 80, width: 210}}>
          <ellipse style={{cx: 62.5, cy: 20, fill: "none", rx: 10, ry: 10}}></ellipse>
        </svg>
        <svg style={{height: 80, width: 210}}>
          <ellipse style={{cx: 100 ,cy: 20, fill: "none", rx: 10, ry: 10}}></ellipse>
        </svg>
        <svg style={{height: 80, width: 210}}>
          <ellipse style={{cx: 137.5, cy: 20, fill: "none", rx: 10, ry: 10}}></ellipse>
        </svg>
        <svg style={{height: 80, width: 210}}>
          <ellipse style={{cx: 175, cy: 20, fill: "none", rx: 10, ry: 10}}></ellipse>
        </svg>
      </div>
    );
  }
}

export default Loading;