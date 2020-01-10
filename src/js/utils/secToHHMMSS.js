import _typeof from './typeof'

/**
 * @description Convert seconds to HH:MM:SS format
 * Note: limitation: the duration cannot be more than 24 hours (it'll overflow to next day)
 */

export default (seconds) => {
  if (_typeof(seconds) !== 'number') {
    throw 'Argument must be a number!'
  }
  return new Date(Math.floor(seconds * 1000)).toISOString().substr(11, 8).replace(/^0{2}\:/, '')
}