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
  }

  loadPreview(e) {
    console.log(e.target.files);
    const resized = document.getElementById('resized');
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    for(const i of e.target.files) {
      const reader = new FileReader();
      reader.addEventListener('load', function() {
        ctx.fillStyle = '#fff';  /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let image = new Image();

        image.onload = function() {
					canvas.width = 645;
					canvas.height = 430;
          const nw = image.naturalWidth;
					const nh = image.naturalHeight;
					let h = canvas.height;
					let w = canvas.width;

					if( nw >= w && nh >= h && nw != nh) {
						if( nw - w < nh - h) {
							w = h * nw / nh;
						} else {
							h = w * nh / nw;
						}
					}
					
					if( nw < w && nh >= h) {
						console.log(`nw ${nw} / $nh ${nh}`);
						// if( w - nw > nh - h) {
							w = h * nw / nh;
						// } else {
						// 	h = w * nh / nw;
						// }
					}

					if( nw >= w && nh < h) {
						// if( w - nw < h - nh) {
						// 	w = h * nw / nh;
						// } else {
							h = w * nh / nw;
						// }
					}
					
					if( nw < w && nh < h && nw != nh ) {
						if( w - nw > h - nh) {
							w = h * nw / nh;
						} else {
							h = w * nh / nw;
						}
					}

					canvas.width = w;
					canvas.height = h;
					console.log(`w = ${w} / h = ${h}`);
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