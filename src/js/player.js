import './version'
import dom from './dom'

const {
  videoEleWrapper,
  videoEle,
  UIEle
} = dom('J_LittleBrotherPlayer')

const medias = [{
  src: '/src/test/movie.ogv',
  type: 'video/ogg'
}]

medias.forEach(media => {
  const srcEle = document.createElement('source')
  srcEle.src = media.src
  srcEle.type = media.type
  videoEle.appendChild(srcEle)
})
videoEle.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded videos.`))

videoEle.play()