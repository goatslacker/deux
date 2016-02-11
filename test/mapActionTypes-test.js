import { assert } from 'chai'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

function dispatch(reducer) {
  assert(reducer() === 0, 'current state is 0')

  const store = createStore(reducer)

  const dispatchCounter = bindActionCreators(counter, store.dispatch)

  dispatchCounter.incremented(1)
  if (dispatchCounter.test) dispatchCounter.test(1)

  return reducer()
}

export const mapActionTypes = {
  'works as an array'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        incremented: [counter.incremented],
      },

      incremented(state, payload) {
        return state + payload
      },
    })

    assert(dispatch(reducer) === 1, 'count was incremented')
  },

  'works as a single action'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        incremented: counter.incremented,
      },

      incremented(state, payload) {
        return state + payload
      },
    })

    assert(dispatch(reducer) === 1, 'count was incremented')
  },

  'works with strings'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        incremented: 'counter/incremented',
      },

      incremented(state, payload) {
        return state + payload
      },
    })

    assert(dispatch(reducer) === 1, 'count was incremented')
  },

  'works with multiple actions bound'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        incremented: [counter.incremented, counter.test],
      },

      incremented(state, payload) {
        return state + payload
      },
    })

    assert(dispatch(reducer) === 2, 'count was incremented twice')
  },

  'works across different methods'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        incremented: counter.incremented,
        incremented2: counter.incremented,
      },

      incremented(state, payload) {
        return state + payload
      },

      incremented2(state, payload) {
        return state + payload
      },
    })

    assert(dispatch(reducer) === 2, 'count was incremented twice')
  },
}
