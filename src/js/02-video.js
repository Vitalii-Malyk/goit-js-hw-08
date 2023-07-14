import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
playTime();

const savedTimeStorage = {};

function stopTime(event) {
  console.log(event.seconds);
  savedTimeStorage = localStorage.setItem(STORAGE_KEY, event.seconds);
}

player.on('timeupdate', throttle(stopTime, 1000));

function playTime() {
  player
    .setCurrentTime(savedTimeStorage)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'the time was less than 0 or greater than the videos duration'
          );
          break;

        default:
          console.log('some other error occurred');
          break;
      }
    });
}
