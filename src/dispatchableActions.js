export default (dispatch, actions) => {
  return Object.keys(actions).reduce((obj, action) => {
    obj[action] = x => dispatch(actions[action](x))
    return obj
  }, {})
}
