import addTask from './addTask';
import grab, { drop, move } from './dnd';
import save, { load } from './localStorage';

const container = document.querySelector('.container');
container.addEventListener('mousedown', grab);
container.addEventListener('mousemove', move);
container.addEventListener('mouseup', drop);

function closeCardCreating(column) {
  column.removeChild(column.querySelector('.cardText'));
  column.removeChild(column.querySelector('.buttonContainer'));
  const addLink = column.querySelector('.column__control');
  addLink.classList.remove('column__control-hidden');
}

function addNewTask(event) {
  event.preventDefault();
  const column = event.currentTarget.closest('.column__container');
  const newCardText = column.querySelector('.cardText').value;
  addTask(newCardText, column);
  closeCardCreating(column);
}

function cancelNewTask(event) {
  event.preventDefault();
  const column = event.currentTarget.closest('.column__container');
  closeCardCreating(column);
}

function addCard(event) {
  const cardText = document.createElement('textarea');
  cardText.className = 'cardText';
  cardText.placeholder = 'Enter a task for this card';
  cardText.style.height = '100px';
  cardText.style.resize = 'none';
  cardText.style.overflow = 'hidden';
  cardText.style.overflowWrap = 'break-word';
  cardText.style.width = '100%';
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';
  const addButton = document.createElement('button');
  addButton.className = 'addButton';
  addButton.textContent = 'Add Card';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'cancelButton';
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(cancelButton);
  const columnContent = event.currentTarget.closest('.column__container');
  columnContent.appendChild(cardText);
  columnContent.appendChild(buttonContainer);
  const addLink = event.currentTarget.closest('.column__control');
  addLink.classList.add('column__control-hidden');
  cardText.focus();

  addButton.addEventListener('click', addNewTask);
  cancelButton.addEventListener('click', cancelNewTask);
}

const addButtons = Array.from(document.querySelectorAll('.column__control'));
addButtons.forEach((item) => item.addEventListener('click', addCard));

setInterval(() => {
  save();
}, 3000);

load();
