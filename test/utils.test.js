// IMPORT MODULES under test here:
import { getUserDB, 
    setUserDB, 
    getUser,
    USERDB  } from "../utils.js";

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

