export default (namespace, actionNames, moreActions = {}) => {
  const allActions = actionNames.concat(Object.keys(moreActions))

  return allActions.reduce((obj, actionName) => {
    const type = `${namespace}/${actionName}`
    const action = moreActions[actionName]

    if (action) {
      obj[actionName] = payload => ({ type, payload: action(payload) })
    } else {
      obj[actionName] = payload => ({ type, payload })
    }

    obj[actionName].type = type
    return obj
  }, {})
}
