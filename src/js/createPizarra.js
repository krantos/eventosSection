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

function getDataList() {
  return new Promise((resolve) => {
    fetch('https://picsum.photos/list')
      .then(function (response) {
        resolve(response.json());
      });
  });
}

getDataList()
  .then(list => {
    console.log(list);
    return createPizarra();
  })
  .then(pizz => {
    document.querySelector('.mySlider').innerHTML = pizz;
    init();
    addListeners();
    loadFirstActive();
    toggleAutoSlide();
  }) 
  .catch(err => {
    console.error(err);
  });

function createPizarra(data = undefined) {
  console.log(objData.length);
  let pizarra = `
    <div class="pizarra">
    <div class="ventana">`;
  for (elem of objData) {
    pizarra += createEvento(elem);
  }
  pizarra += '</div></div>';

  pizarra += `<div class="buttons">
        <button class="previous">&larr;</button>
        <button class="stop">&#9658;</button>
        <button class="next">&rarr;</button>
      </div>`;
  return  new Promise(resolve => {
    resolve(pizarra);
  });
}

function createEvento(elem) {
  let htmlEvento = `
    <div class="evento" id="${elem.id}">
          <a href="${elem.link}">
            <img src="${elem.image}" alt="${elem.alt}">
            <h2 class="evento_title">${elem.title}</h2>
          </a>
        </div>
  `;
  return htmlEvento;
}