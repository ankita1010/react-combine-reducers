# React Combine Reducers

This module contains a handy `combineReducers` function to use in conjunction with the React hook `useReducer`.

You may use it with **JavaScript** or **TypeScript**.


## Installation

[![npm version](https://badge.fury.io/js/react-combine-reducers.svg)](https://badge.fury.io/js/react-combine-reducers)

Install the dependency using the following command:
```bash
npm install react-combine-reducers
```

If using typescript, you can also install the types:
```bash
npm install @types/react-combine-reducers
```

## Usage

Once installed, import the helper function and use it like so:

```javascript
  import { useReducer } from 'react';
  import combineReducers from 'react-combine-reducers';

  const [reducerCombined, initialStateCombined] = combineReducers({
    reducerOne: [reducerOne, initialStateOne],
    reducerTwo: [reducerTwo, initialStateTwo],
    // ...
  });
```

To avoid the initial instantiation call you can use the `useCallback` hook from
react

```javascript
  import { useReducer, useCallback } from 'react';
  import combineReducers from 'react-combine-reducers';

  const [reducerCombined, initialStateCombined] = useCallback(
    combineReducers({
      reducerOne: [reducerOne, initialStateOne],
      reducerTwo: [reducerTwo, initialStateTwo],
      // ...
    }), 
    [reducerCombined, initialStateCombined]
   );
```

### Working Javascript Example

```javascript
  import { useReducer } from 'react';
  import combineReducers from 'react-combine-reducers';

  const initialIdentity = {
    name: 'Harry'
  }

  const initialLocation = {
    country: 'UK',
    city: 'London'
  }

  const identityReducer = (state, action) => {
    switch (action.type) {
      case 'ACTION_A':
        return { ...state, name: 'Puli' };
      default: return state;
    }
  }

  const locationReducer = (state, action) => {
    switch (action.type) {
      case 'ACTION_B':
        return { ...state, city: 'Manchester' };
      default: return state;
    }
  }

  const [profileReducer, initialProfile] = combineReducers({
    identity: [identityReducer, initialIdentity],
    location: [locationReducer, initialLocation]
  });

  const [state, dispatch] = useReducer(profileReducer, initialProfile);

  console.log(state);
  // Outputs the following state:
  // {
  //   identity: {
  //     name: "Harry"
  //   },
  //   location: {
  //     country: "UK",
  //     city: "London"
  //   }
  // }
```

### Working Typescript Example

```typescript
  import { useReducer } from 'react';
  import combineReducers from 'react-combine-reducers';

  type Identity = {
    name: string;
  };

  type Location = {
    country: string;
    city: string;
  };

  type ProfileState = {
    identity: Identity;
    location: Location;
  };

  type Action = {
    type: string;
    payload: any;
  };

  type ProfileReducer = (state: ProfileState, action: Action) => ProfileState;

  const initialIdentity: Identity = {
    name: 'Harry'
  };

  const initialLocation: Location = {
    country: 'UK',
    city: 'London'
  };

  const identityReducer = (state: Identity, action: Action) => {
    switch (action.type) {
      case 'ACTION_A':
        return { ...state, name: 'Puli' };
      default:
        return state;
    }
  };

  const locationReducer = (state: Location, action: Action) => {
    switch (action.type) {
      case 'ACTION_B':
        return { ...state, city: 'Manchester' };
      default:
        return state;
    }
  };

  const [profileReducer, initialProfile] = combineReducers<ProfileReducer>({
    identity: [identityReducer, initialIdentity],
    location: [locationReducer, initialLocation]
  });

  const [state, dispatch] = useReducer<ProfileReducer>(
    profileReducer,
    initialProfile
  );

  console.log(state);
  // Outputs the following state:
  // {
  //   identity: {
  //     name: "Harry"
  //   },
  //   location: {
  //     country: "UK",
  //     city: "London"
  //   }
  // }
```


## Issues:
If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/ankita1010/react-combine-reducers/issues).

Give us a star if this helped you!
Cheers!
