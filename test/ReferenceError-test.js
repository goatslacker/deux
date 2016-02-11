import { assert } from 'chai'
import { createReducer, createActionTypes } from '../src'

import counter from './CounterActionTypes'

export const ReferenceErrors = {
  'throws if invalid reducer passed in'() {
    assert.throws(() => createReducer({}))
    assert.throws(() => createReducer({ mapActionTypes: {} }))
  },

  'throws if our action is undefined'() {
    assert.throws(() => createReducer({
      state: 0,

      mapActionTypes: {
        incremented: [counter.in_cre_ment],
      },

      incremented(state, payload) {
        return state + payload
      },
    }))
  },

  'throws if an extraneous method is defined'() {
    assert.throws(() => createReducer({
      state: 0,

      mapActionTypes: {
        incremented: counter.incremented,
      },

      incremented(state, payload) {
        return state + payload
      },

      extraExtra() { },
    }))
  },

  'throws if extra methods are mapped'() {
    assert.throws(() => createReducer({
      state: 0,

      mapActionTypes: {
        incremented: counter.incremented,
        yesno: counter.incremented,
      },

      incremented(state, payload) {
        return state + payload
      },
    }))
  },

  'throws if you pass in unknown actions'() {
    assert.throws(() => createReducer({
      state: 0,

      mapActionTypes: {
        incremented: {},
      },

      incremented(state, payload) {
        return state + payload
      },
    }))
  },

  'throws if action exists more than once in same def'() {
    assert.throws(() => createReducer({
      state: 0,

      mapActionTypes: {
        incremented: [counter.incremented, counter.incremented],
      },

      incremented(state, payload) {
        return state + payload
      },
    }))
  },
}
