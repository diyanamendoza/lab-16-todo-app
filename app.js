import { createUser, getUser, getUserDB } from "./utils.js";



// sign up form
const signup = document.getElementById('signup-form');

signup.addEventListener('submit', (e) => {
  e.preventDefault();
  // create user object
  const formData = new FormData(signup);
    const username = formData.get('username');
    const password = formData.get('password');

  // set new user in LS
  createUser(username, password);
});



// log in form 
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user data
  const formData = new FormData(loginForm);
  const userLoggingIn = formData.get('username');
  const pwLoggingIn = formData.get('password');

  console.log(userLoggingIn, pwLoggingIn);

  //find user that matches both username and pw
  let userMatch = getUser(userLoggingIn, pwLoggingIn);
  console.log(userMatch);
  //direct user to page rendering their task list
  
});