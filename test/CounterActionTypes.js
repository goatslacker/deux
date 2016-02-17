import { createActionTypes } from '../src'

export default createActionTypes('counter', ['incremented', 'test'], {
  twentyfive() {
    return 25
  },
})
