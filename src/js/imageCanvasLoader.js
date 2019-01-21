import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "../style/imageCanvasLoader.css";


const userWidth = 650;
const userHeight = 430;

class ImageCanvasLoader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			resized: false,
			status: false,
		};
		this.loadImages = this.loadImages.bind(this);
		this.loadIntoPreview = this.loadIntoPreview.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.addOneMoreImage = this.addOneMoreImage.bind(this);
	}

	loadImages(e) {
		this.loadWithReaderImages(e.target.files, true);
	}

	addOneMoreImage(e) {
		this.loadWithReaderImages(e.target.files, false);
	}

	loadWithReaderImages(images, multiple) {
		this.setState({
			resized: false,
		});
		let promises = [...images].map(i => {
			const reader = new FileReader();
			const prom = new Promise((resolve, reject) => {
				reader.onload = function () {
					resolve(reader.result);
				}
			});
			reader.readAsDataURL(i);
			return prom;
		});
		Promise.all(promises).then(loadedImage => {
			this.resizeImage(loadedImage, multiple);
			this.setState({
				status: true
			})
		});
	}

	resizeImage(imageData, multiple) {

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		let promises = imageData.map(i => {

			const imgHelper = new Image();

			const prom = new Promise(resolve => {

				imgHelper.onload = function () {
					canvas.width = userWidth;
					canvas.height = userHeight;
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
					canvas.width = w;
					canvas.height = h;
					const px = (canvas.width - w) / 2;
					const py = (canvas.height - h) / 2;
					ctx.drawImage(imgHelper, px, py, w, h);
					let data = canvas.toDataURL('image/jpeg', 0.88);
					resolve(data);
				}
			});

			imgHelper.src = i;
			return prom;
		});

		if (multiple) {
			Promise.all(promises).then(imageResized => {
				this.setState({
					images: imageResized,
					resized: true,
					status: true,
				});
			})
		} else {
			Promise.all(promises).then(imageResized => {
				const newImageArray = [...this.state.images, imageResized];
				this.setState({
					images: newImageArray,
					resized: true,
					status: true,
				});
			})
		}

	}

	loadIntoPreview(ev) {
		const imgPreview = document.getElementById('previewOverCanvas');
		imgPreview.src = ev.target.src;
	}

	switchSelected(imgTarget) {
		const previousImg = document.querySelector('.selected');
		if (previousImg) {
			previousImg.classList.toggle('selected');
			imgTarget.classList.toggle('selected');
		} else {
			imgTarget.classList.toggle('selected');
		}
	}

	removeImage(ev) {
		console.log(ev.target.name);
		let images = this.state.images;
		images.splice(ev.target.name, 1);
		this.setState({
			images: images
		});
	}

	render() {
		const { status, resized, images } = this.state;
		if (!status && !resized) {

			return (
				<div className="App">
					<input id="inputi" type="file" multiple name="images" accept="image/*" onChange={this.loadImages} />
					<canvas id="canvas">
					</canvas>
				</div>
			);

		}

		if (status && !resized) {
			return (
				<div className="waiting">
				...Loading
				</div>
			)
		}

		if (status && resized) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<img src="" alt="" id="previewOverCanvas"/>
						</div>
					</div>
					<div className="row">
								{images.map((image, index) => {
									return (
										<div className='col-2 imgContainer' key={index} >
											<img
												className="img-fluid"
												name={index}
												src={image}
												onLoad={this.imageElement}
												onClick={this.loadIntoPreview} />
											<button
												type="button"
												className="btn btn-danger"
												name={index}
												onClick={this.removeImage}> &#10008; </button>
										</div>
									);
								}
								)}
								<div className='col-2 imgContainer upload-btn-wrapper'>
									<button className="btn btn-primary">&#10010;</button>
									<input id="oneMoreInput" type="file" name="images" accept="image/*" onChange={this.addOneMoreImage} />
								</div>
							</div>
						</div>
			);
		}
	}
}

export default hot(module)(ImageCanvasLoader);