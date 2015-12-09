export default (obj) => {
  return (state = obj.state, dispatch = {}) => {
    const reducer = obj.reducers[dispatch.type]
    if (reducer) {
      return reducer(state, dispatch.payload)
    } else if (obj.reducers.default) {
      return obj.reducers.default(state, dispatch.payload)
    }

    return state
  }
}

