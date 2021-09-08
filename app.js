import { createUser, getUser, getUserDB } from "./utils.js";



// sign up form
const signup = document.getElementById('signup-form');

signup.addEventListener('submit', (e) => {
  e.preventDefault();
  // create user object
  const formData = new FormData(signup);
    const username = formData.get('username');
    const password = formData.get('password');

  //check if username already exists
  let userDB = getUserDB();
  const userMatch = userDB.find(entry => (entry.user === username));
  if (userMatch) {alert('That username already exists. Please choose another username.')}
  else {
// set new user in LS
  createUser(username, password);
  //direct user to page for creating task list
  window.location = `./task-list/?username=${username}`;
}});



// log in form 
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user data
  const formData = new FormData(loginForm);
  const userLoggingIn = formData.get('username');
  const pwLoggingIn = formData.get('password');

  //find user that matches both username and pw
  getUser(userLoggingIn, pwLoggingIn);
  //direct user to page rendering their task list
  window.location = `./task-list/?username=${userLoggingIn}`;
});