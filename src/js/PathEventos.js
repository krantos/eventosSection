import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "../style/pizarra.css";

class PathEventos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      resized: false,
      status: false,
    };
    this.loadImages = this.loadImages.bind(this);
    this.loadIntoCanvas = this.loadIntoCanvas.bind(this);
  }


  componentDidMount() {}

  loadImages(e) {
    this.loadWithReaderImages(e.target.files);
  }

  loadWithReaderImages(images) {
    let promises = [...images].map(i => {
      const reader = new FileReader();
      const prom = new Promise((resolve, reject) => {
        reader.onload = function(){
          resolve(reader.result);
        }
      });
      reader.readAsDataURL(i);
      return prom;
    });
    Promise.all(promises).then(loadedImage => {
      this.resizeImage(loadedImage);
      this.setState({
        status: true
      })
    });
  }

  resizeImage(imageData) {
     const canvas = document.getElementById('canvas');
     const ctx = canvas.getContext('2d');
    let promises = imageData.map(i => {

      const imgHelper = new Image();

      const prom = new Promise(resolve => {

          imgHelper.onload = function() {
          canvas.width = 645;
          canvas.height = 430;
          ctx.fillStyle = '#fff'; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const nw = imgHelper.naturalWidth;
          const nh = imgHelper.naturalHeight;
          let h = canvas.height;
          let w = canvas.width;
          if (nw / nh < w / h) {
            w = h * nw / nh;
          } else {
            h = w * nh / nw;
          }
          const px = (canvas.width - w) / 2;
          const py = (canvas.height - h) / 2;
          ctx.drawImage(imgHelper, px, py, w, h);
          let data = canvas.toDataURL('image/jpeg', 0.85);
          resolve(data);
        }
      });

      imgHelper.src = i;
      return prom;
    });

    Promise.all(promises).then(imageResized => {
      this.setState({
        images: imageResized,
        resized: true,
        status: true,
      });
    })
  }

  loadIntoCanvas(ev) {
    const imgData = new Image();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    imgData.src = ev.target.src;
    canvas.width = 645;
    canvas.height = 430;
    ctx.drawImage(imgData, 0, 0, 645, 430);
    this.switchSelected(ev.target);
  }

  switchSelected(imgTarget) {
    const previousImg = document.querySelector('.selected');
    if(previousImg) {
      previousImg.classList.toggle('selected');
      imgTarget.classList.toggle('selected');
    } else {
      imgTarget.classList.toggle('selected');
    }
  }

  render() {
    const {status, resized, images} = this.state;
    if( !status && !resized ) {

      return(
        <div className="App">
          <input id="inputi" type="file" multiple name="images" accept="image/*" onChange={this.loadImages}/>
          <canvas id="canvas">
          </canvas>
        </div>
      );

    } 

    if(status && !resized) {
      return (
        <div className="waiting">
        </div>
      )
    }
    
    if(status && resized) {
      return(
        <div className="row">
        
        <div className="col align-self-center">
          <canvas  id="canvas">
          </canvas>
        </div>
        <div className="col-md-5">
          <div className="row">
          {images.map((image,index) => {
            return (
              <React.Fragment>
                <img className="col-sm-4 img-fluid" key={index} src={image} onLoad={this.imageElement} onClick={this.loadIntoCanvas}/> 
              </React.Fragment>
            );}
          )}
          </div>
        </div>
        </div>
      );

    } 
  }
}



// transformImages(images) {   
//         let promiseReader = [];
//     for(let i of images) {
//         let imageHelper = new Image();
//         let finalData = [];
//         const canvas = document.getElementById('canvas');
//         const ctx = canvas.getContext('2d');
//         const reader = new FileReader();
//         const rPromise = new Promise(resolve => {    
//           reader.onload = function() {
//             imageHelper.src = this.result;
//             canvas.width = 645;
//             canvas.height = 430;
//             ctx.fillStyle = '#fff'; /// set white fill style
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             const nw = imageHelper.naturalWidth;
//             const nh = imageHelper.naturalHeight;
//             let h = canvas.height;
//             let w = canvas.width;
//             if (nw / nh < w / h) {
//               w = h * nw / nh;
//             } else {
//               h = w * nh / nw;
//             }
//             const px = (canvas.width - w) / 2;
//             const py = (canvas.height - h) / 2;
//             ctx.drawImage(imageHelper, px, py, w, h);
//             let data = canvas.toDataURL('image/jpeg', 0.85);
//             // console.log("data ", data);
//             resolve(data);
//           }
//         });
//         promiseReader = [...promiseReader, rPromise];
//         reader.readAsDataURL(i);
//       }

//       Promise.all(promiseReader).then(data => 
//         finalData = [...finalData, data]
//       );
//   }

// function CreateImageElement({image}) {
//   console.log(image);
//   return (
    
//   );
// }

// function LoadPreview (imagesToTransform) {

//     const resized = document.getElementById('resized');
//     const canvas = document.getElementById('canvas');
//     let ctx = canvas.getContext('2d');
//     let finalData = [];

//     for (const i of imagesToTransform) { 
//       const reader = new FileReader();
//       reader.addEventListener('load', function () {
//         let image = new Image();

//         image.onload = function () {

//           canvas.width = 645;
//           canvas.height = 430;
//           ctx.fillStyle = '#fff'; /// set white fill style
//           ctx.fillRect(0, 0, canvas.width, canvas.height);
//           const nw = image.naturalWidth;
//           const nh = image.naturalHeight;
//           let h = canvas.height;
//           let w = canvas.width;
//           if (nw / nh < w / h) {
//             w = h * nw / nh;
//           } else {
//             h = w * nh / nw;
//           }
//           // canvas.width = w;
//           // canvas.height = h;
//           const px = (canvas.width - w) / 2;
//           const py = (canvas.height - h) / 2;
//           ctx.drawImage(image, px, py, w, h);
//           let data = canvas.toDataURL('image/jpeg', 0.85);
//           finalData = [...finalData, data];
//         };

//         image.src = this.result;

//       }, false);

//       reader.readAsDataURL(i);
//     }
// }

export default hot(module)(PathEventos);