import { createTask, getUserDB, getUserTaskList, updateUserTaskList } from "../utils.js";
import { renderTasks } from "./render-tasks.js";

// get username from URL param
const data = new URLSearchParams(window.location.search);
const currentUsername = data.get('username');


// render tasks on page load
let userTasks = getUserTaskList(currentUsername);
renderTasks(userTasks);

//add task stuff
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
  renderTasks(getUserTaskList(currentUsername));
});
