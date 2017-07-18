import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from './Camera';
import App from './App.js';

class NavigationBar extends Component {
  render() {
    return (

      <nav className="navbar navbar-default navbar-fixed-bottom">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/nearby'>Nearby</Link></li>
          <li><Link to='/camera'>Camera</Link></li>
          <li><Link to='/likes'>Likes</Link></li>
        </ul>
      </nav>


     
    );
  }
}

export default NavigationBar;
