// Connected the library "@vimeo/player"
import Player from '@vimeo/player';

// Connected the library "lodash.throttle"
import throttle from 'lodash.throttle';

// Make key for localStorage
const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

// Link on the <iframe> element of HTML document
const iframeEl = document.getElementById('vimeo-player');

// Criate the video-player
const iframePlayer = new Player(iframeEl);

// Set video start parameters
iframePlayer.on('timeupdate', throttle(handleCurrentTimeValue, 1000));

// Save current video-player time in localStorage
iframePlayer.setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME) || 0);

// Set 
function handleCurrentTimeValue({ seconds }) {
  localStorage.setItem(PLAYER_CURRENT_TIME, seconds);
}
