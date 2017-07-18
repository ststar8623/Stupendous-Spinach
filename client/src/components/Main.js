import React, { Component } from 'react';
import { Link } from 'react-router';

import NavigationBar from './NavigationBar';
import Camera from './Camera';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <h1>
          flashback
        </h1>
        {this.props.children}
      </div>
    );
  }
}

export default Main;