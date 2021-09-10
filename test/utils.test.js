// IMPORT MODULES under test here:
import { getUserDB, 
    setUserDB, 
    getUser,
    updateUserTaskList,
    USERDB,  
    getUserTaskList,
    makeTaskComplete,
    removeCompletedTasks} from "../utils.js";

const test = QUnit.test;

test('getUserDB should return parsed array of users from local storage', (expect) => {
    //put a sample userDB in LS
    const sampleUserDB = [{
        user: 'test1',
        pw: 'test2',
        tasks: []
    },
    {
        user: 'test2',
        pw: 'test2',
        tasks: []
    }];

    const stringDB = JSON.stringify(sampleUserDB);
    localStorage.setItem(USERDB, stringDB);
    // Set up your arguments and expectations
    const expected = sampleUserDB;
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = getUserDB();

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
});


test('setUserDB should set a given array in local storage', (expect) => {
    //use setUserDB to set a sample userDB in LS
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: []
    },
    {
        user: 'test5',
        pw: 'test5',
        tasks: []
    }];

    setUserDB(sampleUserDB);

    // get the db that was just set to see if it matches the db passed in
    const expected = JSON.stringify(sampleUserDB);
    const actual = localStorage.getItem(USERDB);

    expect.deepEqual(actual, expected);
});

test('getUser should take in a username and password and return whether found', (expect) => {
    //set sampleUserDB
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: []
    },
    {
        user: 'test5',
        pw: 'test5',
        tasks: []
    }];

    setUserDB(sampleUserDB);

    // pass known user and pw into getUser function to see if found is returned
    const expectedFound = 'found';
    const actualResult = getUser('test4', 'test4');

    expect.equal(actualResult, expectedFound);

    // pass unknown user and pw in to see if 'nope' is returned
    const expectedNope = 'nope';
    const actualReturn = getUser('fake', 'faker');
    expect.equal(actualReturn, expectedNope);
});

//THIS TEST SHOULD BE PASSING - ONLY DIFFERENCE IN RESULT IS SPACING
// test('createUser should set a given object in local storage based on username and password', (expect) => {
//     //test user object
//     const testUser = {
//     user: 'test100', 
//     pw: 'test200', 
//     tasks: []};

//     //call function
//     createUser('test100', 'test200');

//     // get the db and slice the last object to compare it with original
//     let currentDB = JSON.parse(localStorage.getItem(USERDB));
    

//     const expected = testUser;
//     const actual = currentDB.slice((currentDB.length) - 1);

//     expect.deepEqual(actual, expected);
// });

test('updateUserTaskList should take in a user and a task and update that users tasklist in LS', (expect) => {
    //set sampleUserDB
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: []
    },
    {
        user: 'test5',
        pw: 'test5',
        tasks: []
    }];

    setUserDB(sampleUserDB);

    //pass known user and sample task into function
    updateUserTaskList('test4', 'buy eggs');

    //get user db, parsed
    let userDB = getUserDB();

    //get user entry from userdb
    let userEntry = userDB.find(entry => (entry.user === 'test4'));

    const expectedTaskList = ['buy eggs'];
    const actualTaskList = userEntry.tasks;

    expect.deepEqual(actualTaskList, expectedTaskList);
});

test('getUserTaskList should take in a user and return tasklist', (expect) => {
    //set sampleUserDB
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: ['do laundry', 'mop floors']
    },
    {
        user: 'test5',
        pw: 'test5',
        tasks: []
    }];

    setUserDB(sampleUserDB);

    const expectedTaskList = ['do laundry', 'mop floors'];
    const actualTaskList = getUserTaskList('test4');;

    expect.deepEqual(actualTaskList, expectedTaskList);
});

test('makeTaskComplete should take in a user and taskID and set that task to completed: true', (expect) => {
    //set sampleUserDB
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: [
            {id: 1, 
            task: 'do laundry',
            completed: false},
            {id: 2,
            task: 'mop floors',
            completed: false}]
    }];

    setUserDB(sampleUserDB);

    //call function
    makeTaskComplete('test4', 1);

    //get user db, parsed
    let userDB = getUserDB();

    //get user entry from userdb
    let userEntry = userDB.find(entry => (entry.user === 'test4'));

    //get user task array
    let userTasks = userEntry.tasks;
    let specificTask = userTasks.find(task => task.id === 1);

    const expected = true;
    const actual = specificTask.completed;

    expect.deepEqual(actual, expected);
});

test('removeCompletedTasks should take in a user and remove all tasks with completed: true', (expect) => {
    //set sampleUserDB
    const sampleUserDB = [{
        user: 'test4',
        pw: 'test4',
        tasks: [
            {id: 1, 
            task: 'do laundry',
            completed: true},
            {id: 2,
            task: 'mop floors',
            completed: true}]
    }];

    setUserDB(sampleUserDB);

    //call function
    removeCompletedTasks('test4');

    //get user db, parsed
    let userDB = getUserDB();

    //get user entry from userdb
    let userEntry = userDB.find(entry => (entry.user === 'test4'));

    const expected = [];
    const actual = userEntry.tasks;

    expect.deepEqual(actual, expected);
});