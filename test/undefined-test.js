import { assert } from 'chai'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

export const returnUndefined = {
  'returning undefined is a noop'() {
    const reducer = createReducer({
      state: {
        x: 0,
      },

      mapActionTypes: {
        increment: counter.incremented,
      },

      increment(state, payload) {
        return undefined
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    assert(reducer().x === 0, 'x exists, its 0')

    dispatchCounter.incremented()

    assert(reducer().x === 0, 'x stills exists in state, still 0')
  },

  'returning undefined is a noop'() {
    const reducer = createReducer({
      state: 0,

      mapActionTypes: {
        first: counter.incremented,
        second: counter.incremented,
        third: counter.incremented,
        fourth: counter.incremented,
      },

      first(state, payload) {
        return state + payload
      },

      second(state, payload) {
        return state + payload
      },

      third() {
        return undefined
      },

      fourth(state) {
        return state
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    assert(reducer() === 0, 'initial state is 0')

    dispatchCounter.incremented(1)

    assert(reducer() === 2, 'count was incremented to two')
  },
}
