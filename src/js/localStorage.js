import addTask from './addTask';

const todoContainer = document.querySelector('.todo');
const inProgressContainer = document.querySelector('.inProgress');
const doneContainer = document.querySelector('.done');

export default function save() {
  const todoTasks = [];
  const inProgressTasks = [];
  const doneTasks = [];

  const todoTasksEls = Array.from(todoContainer.querySelectorAll('.task'));
  if (todoTasksEls) {
    todoTasksEls.forEach((item) => {
      todoTasks.push(item.textContent);
    });
  }

  const inProgressTasksEls = Array.from(inProgressContainer.querySelectorAll('.task'));
  if (inProgressTasksEls) {
    inProgressTasksEls.forEach((item) => {
      inProgressTasks.push(item.textContent);
    });
  }

  const doneTasksEls = Array.from(doneContainer.querySelectorAll('.task'));
  if (doneTasksEls) {
    doneTasksEls.forEach((item) => {
      doneTasks.push(item.textContent);
    });
  }
  localStorage.setItem('todoTasks', JSON.stringify({ tasks: todoTasks }));
  localStorage.setItem('inProgressTasks', JSON.stringify({ tasks: inProgressTasks }));
  localStorage.setItem('doneTasks', JSON.stringify({ tasks: doneTasks }));
}

export function load() {
  let savedTasks;

  try {
    savedTasks = JSON.parse(localStorage.getItem('todoTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addTask(item, todoContainer);
      });
    }
  } catch (e) {
    throw new Error('Invalid todoTasks');
  }

  try {
    savedTasks = JSON.parse(localStorage.getItem('inProgressTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addTask(item, inProgressContainer);
      });
    }
  } catch (e) {
    throw new Error('Invalid inProgressTasks');
  }

  try {
    savedTasks = JSON.parse(localStorage.getItem('doneTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addTask(item, doneContainer);
      });
    }
  } catch (e) {
    throw new Error('Invalid doneTasks');
  }
}
