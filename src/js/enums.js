/**
 * @description Enums
 */

//#region className

const prefix = 'little-brother-player'
const className = {
  player: prefix,
  playerWrapper: `${prefix}-wrapper`,
  ui: `${prefix}-ui`,
  ctrlBar: `${prefix}-ctrl-bar`,
  play: `${prefix}-ctrl-play-btn`
}

//#endregion

//#region MIME type

const MIME = {
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  ogg: 'video/ogg',
  m3u8: 'application/x-mpegURL', // or vnd.apple.mpegURL
  ts: 'video/MP2T'
}

//#endregion

export {
  className,
  MIME
}