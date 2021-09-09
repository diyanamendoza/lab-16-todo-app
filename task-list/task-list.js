import { createTask, getUserTaskList, updateUserTaskList, removeCompletedTasks } from "../utils.js";
import { renderTasks } from "./render-tasks.js";

// get username from URL param
const data = new URLSearchParams(window.location.search);
const currentUsername = data.get('username');

// render tasks on page load
let userTasks = getUserTaskList(currentUsername);
renderTasks(userTasks, currentUsername);

// render nav
const userP = document.getElementById('user');
userP.textContent = `User: ${currentUsername}`;

//add task form
const addTask = document.getElementById('add-task');
addTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addTask);
  const newTask = formData.get('task');

  const task = createTask(newTask);
  updateUserTaskList(currentUsername, task);
  
  // re-render task list
  const divToClear = document.getElementById('tasks-container');
  divToClear.textContent = '';
  renderTasks((getUserTaskList(currentUsername)), currentUsername);

  // clear input field
  document.getElementById('task').value = '';

  // render instruction if it's not there yet
  if(!document.getElementById('instruction-p')) {
    const instructionP = document.createElement('p');
    instructionP.setAttribute('id', 'instruction-p');
    instructionP.textContent = 'Click on a task to chop it!';
    const addContainer = document.getElementById('add-task-container');
    addContainer.append(instructionP);
  }

});

//render clear button that clears completed tasks from DOM and from LS, and then re-renders the whole list
// while(userTasks.find(task => task.completed === true)) {
  const clearButton = document.createElement('button');
  clearButton.textContent = "Clear Chopped Tasks";
  const clearDiv = document.getElementById('clear-button');
  clearDiv.append(clearButton);
  clearButton.addEventListener('click', () => {
    let currentTasksArray = getUserTaskList(currentUsername);
    let completedTasks = currentTasksArray.find(item => item.completed === true);
    if (completedTasks) {
      //remove from LS
      removeCompletedTasks(currentUsername)
      //re-render list
      const divToClear = document.getElementById('tasks-container');
      divToClear.textContent = '';
      renderTasks((getUserTaskList(currentUsername)), currentUsername);
    } else {
      alert('No tasks to clear! Add and chop tasks first.');
    }
  });
// }