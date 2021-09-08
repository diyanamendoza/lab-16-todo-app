import { makeTaskComplete } from "../utils.js";

export function renderTasks(tasklist, user) {
    const tasksContainer = document.getElementById('tasks-container');
    const ul = document.createElement('ul');
  
    for (let item of tasklist) {
      const li = document.createElement('li');
      li.textContent = item.task;
      li.classList.add('task-li');
      li.value = item.id;
      li.addEventListener('click', () => {
        li.classList.remove('task-list');
        li.classList.add('chopped');
        makeTaskComplete(user, item.id);
      });
  
      ul.append(li);
      tasksContainer.append(ul);
    }};