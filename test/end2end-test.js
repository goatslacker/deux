import { assert } from 'chai'
import {
  bindActionCreators,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'
import * as IncrementReducerDefinition from './IncrementReducerDefinition'

export const end2end = {
  'dispatches work'() {
    const reducer = createReducer(IncrementReducerDefinition)

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    dispatchCounter.incremented(1)
    dispatchCounter.incremented(1)
    dispatchCounter.incremented(1)

    assert(reducer() === 3, 'count was incremented three times')

    dispatchCounter.incremented(3)

    assert(reducer() === 6, 'count was incremented three more times')
  },
}
