import 'core-js/stable'
import 'regenerator-runtime/runtime'
export const combineReducers = reducers => {
  const reducerKeys = Object.keys(reducers)
  const reducerValues = Object.values(reducers)
  let globalState
  reducerKeys.forEach((key, index) => {
    globalState = { ...globalState, [key]: reducerValues[index][1] }
  })
  let finalReducers = {}
  reducerValues.forEach((value, index) => {
    finalReducers = { ...finalReducers, [reducerKeys[index]]: value[0] }
  })
  return [
    (state, action) => {
      let hasStateChanged = false
      const newState = {}
      let nextStateForCurrentKey = {}
      for (let i = 0; i < reducerKeys.length; i++) {
        const currentKey = reducerKeys[i]
        const currentReducer = finalReducers[currentKey]
        const prevStateForCurrentKey = state[currentKey]
        nextStateForCurrentKey = currentReducer(
          prevStateForCurrentKey,
          action
        )
        hasStateChanged =
          hasStateChanged || nextStateForCurrentKey !== prevStateForCurrentKey
        newState[currentKey] = nextStateForCurrentKey
      }
      return hasStateChanged ? newState : state
    },
    globalState
  ]
}
