import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from './Camera';
import App from './App.js';

class NavigationBar extends Component {
  render() {
    return (

      <div>
        <ul>
          <li><Link to='/'>Home </Link></li>
          <li><Link to='/nearby'>App </Link></li>
          <li><Link to='/camera'>Camera </Link></li>
        </ul>

      </div>


     
    );
  }
}

export default NavigationBar;
