const eventos = [...document.querySelectorAll('.evento')];
const images = [...document.querySelectorAll('img')];
const totalEventos = eventos.length;
const nextEventBtn = document.querySelector('.next');
const previousEventBtn = document.querySelector('.previous');
const ventana = document.querySelector('.ventana');
const pizarra = document.querySelector('.pizarra');
const active = 'active';

function loadFirstActive() {
  eventos[0].classList.toggle(active);
}

function addListeners() {
  nextEventBtn.addEventListener('click', changeEvent);
  previousEventBtn.addEventListener('click', changeEvent);
  window.addEventListener('load', addHWToVentana);
}

function changeEvent(event) {
  const index = eventos.findIndex(event => {
    const classList = event.className;
    if (classList.includes(active)) {
      return true;
    }
    return false;
  });

  let change;
  if((event.target).className.includes('next')) {
    index == 0 ? change = eventos.length - 1 : change = index - 1;
  } else {
    index == eventos.length - 1 ? change = 0 : change = index + 1;
  }

  eventos[index].classList.toggle(active);
  eventos[change].classList.toggle(active);
}

function addHWToVentana() {
  const widths = [...images.map(img => img.offsetWidth)];
  const heights = [...eventos.map(event => event.offsetHeight)];
  const maxWidth =  ( Math.max([...widths])) ? Math.max([...widths]) : widths[0];
  
  const maxHeight = Math.max(...heights);
  console.log(maxWidth);
  eventos.map((ev, i) => ev.style.width = `${widths[i]}px`);

  ventana.style.height = `${maxHeight}px`;
  ventana.style.left = `-${maxWidth / 2 }px`;
  pizarra.style.width = `${maxWidth}px`;
}

loadFirstActive();
addListeners();
