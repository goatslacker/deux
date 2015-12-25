import { bindActionCreators, createReducer, createActions, createStore, Reducer } from './src'

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
    this.replaceState(this.state + payload)
  }
}

//const incrementReducer = createReducer(new IncrementReducer())

const incrementReducer = createReducer({
  state: 0,

  reducers: {
    [counter.increment.type](state, payload) {
      return state + payload
    },
  },
})

const store = createStore(incrementReducer)

const dispatchCounter = bindActionCreators(counter, store.dispatch)

store.subscribe(() => console.log(store.getState()))

dispatchCounter.increment(1)
dispatchCounter.increment(1)
dispatchCounter.increment(1)

//store.dispatch(counter.increment(1))
//store.dispatch(counter.increment(1))
//store.dispatch(counter.increment(1))
