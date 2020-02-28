/**
 * @description Manipulate browser local storage for player states consistent storage.
 * Note: This is a simple implementation version, pls see more on the documents.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 * 
 */

const localStorage = (params) => {

  if (!storageAvailable('localStorage')) {
    // Too bad, no localStorage for us
    throw 'Too bad, no localStorage for us!'
  }

  // Public variables
  const API = {}

  // Private variables
  const LS = window.localStorage
  const expires = 'expires'

  API.get = get
  /**
   * @description Get local storage item
   * 
   * @param {string}  key  key name
   * 
   * @returns {any}   The primitive type data value
   */
  function get(key) {

    // Deal with expired item
    const keyExpires = LS.getItem(`${key}_${expires}`)
    if (new Date().getTime() > keyExpires) {
      // Remove item
      remove(key)
      remove(`${key}_${expires}`)
      return undefined
    }

    return JSON.parse(LS.getItem(key))
  }

  API.set = set
  /**
   * @description Set local storage item
   * 
   * @param {number}  ttl  Time to live in seconds, default to 100 years :p (just consider it infinite)
   */
  function set(key, value, ttl = 100 * 365 * 24 * 60 * 60) {

    if (!key) {
      throw 'You must set a key name before you store or update it!'
    }

    // Convert seconds to milliseconds
    ttl = ttl * 1000
    // Calculate the expires
    const keyExpires = new Date().getTime() + ttl

    LS.setItem(key, JSON.stringify(value))
    LS.setItem(`${key}_${expires}`, keyExpires)

    return value

  }

  API.remove = remove

  function remove(key) {
    return LS.removeItem(key)
  }

  API.clear = clear

  function clear() {
    return LS.clear()
  }

  API.onStorageChange = onStorageChange

  function onStorageChange(cb = () => {}) {
    // https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
    // IDL bellow:
    // void initStorageEvent(
    //   in DOMString type,
    //   in boolean canBubble,
    //   in boolean cancelable,
    //   in DOMString key,
    //   in DOMString oldValue,
    //   in DOMString newValue,
    //   in USVString url,
    //   in nsIDOMStorage storageArea
    // );
    /**
     * Note: This won't work on the same page that is making the changes —
     * it is really a way for other pages on the domain using the storage to sync any changes that are made.
     * Pages on other domains can't access the same storage objects.
     */
    window.addEventListener('storage', function (e) {
      cb(e)
    })
  }

  return API

}


function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

export default localStorage()