import { makeTaskComplete } from "../utils.js";

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
        // renderXs(user, item.id);
      });
      //appending
      ul.append(li);
      tasksContainer.append(ul);
    }
  
  };
