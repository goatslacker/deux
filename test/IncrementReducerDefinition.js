import counter from './CounterActionTypes'

export const state = 0

export const mapActionTypes = {
  incremented: [counter.incremented],
  twentyFive: [counter.twentyfive],
}

export const incremented = (state, payload) => {
  return state + payload
}

export const twentyFive = (state, payload) => {
  return payload
}
