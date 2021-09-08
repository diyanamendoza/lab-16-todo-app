import { createTask, getUserDB, updateUserTaskList } from "../utils.js";

// get username from URL param
const data = new URLSearchParams(window.location.search);
const currentUsername = data.get('username');
// get userDB
let userDB = getUserDB();
// get currentUser's task list from DB
let currentUserEntry = userDB.find(entry => (entry.user === currentUsername));
let currentTaskList = currentUserEntry.tasks;

console.log(currentTaskList);

//add task stuff
const addTask = document.getElementById('add-task');
addTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addTask);
  const newTask = formData.get('task');

  const task = createTask(newTask);
  updateUserTaskList(currentUsername, task);
});