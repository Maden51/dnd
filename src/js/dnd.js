let grabbedEl = null;
let ghostEl = null;
let leftEl = null;
let topEl = null;

export default function grab(event) {
  event.preventDefault();
  if (!event.target.classList.contains('task')) {
    return;
  }
  grabbedEl = event.target;
  ghostEl = event.target.cloneNode(true);
  ghostEl.classList.add('grabbed');
  document.body.appendChild(ghostEl);
  leftEl = event.pageX - event.target.getBoundingClientRect().left;
  topEl = event.pageY - window.scrollY - event.target.getBoundingClientRect().top;
  ghostEl.style.left = `${event.target.getBoundingClientRect().left}px`;
  ghostEl.style.top = `${window.scrollY + event.target.getBoundingClientRect().top}px`;
  ghostEl.style.width = `${event.target.offsetWidth}px`;
  event.target.classList.add('shaded');
}

export function move(event) {
  event.preventDefault();
  if (!grabbedEl) {
    return;
  }
  const newPlace = document.elementFromPoint(event.clientX, event.clientY);
  if (newPlace.classList.contains('task')) {
    newPlace.closest('.column__content').insertBefore(grabbedEl, newPlace);
  } else if (newPlace.closest('.column__container')) {
    newPlace.closest('.column__container').querySelector('.column__content').appendChild(grabbedEl);
  }
  ghostEl.style.left = `${event.pageX - leftEl}px`;
  ghostEl.style.top = `${event.pageY - topEl}px`;
}

export function drop(event) {
  if (!grabbedEl) {
    return;
  }
  const newPlace = document.elementFromPoint(event.clientX, event.clientY);
  if (newPlace.classList.contains('column__container')) {
    newPlace.querySelector('.column__content').appendChild(grabbedEl);
  } else if (newPlace.classList.contains('task')) {
    newPlace.closest('.column__content').insertBefore(grabbedEl, newPlace);
  } else if (newPlace.closest('.column__container')) {
    newPlace.closest('.column__container').querySelector('.column__content').appendChild(grabbedEl);
  }
  document.body.removeChild(ghostEl);
  grabbedEl.classList.remove('shaded');
  grabbedEl = null;
  ghostEl = null;
}
