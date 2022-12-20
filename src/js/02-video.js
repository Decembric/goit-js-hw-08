import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const storage = {}
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))


if (storage !== null) {
  player.on('timeupdate', throttle(onPlay, 1000));
  function onPlay({ seconds }) {
   storage = localStorage.setItem('videoplayer-current-time', seconds)
  }
}
