const eventos = [...document.querySelectorAll('.evento')];
const images = [...document.querySelectorAll('img')];
const totalEventos = eventos.length;
const nextEventBtn = document.querySelector('.next');
const previousEventBtn = document.querySelector('.previous');
const ventana = document.querySelector('.ventana');
const pizarra = document.querySelector('.pizarra');
const stopBtn = document.querySelector('.stop');
const active = 'active';
const slideTime = 3500;
const pause = '||';
const play = '&#9658;';
const next = 'next';
let id;

function loadFirstActive() {
  eventos[0].classList.toggle(active);
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


loadFirstActive();
addListeners();
toggleAutoSlide();