


// sign up form
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // create user object
  const signupFormData = new FormData(signupForm);
  const newUser = {
    username: signupFormData.get('username'),
    password: signupFormData.get('password'),
    tasks: []
  }
  // set new user in LS

});



// log in form 
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user data
  const loginFormData = new FormData(signupForm);
  const userLoggingIn =  signupFormData.get('username');
  const pwLoggingIn = signupFormData.get('password');

  // find user in LS
  //get users data from ls
  //find user that matches both username and pw
  //direct user to page rendering their task list
  
});