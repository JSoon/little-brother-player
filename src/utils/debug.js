const version = (...params) => {
  params = Array.prototype.slice.call(params).join(' ')

  console.log(`%c${params}`, 'background: #222; color: #bada55')
}

const log = (...params) => {
  params = Array.prototype.slice.call(params).join(' ')

  console.log(`%c${params}`, 'background: transparent; color: #03a9f4')
}

const warn = (...params) => {
  params = Array.prototype.slice.call(params).join(' ')

  console.log(`%c${params}`, 'background: transparent; color: #ffc107')
}

const error = (...params) => {
  params = Array.prototype.slice.call(params).join(' ')

  console.log(`%c${params}`, 'background: transparent; color: #f44336')
}

export {
  version,
  log,
  warn,
  error
}