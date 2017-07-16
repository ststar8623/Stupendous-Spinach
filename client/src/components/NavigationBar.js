import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Home</a>
          </div>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/logout">Sign out</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;