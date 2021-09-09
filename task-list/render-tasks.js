import { getUserTaskList, makeTaskComplete, removeTask } from "../utils.js";

export function renderTasks(tasklist, user) {
    const tasksContainer = document.getElementById('tasks-container');
    const ul = document.createElement('ul');
  
    for (let item of tasklist) {
      const li = document.createElement('li');
      li.textContent = item.task;
      
      if (item.completed === false) {
        li.classList.add('task-li');
      } else {
        li.classList.add('chopped');
      };

      li.value = item.id;
      li.addEventListener('click', () => {
        const chopSound = document.getElementById('chop');
        chopSound.play();
        li.classList.remove('task-list');
        li.classList.add('chopped');
        makeTaskComplete(user, item.id);
        renderXs(user, item.id);
      });
  
      ul.append(li);
      tasksContainer.append(ul);
    }};


export function renderXs(user, taskID) {
  const choppedTasks = document.getElementsByClassName('chopped');
  const ul = document.querySelector('ul');
  for (let item of choppedTasks) {
      const x = document.createElement('img');
      x.src = '../assets/white-x.png'
      x.classList.add('white-x');
      item.appendChild(x);
      x.addEventListener('click', () => {
        removeTask(user, taskID);
        ul.textContent = '';
        let updatedList = (getUserTaskList(user));
        renderTasks(updatedList, user);
      })
}};

//FIX BUG WITH REMOVAL