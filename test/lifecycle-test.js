import { assert } from 'chai'
import sinon from 'sinon'
import {
  bindActionCreators,
  createActionTypes,
  createReducer,
  createStore,
} from '../src'

import counter from './CounterActionTypes'

export const lifecycleTests = {
  'before is called before each dispatch'() {
    const before = sinon.spy()

    const reducer = createReducer({
      state: 1,

      on: {
        before(state, payload, { type }) {
          // we filter out redux init because this gets called when the store
          // is first created
          if (type !== '@@redux/INIT') {
            before(state, payload)
          }
        }
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

    dispatchCounter.incremented('hello')

    assert(before.calledOnce, 'before was called')

    assert(before.args[0][0] === 1, 'state is 1')
    assert(before.args[0][1] === 'hello', 'payload is hello')
  },

  'after is called after each dispatch'() {
    const after = sinon.spy()

    const reducer = createReducer({
      state: 1,

      on: {
        after(state, payload, { type }) {
          // we filter out redux init because this gets called when the store
          // is first created
          if (type !== '@@redux/INIT') {
            after(state, payload)
          }
        }
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

    dispatchCounter.incremented('hello')

    assert(after.calledOnce, 'after was called')

    assert(after.args[0][0] === 1, 'state is 1')
    assert(after.args[0][1] === 'hello', 'payload is hello')
  },

  'before, then action handler, then after'() {
    let order = ''

    const reducer = createReducer({
      state: 1,

      on: {
        before() {
          order = 'before'
        },

        after(a, b, { type }) {
          if (type !== '@@redux/INIT') order += 'after'
        },
      },

      mapActionTypes: {
        increment: counter.incremented,
      },

      increment() {
        order += 'during'
        return undefined
      },
    })

    const store = createStore(reducer)

    const dispatchCounter = bindActionCreators(counter, store.dispatch)

    dispatchCounter.incremented(0)

    assert(order === 'beforeduringafter', 'correct order of operations')
  },
}
