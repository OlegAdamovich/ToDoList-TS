import {StateType, userReducer} from "./userReducer";

test('userReducer should increment only age', () => {
    const startState: StateType = {age: 40, childrenCount: 2, name: 'Victoria'};
    const action = {type: 'INCREMENT-AGE'};

    const endState = userReducer(startState, action);

    expect(endState.age).toBe(41);
    expect(endState.childrenCount).toBe(2);
})

test('userReducer should increment only childrenCount', () => {
    const startState = {name: 'Alex', age: 20, childrenCount: 0};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(1);
    expect(endState.age).toBe(20);
})

test('userReducer should change only name', () => {
    const startState = {name: 'Anastasia', age: 20, childrenCount: 0};
    const newName = 'Lena';

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName});

    expect(endState.name).toBe(newName);
})
