import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "../style/pizarra.css";

class PathEventos extends Component {

  constructor(props) {
    super(props);
    this.state = {eventos: []};
    this.loadPreview = this.loadPreview.bind(this);
  }


  componentDidMount() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 750;
    canvas.height = 500;
  }

  loadPreview(e) {
    console.log(e.target.files);
    const preview = document.getElementById('preview');
    const resized = document.getElementById('resized');
    const w = document.getElementById('canvas').width;
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 750;
    canvas.height = 500;

    for(const i of e.target.files) {

      const h = document.getElementById('canvas').width;
      const reader = new FileReader();

      reader.addEventListener('load', function() {
        ctx.fillStyle = '#fff';  /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let image = new Image();

        image.onload = function() {

          const nw = image.naturalWidth;
          const nh = image.naturalHeight;
          const aspect = nw / nh;
          const h = w / aspect;
          console.log(`height ${h}`);
          canvas.height = 500;
          ctx.fillStyle = '#fff';
          ctx.drawImage(image, 0, 0, 750, 500);
          let resizedImage = new Image();
          let data = canvas.toDataURL('image/png', 0.85);
          console.log(data);
          resizedImage.src = data; 
          resized.appendChild(resizedImage);

        };
        image.src = this.result;
        //preview.appendChild(image);
      }, false);

      reader.readAsDataURL(i);

    }
  }

  
  render() {
    return(
      <div className="App">
        <input id="inputi" type="file" multiple name="images" onChange={this.loadPreview}/>
        <div id="preview">

        </div>
        <canvas id="canvas">

        </canvas>
        <div id="resized">
        
        </div>
      </div>
    ); 
  }
}

export default hot(module) (PathEventos);