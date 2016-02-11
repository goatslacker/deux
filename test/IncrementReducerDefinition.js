import counter from './CounterActionTypes'

export const state = 0

export const mapActionTypes = {
  incremented: [counter.incremented],
}

export const incremented = (state, payload) => {
  return state + payload
}

