import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from './Camera';

class NavigationBar extends Component {
  render() {
    return (

      // <Navbar fixedBottom className='row'>
      //   <NavItem eventKey={1} style={{ listStyleType: 'none' }}>
      //     <Camera />
      //   </NavItem> 
      //   <NavItem eventKey={2} href="/nearby" className="fa fa-compass fa-2x col-sm-4 text-center" aria-hidden="true">
      //     <Link to='nearby'></Link>
      //   </NavItem> 
      //   <NavItem eventKey={3} className="fa fa-heart fa-2x col-sm-4 text-center" aria-hidden="true">
      //     <Link to='likes'></Link> 
      //   </NavItem> 
      // </Navbar>
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <Camera />
          <Link to="/nearby"><div className="fa fa-compass fa-2x col-sm-4 text-center" aria-hidden="true" ></div></Link>
          <Link to="/commentsAndLikes"><div className="fa fa-heart fa-2x col-sm-4 text-center" aria-hidden="true"></div></Link>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
