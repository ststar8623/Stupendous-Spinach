import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Home</a>
            <a className="navbar-brand" href="/nearby">Nearby Photos</a>
          </div>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/profile">Profile</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
