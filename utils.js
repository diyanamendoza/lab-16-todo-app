

export const USERDB = 'USERDB';

export function getUserDB() {
    let userDB = localStorage.getItem(USERDB);
    if (!userDB) {return []};

    const parsedUserDB = JSON.parse(userDB);
    return parsedUserDB;
};

export function setUserDB(db) {
    const stringDB = JSON.stringify(db);
    localStorage.setItem(USERDB, stringDB);
}

export function getUser(username, password) {
    let userDB = getUserDB();
    const userMatch = userDB.find(entry => (entry.user === username && entry.pw === password));

    if (!userMatch) {return "nope";}
    return "found";
};

export function createUser(username, password) {
    let userDB = getUserDB();

        const newUser = {
            user: username,
            pw: password,
            tasks: []
        }
    
        const updatedUserDB = JSON.stringify([...userDB, newUser]);
    
        localStorage.setItem(USERDB, updatedUserDB);
};

export function createTask(task) {
    //create task object
    return task = {
        id: Math.ceil(Math.random() * 100000),
        task,
        completed: false,
    }
};

export function updateUserTaskList(user, task) {
    //get the user database
    let userDB = getUserDB();
    //get the user's entry from the db
    let userEntry = userDB.find(entry => entry.user === user);
    //get the index of the user in the db (for use later)
    const userIndex = userDB.indexOf(userEntry);
    //update the user's entry with the new task
    userEntry.tasks = [...userEntry.tasks, task];
    //replace old user entry with new one
    userDB[userIndex] = userEntry;
    //update whole user db
    setUserDB(userDB);
};

export function getUserTaskList(user) {
      // get userDB
  let userDB = getUserDB();
  // get currentUser's task list from DB
  let currentUserEntry = userDB.find(entry => (entry.user === user));
  return currentUserEntry.tasks;
}

export function makeTaskComplete(user, taskID) {
    //get the user database
    let userDB = getUserDB();
    //get the user's entry from the db
    let userEntry = userDB.find(entry => entry.user === user);
    //get the index of the user in the db (for use later)
    const userIndex = userDB.indexOf(userEntry);

    //get user task array
    let taskArray = userEntry.tasks;
    //loop through task array and set appropiate task to complete:true
    for (let task of taskArray) {
        if(task.id === taskID) {
            task.completed = true;
        }
    }
    //update the user's entry with updated taskarray
    userEntry.tasks = taskArray;
    //replace old user entry with new one
    userDB[userIndex] = userEntry;
    //update whole user db
    setUserDB(userDB);
}

export function removeTask(user, taskID) {
        //get the user database
        let userDB = getUserDB();
        //get the user's entry from the db
        let userEntry = userDB.find(entry => entry.user === user);
        //get the index of the user in the db (for use later)
        const userIndex = userDB.indexOf(userEntry);
    
        //get user task array
        let taskArray = userEntry.tasks;
        //loop through task array and set appropiate task to complete:true
        for (let task of taskArray) {
            if(task.id === taskID) {
                const taskIndex = taskArray.indexOf(task);
                taskArray.splice(taskIndex, 1);
            }
        }
        //update the user's entry with updated taskarray
        userEntry.tasks = taskArray;
        //replace old user entry with new one
        userDB[userIndex] = userEntry;
        //update whole user db
        setUserDB(userDB);
}

export function removeCompletedTasks(user) {
    //get the user database
    let userDB = getUserDB();
    //get the user's entry from the db
    let userEntry = userDB.find(entry => entry.user === user);
    //get the index of the user in the db (for use later)
    const userIndex = userDB.indexOf(userEntry);

    //get user task array
    let taskArray = userEntry.tasks;
    //loop through task array and set appropiate task to complete:true
    for (let task of taskArray) {
        if(task.completed === true) {
            const taskIndex = taskArray.indexOf(task);
            taskArray.splice(taskIndex, 1);
        }
    }
    //update the user's entry with updated taskarray
    userEntry.tasks = taskArray;
    //replace old user entry with new one
    userDB[userIndex] = userEntry;
    //update whole user db
    setUserDB(userDB);
}

//source: https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
export function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}