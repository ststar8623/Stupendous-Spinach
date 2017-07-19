import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from './Camera';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import App from './App.js';

class NavigationBar extends Component {
  render() {
    return (
      <Navbar fixedBottom className='row'>
        <NavItem style={{ listStyleType: 'none' }}>
          <Camera />
        </NavItem> 
        <NavItem className="fa fa-compass fa-2x col-sm-4 text-center" aria-hidden="true">
          <Link to='/nearby'></Link>
        </NavItem>
        <NavItem className="fa fa-heart fa-2x col-sm-4 text-center" aria-hidden="true">
          <Link to='/likes'></Link> 
        </NavItem> 
      </Navbar>
    );
  }
}

export default NavigationBar;
