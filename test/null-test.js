import { assert } from 'chai'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

export const returnNull = {
  'returning null sets the state to null'() {
    const reducer = createReducer({
      state: {
        x: 0,
      },

      mapActionTypes: {
        increment: counter.incremented,
      },

      increment(state, payload) {
        return null
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    assert(reducer().x === 0, 'x exists, its 0')

    dispatchCounter.incremented()

    assert(reducer() === null, 'the state is now null')
  },
}
