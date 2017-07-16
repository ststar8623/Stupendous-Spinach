import React, { Component } from 'react';
import { Link } from 'react-router';

import NavigationBar from './NavigationBar';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <h1>
          <Link to='/'>FlashBack</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;