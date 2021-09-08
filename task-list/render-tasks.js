export function renderTasks(tasklist) {
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
      });
  
      ul.append(li);
      tasksContainer.append(ul);
    }};