# React Combine Reducers

### A helper utility to apply combineReducers functionality in react `useReducer` hook.


## Installation

 Install the module by running -

`$ npm install react-combine-reducers `

## Usage

Import the helper function -

` import combineReducers from 'react-combine-reducers'; `

The function takes an object of the following structure - 

`const [rootReducerCombined, initialStateCombined] = combineReducers({
		reducerOne: [reducerOne, initialStateOne],
		reducertwo: [reducerTwo, initialStateTwo]
	});`
  
Javascript Example -

```
	const initialStateOne = {
		name: "Harry",
		city: "London"
	}
	const initialStateTwo = {
		country: "UK",
		userID: 1001
	}
	const reducerOne = (state, action) => {
		switch (action.type) {
			case "ACTION_ONE": return { ...state, name: "Puli" };
			default: return state;
		}
	}
	const reducerTwo = (state, action) => {
		switch (action.type) {
			case "ACTION_TWO": return { ...state, country: "Germany" };
			default: return state;
		}
	}
	const [rootReducerCombined, initialStateCombined] = combineReducers({
		reducerOne: [reducerOne, initialStateOne],
		reducertwo: [reducerTwo, initialStateTwo]
	});
	const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);

```

Typescript Example -

```
	type User = {
  		name: string,
		city: string,
	}
	type CombinedState = {
		reducerOne: User,
		reducertwo: User
	}
	type Action = {
  		type: string,
  		payload?:any // replace any with your own known payload types
	}
	type CombinedReducerType = (state: CombinedState, action: Action) => CombinedState;
	const initialStateOne: User = {
		name: "Harry",
		city: "London"
	}
	const initialStateTwo: User = {
		country: "UK",
		userID: 1001
	}
	const reducerOne = (state: User, action: Action) => {
		switch (action.type) {
			case "ACTION_ONE": return { ...state, name: "Puli" };
			default: return state;
		}
	}
	const reducerTwo = (state: User, action: Action) => {
		switch (action.type) {
			case "ACTION_TWO": return { ...state, country: "Germany" };
			default: return state;
		}
	}
	const [rootReducerCombined, initialStateCombined] = combineReducers({
		reducerOne: [reducerOne, initialStateOne],
		reducertwo: [reducerTwo, initialStateTwo]
	});
	const [{ reducerOne, reducertwo }, dispatch] = useReducer<CombinedReducerType>(rootReducerCombined, initialStateCombined);

```
Edit your main .d.ts file and add:
```
declare module 'react-combine-reducers'
```


## Issues:
If you find a bug, please file an issue on [our issue tracker on github](https://github.com/ankita1010/react-combine-reducers/issues).

Give us a star if this helped you!
Cheers!
