export default (obj) => {
  if (!obj || !obj.hasOwnProperty('state')) {
    throw new ReferenceError(
      'Invalid reducer definition passed in, a reducer must be an object ' +
      'that has state defined'
    )
  }

  // save a copy of state so we can update it later without it colliding
  // with other store creations of the same definition
  let state = obj.state

  const { mapActionTypes } = obj
  const boundListeners = {}
  const actions = Object.keys(mapActionTypes || {}).reduce((o, actionHandlerName) => {
    // turn the action types into an array so we can uniformly iterate through
    const types = Array.isArray(mapActionTypes[actionHandlerName])
      ? mapActionTypes[actionHandlerName]
      : [mapActionTypes[actionHandlerName]]

    const actionNames = {}

    // add each action type to our action listeners
    types.forEach((action, idx) => {
      if (!action) {
        throw new ReferenceError(
          `Action type #${idx} does not exist for ` +
          `definition '${actionHandlerName}'`
        )
      }
      const { type } = action

      const actionType = type || action

      if (typeof actionType !== 'string') {
        throw new TypeError('An unknown action type was passed in')
      }

      if (!o[actionType]) o[actionType] = []

      // if the action listener does not exist, throw a helpful error
      if (!obj[actionHandlerName]) {
        throw new ReferenceError(
          `'${actionHandlerName}' was declared as an action ` +
          'listener but was not defined as a reducer'
        )
      }

      if (actionNames[actionType]) {
        throw new Error(`${actionType} has already been declared once`)
      }

      o[actionType].push(obj[actionHandlerName])

      actionNames[actionType] = 1
      boundListeners[actionHandlerName] = 1
    })

    return o
  }, {})

  // check to make sure everything defined has been declared
  Object.keys(obj).forEach((method) => {
    // whitelist these methods
    if (
      method === 'on' ||
      method === 'mapActionTypes' ||
      method === 'state' ||
      method === 'reduce'
    ) return

    if (!boundListeners[method]) {
      throw new ReferenceError(
        `'${method}' was defined but was not declared as an action handler ` +
        'in mapActionTypes'
      )
    }
  })

  return (currenState = state, dispatch = {}) => {
    // if no dispatch type then just getState
    if (!dispatch.type) return state

    const reducer = actions[dispatch.type]

    const events = []

    if (obj.on && obj.on.before) events.push(obj.on.before)

    // if there is a reducer then push all possible matching reducers
    if (reducer) events.push.apply(events, reducer)
    else if (obj.reduce) events.push(obj.reduce)

    if (obj.on && obj.on.after) events.push(obj.on.after)

    // go through every event, lifecycle included, and output the resulting
    // state after reducing it
    // we update the state so we can reference it via
    // function call later
    return (state = events.reduce((res, f) => {
      const value = f(res, dispatch.payload, dispatch)
      if (value !== undefined) return value
      return res
    }, currenState))
  }
}
