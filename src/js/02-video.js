import Player from '@vimeo/player';
import { values } from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

playTime();

function stopTime(event) {
  // console.log(typeof event.seconds);
  const value = event.seconds;
  localStorage.setItem(STORAGE_KEY, value);
  console.log(Number(localStorage.getItem(STORAGE_KEY, value)));
}

player.on('timeupdate', throttle(stopTime, 1000));

function playTime() {
  player
    .setCurrentTime(Number(localStorage.getItem(STORAGE_KEY)))
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'The time was less than 0 or greater than the videos duration'
          );
          break;

        default:
          console.log('There must have been error');
          break;
      }
    });
}
