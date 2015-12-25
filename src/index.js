import {
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import createReducer from './createReducer'
import Reducer from './Reducer'
import createActions from './createActions'

export { applyMiddleware }
export { bindActionCreators }
export { combineReducers }
export { compose }
export { createActions }
export { createReducer }
export { createStore }
export { Reducer }

export default () => {
  const reducers = {}

  return {
    addReducer(name, reducer) {
      reducers[name] = createReducer(reducer)
      return reducer
    },

    createStore() {
      return createStore(combineReducers(reducers))
    },
  }
}
