

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

    if (!userMatch) {
        const createInstead = confirm(`Hmm... We couldn't find that login. Would you like to create a new login with this info instead?`);
        if (createInstead === true) {
            createUser(username, password);
        }
    }
    return userMatch;
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