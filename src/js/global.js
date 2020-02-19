/**
 * @description Global module that reserves reference objects so that you do not need to pass params
 * into some modules like components.
 */

const Global = () => {
  const objects = {}

  console.log('Global', objects)

  return objects
}


export default Global()