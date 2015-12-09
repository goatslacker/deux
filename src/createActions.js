export default (namespace, actions) => {
  return actions.reduce((obj, action) => {
    const key = `${namespace}/${action}`
    obj[action] = x => ({
      type: key,
      payload: x,
    })
    obj[action].id = key
    return obj
  }, {})
}
