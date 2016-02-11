import { assert } from 'chai'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

export const updateObjects = {
  'updating objects in state'() {
    const reducer = createReducer({
      state: {
        x: 0,
        y: 0,
      },

      reduce(state, payload) {
        if (payload) return { ...state, ...payload }
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    assert(
      Object.keys(reducer()).length === 2,
      'there are only two keys in state'
    )

    dispatchCounter.test({
      x: 2,
      z: 0,
    })

    assert(reducer().x === 2, 'x is now 2')
    assert(reducer().z === 0, 'z now exists')
  },
}
