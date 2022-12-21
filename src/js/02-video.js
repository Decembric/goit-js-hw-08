import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage.length !== 0) {
  player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))
} 

player.on('timeupdate', throttle(onPlay, 1000));
function onPlay({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds)
}

