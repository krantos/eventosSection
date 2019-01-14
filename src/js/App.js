import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "../style/pizarra.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {eventos: []};
  }


  componentDidMount() {
  }

  getAllDomElements() {
    this.setState({eventos: [...document.querySelectorAll('.evento')]});
    console.log(this.state.eventos);
  }

  createSlide(elem) {
    const slideElement = new Image();
    
    slideElement.onload = () => {
      console.log("image loaded ", elem.id);
    }

    slideElement.src = elem.image;

    return(
      <div className="evento" key={elem.id}>
        <a href={elem.link}>
          <img src={elem.image} alt={elem.title}/>
          <h2>{elem.title}</h2>
        </a>
      </div>
    );
}

  addButtons() {
    return(
      <div className="buttons">
        <button onClick={this.previousSlide} className="previous">&larr;</button>
        <button onClick={this.toggleAutoslide} className="stop">&#9658;</button>
        <button onClick={this.nextSlide} className="next">&rarr;</button>
      </div>
    );
  }

  previousSlide(ev) {
    
  }

  nextSlide(ev) {

  }

  toggleAutoSlide(ev) {

  }

  render() {
    return(
      <div className="App">
        <h1> slider </h1>
        <div className="pizarra">
          <div className="ventana">
          {this.props.objData.map(element => 
              this.createSlide(element)
            )}
          </div>
        </div>
          {this.addButtons()}
      </div>
    ); 
  }
}

export default hot(module) (App);