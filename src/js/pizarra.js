let eventos;
let images;
let totalEventos;
let nextEventBtn;
let previousEventBtn;
let ventana;
let pizarra;
let stopBtn;
let active;
let slideTime;
let pause;
let play;
let next;
let id;

function init() {
  eventos = [...document.querySelectorAll('.evento')];
  images = [...document.querySelectorAll('img')];
  totalEventos = eventos.length;
  nextEventBtn = document.querySelector('.next');
  previousEventBtn = document.querySelector('.previous');
  ventana = document.querySelector('.ventana');
  pizarra = document.querySelector('.pizarra');
  stopBtn = document.querySelector('.stop');
  active = 'active';
  slideTime = 5000;
  pause = '||';
  play = '&#9658;';
  next = 'next';
}

function loadFirstActive() {
  eventos[0].classList.toggle(active);
  return true;
}

function addListeners() {
  nextEventBtn.addEventListener('click', changeEvent);
  previousEventBtn.addEventListener('click', changeEvent);
  stopBtn.addEventListener('click', toggleAutoSlide);
  window.addEventListener('load', addHWToVentana);
}

function getActiveIndex() {
  return eventos.findIndex(evento => {
    const classList = evento.className;
    if (classList.includes(active)) {
      return true;
    }
    return false;
  });
}

function nextSlide() {
  let index = getActiveIndex();
  let change;
  index == eventos.length - 1 ? change = 0 : change = index + 1;

  eventos[index].classList.toggle(active);
  eventos[change].classList.toggle(active);
}

function previousSlide() {
  let index = getActiveIndex();
  let change;
  index == 0 ? change = eventos.length - 1 : change = index - 1;
  eventos[index].classList.toggle(active);
  eventos[change].classList.toggle(active);
}

function changeEvent(ev) {
  if ((ev.target).className.includes(next)) {
    nextSlide();
  } else {
    previousSlide();
  }
}

function addHWToVentana() {
  const widths = [...eventos.map(ev => ev.offsetWidth)];
  const heights = [...eventos.map(event => event.offsetHeight)];
  const maxWidth = Math.max(...widths);
  const maxHeight = Math.max(...heights);
  console.log(eventos);
  eventos.map((ev, i) => ev.style.width = `${widths[i]}px`);
  ventana.style.height = `${maxHeight}px`;
  // ventana.style.left = `-${maxWidth / 2 }px`;
  pizarra.style.width = `${maxWidth}px`;
}

function toggleAutoSlide() {
  const text = stopBtn.textContent;
  if (text == pause) {
    clearInterval(id);
    id = 0;
    stopBtn.innerHTML = play;
  } else {
    id = setInterval(nextSlide, slideTime);
    stopBtn.innerHTML = pause;
  }
}