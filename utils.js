

export const USERDB = 'USERDB';

export function getUserDB() {
    let userDB = localStorage.getItem(USERDB);
    if (!userDB) {return []};

    const parsedUserDB = JSON.parse(userDB);
    return parsedUserDB;
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
}

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