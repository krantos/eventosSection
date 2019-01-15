import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "../style/pizarra.css";

class PathEventos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      status: false,
    };
    this.loadImages = this.loadImages.bind(this);
  }


  componentDidMount() {}

  loadImages(e) {
   this.setState({
     images = e.target.files,
     status: true,
   });
  }

  render() {
    const {status, images} = this.state;
    if( !status ) {

      return(
        <div className="App">
          <input id="inputi" type="file" multiple name="images" accept="image/*" onChange={this.loadImages}/>
        </div>
      );

    } else {
      return(  
        <div id="preview">
          <canvas id="canvas">
          </canvas>
          <div id="resized">
            {images.map((image,index) => <LoadPreview key={index} image={image}/> )}
          </div>
      </div>
      );

    } 
  }
}

function LoadPreview ({image}) {

   const resized = document.getElementById('resized');
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    for (const i of e.target.files) { 
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        ctx.fillStyle = '#fff'; /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let image = new Image();

        image.onload = function () {

          canvas.width = 645;
          canvas.height = 430;
          ctx.fillStyle = '#fff'; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const nw = image.naturalWidth;
          const nh = image.naturalHeight;
          let h = canvas.height;
          let w = canvas.width;
          if (nw / nh < w / h) {
            w = h * nw / nh;
          } else {
            h = w * nh / nw;
          }
          // canvas.width = w;
          // canvas.height = h;
          ctx.fillStyle = '#fff';
          const px = (canvas.width - w) / 2;
          const py = (canvas.height - h) / 2;
          ctx.drawImage(image, px, py, w, h);
          let resizedImage = new Image();
          let data = canvas.toDataURL('image/jpeg', 0.85);
          resizedImage.src = data;
          resized.appendChild(resizedImage);
        };
        image.src = this.result;
      }, false);
      reader.readAsDataURL(i);

    }
}

export default hot(module)(PathEventos);