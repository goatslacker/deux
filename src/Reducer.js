export default class Reducer {
  bindListeners(listeners) {
    // store all of the handlers
    const actionHandlers = {}

    // the reducers object
    this.reducers = Object.keys(listeners).reduce((reducers, methodName) => {
      // support for listening to more than one action
      const actions = Array.isArray(listeners[methodName])
        ? listeners[methodName]
        : [listeners[methodName]]

      actions.forEach((actionType) => {
        const actionName = typeof actionType === 'string'
          ? actionType
          : actionType.type

        if (!actionName) {
          throw new ReferenceError('Unknown action')
        }

        if (!actionHandlers[actionName]) actionHandlers[actionName] = []
        actionHandlers[actionName].push(dispatch => this[methodName](dispatch))

        // add the reducer function
        // iterate over all of our handlers and return the next state
        if (!reducers[actionName]) {
          reducers[actionName] = (state, payload) => {
            actionHandlers[actionName].forEach(
              handler => handler(payload)
            )
            return this.state
          }
        }
      })

      return reducers
    }, {})
  }

  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState)
  }

  replaceState(nextState) {
    this.state = nextState
  }
}
