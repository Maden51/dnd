function activeTask(event) {
  event.currentTarget.classList.add('task-active');
  event.currentTarget.querySelector('.task__cancelButton').classList.add('task__cancelButton-active');
  event.currentTarget.querySelector('.task__editButton').classList.add('task__editButton-active');
}

function deactivateTask(event) {
  event.currentTarget.classList.remove('task-active');
  event.currentTarget.querySelector('.task__cancelButton').classList.remove('task__cancelButton-active');
  event.currentTarget.querySelector('.task__editButton').classList.remove('task__editButton-active');
}

function taskRemove(event) {
  event.preventDefault();
  event.currentTarget.closest('.task').remove();
}
// функция редактирования
// добавить инпутблок со значением карточки
// добавить кнопку сохранить изменения
// удалить карточку
// при нажатии на кнопку, добавляется карточка со значением инпутблока, а он удаляется
function taskEdit(event) {
  event.preventDefault();
}

export default function addTask(text, column) {
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = text;
  column.querySelector('.column__content').appendChild(task);
  task.addEventListener('mouseover', activeTask);
  task.addEventListener('mouseout', deactivateTask);

  const deleteTask = document.createElement('button');
  deleteTask.classList.add('task__cancelButton');
  const editTask = document.createElement('div');
  editTask.classList.add('task__editButton');
  task.appendChild(editTask);
  task.appendChild(deleteTask);
  deleteTask.addEventListener('click', taskRemove);
  editTask.addEventListener('click', taskEdit);
}
