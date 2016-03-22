// Contains a set of action creators
import counter from './CounterActionTypes'

// The initial state the reducer will have
// similar to `this.state = 0` in Alt
export const state = 0

// Which actions the reducer handles.
// The key maps to the function declared in this file
// The value is an Array of actions that should be handled by this function
// similar to `this.bindListeners` in Alt
export const mapActionTypes = {
  incremented: [counter.incremented],
  twentyFive: [counter.twentyfive],
}

// An individual reducer of an action
// It gets the reducer's entire state and returns the new state of the reducer
// this particular reducer is only called whenever the counter.incremented
// action is dispatched
export const incremented = (state, payload) => {
  return state + payload
}

export const twentyFive = (state, payload) => {
  return payload
}
