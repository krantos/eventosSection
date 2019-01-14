import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App.js";
import PathEventos from "./js/PathEventos";


const objData = [{
    id: 1,
    image: 'https://picsum.photos/550/250/?image=32',
    title: '14/12/2018 - Fiesta de la vendimia en Junin',
    link: 'https://www.google.com',
    alt: 'vendimia'
  },
  {
    id: 2,
    image: 'https://picsum.photos/550/250/?image=39',
    title: '15/12/2018 - Eventasdfasd er qweo 2',
    link: 'https://www.amazon.com',
    alt: 'amazon'
  },
  {
    id: 3,
    image: 'https://picsum.photos/550/250/?image=15',
    title: '29/12/2018 -  Algo en Junin',
    link: 'https://www.facebook.com',
    alt: 'algo'
  },
  {
    id: 4,
    image: 'https://picsum.photos/550/250/?image=44',
    title: 'Sin fecha todav&iacute;a',
    link: 'https://www.gmail.com',
    alt: 'algo'
  },
];

//ReactDOM.render(<App objData={objData} />, document.getElementById("root"));
ReactDOM.render(<PathEventos />, document.getElementById('eventosE'));