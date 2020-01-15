/**
 * @description Helper function that deals with catching error of async/await, inspired by await-to-js and node.js async callback
 * 
 * https://github.com/scopsy/await-to-js
 * https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 * 
 * @param {promise} promise
 * @returns Promise
 */

export default async (promise) => {
  return promise
    .then(data => {
      // ...
      return [null, data]
    })
    .catch(err => {
      // ...
      Utils.debug.error(err)
      return [err]
    })
}