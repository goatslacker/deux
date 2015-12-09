import { createStore } from 'redux'
import { dispatchableActions, createReducer, createActions, Reducer } from './src'

//const incrementReducer = (state = 0, dispatch = {}) => {
//  if (dispatch.type === 'counter/increment') {
//    return state + dispatch.payload
//  }
//  return state
//}

//const incrementReducer = createReducer({
//  state: 0,
//  reducers: {
//    'counter/increment'(state, payload) {
//      return state + payload
//    },
//
//    default(state) {
//      return state
//    },
//  }
//})

const counter = createActions('counter', ['increment'])

class IncrementReducer extends Reducer {
  constructor() {
    super()

    this.state = 0

    this.bindListeners({
      increment: counter.increment,
    })
  }

  increment(payload) {
    this.setState(this.state + payload)
  }
}

const incrementReducer = createReducer(new IncrementReducer())

const store = createStore(incrementReducer)

const dispatchCounter = dispatchableActions(store.dispatch, counter)

store.subscribe(() => console.log(store.getState()))

dispatchCounter.increment(1)
dispatchCounter.increment(1)
dispatchCounter.increment(1)

//store.dispatch(counter.increment(1))
//store.dispatch(counter.increment(1))
//store.dispatch(counter.increment(1))
