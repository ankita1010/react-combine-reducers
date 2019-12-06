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
  
Example -

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

## Issues:
If you find a bug, please file an issue on [our issue tracker on github](https://github.com/ankita1010/react-combine-reducers/issues).

Give us a star if this helped you!
Cheers!
