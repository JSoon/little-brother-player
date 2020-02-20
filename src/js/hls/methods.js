/**
 * @description hls.js methods
 * 
 * @param {object}  params
 * @param {object}  params.hls        hls instance
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

export default (params) => {

  const {
    hls,
    settings,
    api,
    dom
  } = params

  const hlsAPI = {}

  //#region Getters

  hlsAPI.getLevels = getLevels

  function getLevels() {
    return hls.levels
  }

  hlsAPI.getCurrentLevel = getCurrentLevel

  function getCurrentLevel() {
    // -1 represents automatic level selection
    return hls.currentLevel
  }

  hlsAPI.getCurrentLevelInfo = getCurrentLevelInfo

  function getCurrentLevelInfo() {
    return getLevels()[getCurrentLevel()]
  }

  hlsAPI.getNextLevel = getNextLevel

  function getNextLevel() {
    return hls.nextLevel
  }

  hlsAPI.getLoadLevel = getLoadLevel

  function getLoadLevel() {
    return hls.loadLevel
  }

  hlsAPI.getNextLoadLevel = getNextLoadLevel

  function getNextLoadLevel() {
    return hls.nextLoadLevel
  }

  hlsAPI.getFirstLevel = getFirstLevel

  function getFirstLevel() {
    return hls.firstLevel
  }

  hlsAPI.getStartLevel = getStartLevel

  function getStartLevel() {
    // Default value is hls.firstLevel
    return hls.startLevel
  }

  hlsAPI.getAutoLevelEnabled = getAutoLevelEnabled

  function getAutoLevelEnabled() {
    return hls.autoLevelEnabled
  }

  hlsAPI.getAutoLevelCapping = getAutoLevelCapping

  function getAutoLevelCapping() {
    // Default value is -1 (no level capping)
    return hls.autoLevelCapping
  }

  hlsAPI.getCapLevelToPlayerSize = getCapLevelToPlayerSize

  function getCapLevelToPlayerSize() {
    // Default value is set via capLevelToPlayerSize in config
    return hls.capLevelToPlayerSize
  }

  hlsAPI.getBandwidthEstimate = getBandwidthEstimate

  function getBandwidthEstimate() {
    // Returns the current bandwidth estimate in bits/s, if available. Otherwise, NaN is returned
    return hls.bandwidthEstimate
  }

  //#endregion

  //#region Setters

  hlsAPI.setCurrentLevel = setCurrentLevel

  function setCurrentLevel(level) {
    // Set to -1 for automatic level selection
    hls.currentLevel = level
  }

  hlsAPI.setNextLevel = setNextLevel

  function setNextLevel(level) {
    // Set to -1 for automatic level selection
    hls.nextLevel = level
  }

  hlsAPI.setLoadLevel = setLoadLevel

  function setLoadLevel(level) {
    // Set to -1 for automatic level selection
    hls.loadLevel = level
  }

  hlsAPI.setNextLoadLevel = setNextLoadLevel

  function setNextLoadLevel(level) {
    hls.nextLoadLevel = level
  }

  hlsAPI.setStartLevel = setStartLevel

  function setStartLevel(level) {
    // Set to -1 for automatic level selection
    hls.startLevel = level
  }

  hlsAPI.setAutoLevelCapping = setAutoLevelCapping

  function setAutoLevelCapping(level) {
    hls.autoLevelCapping = level
  }

  hlsAPI.setCapLevelToPlayerSize = setCapLevelToPlayerSize

  function setCapLevelToPlayerSize(enabled) {
    hls.capLevelToPlayerSize = enabled
  }

  //#endregion

  return hlsAPI

}