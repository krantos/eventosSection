const eventos = [...document.querySelectorAll('.evento')];
const totalEventos = eventos.length;
const nextEventBtn = document.querySelector('.next');
const previousEventBtn = document.querySelector('.previous');
const ventana = document.querySelector('.ventana');
const active = 'active';
const image = document.querySelector('.evento img');

function loadFirstActive() {
  eventos[0].classList.toggle(active);
}

function addListeners() {
  nextEventBtn.addEventListener('click', changeEvent);
  previousEventBtn.addEventListener('click', changeEvent);
  image.addEventListener('load', addHeightToVentana);
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

function addHeightToVentana() {
    ventana.style.height = `${eventos[0].offsetHeight}px`;
}

loadFirstActive();
addListeners();
