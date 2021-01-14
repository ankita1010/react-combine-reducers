import { combineReducers } from './utility'

describe('combineReducers', () => {
  const initialIdentity = {
    name: 'Harry'
  }

  const initialLocation = {
    country: 'UK',
    city: 'London'
  }

  const identityReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_NAME':
        return { ...state, name: 'Puli' }
      default: return state
    }
  }

  const locationReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_CITY':
        return { ...state, city: 'Manchester' }
      default: return state
    }
  }

  const [profileReducer, initialProfile] = combineReducers({
    identity: [identityReducer, initialIdentity],
    location: [locationReducer, initialLocation]
  })

  const expectedInitialProfile = {
    identity: {
      name: 'Harry'
    },
    location: {
      country: 'UK',
      city: 'London'
    }
  }

  it('correctly combines initial states', () => {
    expect(initialProfile).toEqual(expectedInitialProfile)
  })

  describe('returns a combined reducer that...', () => {
    const changeNothing = profileReducer(initialProfile, { type: 'CHANGE_NOTHING' })
    const changeName = profileReducer(initialProfile, { type: 'CHANGE_NAME' })
    const changeCity = profileReducer(initialProfile, { type: 'CHANGE_CITY' })

    it('does not change the state on a null action', () => {
      expect(changeNothing).toEqual(initialProfile)
    })

    it('correctly changes just one slice of the state', () => {
      const profileWithNameChangeOnly = {
        identity: {
          name: 'Puli'
        },
        location: {
          country: 'UK',
          city: 'London'
        }
      }
      const profileWithCityChangeOnly = {
        identity: {
          name: 'Harry'
        },
        location: {
          country: 'UK',
          city: 'Manchester'
        }
      }
      expect(changeName).toEqual(profileWithNameChangeOnly)
      expect(changeCity).toEqual(profileWithCityChangeOnly)
    })

    it('correctly changes more than one slice of the state', () => {
      const changeNameThenCity = profileReducer(changeName, { type: 'CHANGE_CITY' })
      const changeBoth = {
        identity: {
          name: 'Puli'
        },
        location: {
          country: 'UK',
          city: 'Manchester'
        }
      }
      expect(changeBoth).toEqual(changeNameThenCity)
    })
  })
})
