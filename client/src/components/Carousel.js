
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
// Change the slide transition type.
var transition = 'scale';
// try translate, scale, blur, rotate

var appearTransition = true;


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      counter: props.index
    };    
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }
  
  prevSlide() {
    var prevSlide = this.state.counter - 1 < 0 ? this.props.photos.length - 1 : this.state.counter - 1;
    this.setState({
      counter: prevSlide
    });  
  }
  
  nextSlide() {
    var nextSlide = this.state.counter + 1 < this.props.photos.length ? this.state.counter + 1 : 0;
    this.setState({
      counter: nextSlide
    });
  }
  
  render() {
    var style = {
      backgroundImage: 'url(' + this.props.photos[this.state.counter].url + ')'
    };
    return (
      <div className="carousel">
        <div className='delete' onClick={()=>{ this.props.mapView(true); }}> &times; </div>
        <div className="carousel__prev" onClick={this.prevSlide}>◀︎</div>
        <div className="carousel__next" onClick={this.nextSlide}>▶︎</div>
        <CSSTransitionGroup transitionName={transition} transitionEnterTimeout={500} transitionLeaveTimeout={500} component="div" className="carousel__slide" transitionAppear={appearTransition} transitionAppearTimeout={1000}>
          <div style={style} key={this.state.counter}></div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Carousel;