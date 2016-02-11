import { assert } from 'chai'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

export const usingDefaultReducer = {
  'falls through to reduce'() {
    const reducer = createReducer({
      state: 0,

      reduce(state, payload) {
        if (payload) return state + payload
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    dispatchCounter.incremented(1)

    assert(reducer() === 1, 'count was incremented')
  },
}
