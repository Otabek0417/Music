const audio = document.querySelector("audio");
const image = document.querySelector(".cover");
const title = document.querySelector(".title");
const btnPlay = document.querySelector(".btn-big");
const container = document.querySelector(".container");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");
const body = document.querySelector("body");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const volumeInput = document.querySelector("#volume");
const span = document.querySelector("#span-volume");
const volumeIcon = document.querySelector("#volume-icon");

// const imgContainer = document.querySelector(".img-container");

// Boshlang'ich fayl
const songs = [
  "Xcho - Ты и я",
  "Шоколад - Kenjebek Nurdolday",
  "Дама",
  "НА РАХАТЕ",
  "Фогель - Богатыми 2 (mp3zen.net)",
];
let songIndex = 0;

// Btn play
btnPlay.addEventListener("click", () => {
  const isPlay = container.classList.contains("play");
  if (isPlay) {
    pause();
  } else {
    play();
  }
});

// Btn Next
btnNext.addEventListener("click", nextSong);
btnPrev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", progres);
progressContainer.addEventListener("click", setProgress);
// volumeInput.addEventListener("input", (e) => {
// });
// Play Pause Next Functions
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  updateSong();
}

// Prev
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  updateSong();
}
// Play Pause
function play() {
  container.classList.add("play");
  audio.play();
  btnPlay.innerHTML = ` <i class="fas fa-pause"></i>`;
}
function pause() {
  container.classList.remove("play");
  audio.pause();
  btnPlay.innerHTML = ` <i class="fas fa-play"></i>`;
}

// Musiqa  yangilanishi
function updateSong() {
  audio.src = `./musics/${songs[songIndex]}.mp3`;
  image.src = `./album/${songs[songIndex]}.jpg`;
  title.textContent = songs[songIndex];
  if ((isPlay = container.classList.contains("play"))) {
    audio.play();
  }
}

// Progress function
function progres(e) {
  // Tugash qismi
  let duration = e.srcElement.duration;
  let currentTime = Math.trunc(e.srcElement.currentTime);
  //
  let endMin = Math.trunc(duration / 60);
  let endSec = Math.trunc(duration - endMin * 60);
  //
  endMin = endMin < 10 ? "0" + endMin : endMin;
  endSec = endSec < 10 ? "0" + endSec : endSec;

  document.querySelector("#end").textContent = `${endMin}:${endSec}`;

  // Boshlang'ich qismi
  let startMin = Math.trunc(currentTime / 60);
  let startSec = Math.trunc(currentTime - 60 * startMin);
  //

  if (startSec > 59) {
    startMin++;
    startSec = currentTime - startMin * 60;
  }
  startSec = startSec < 10 ? "0" + startSec : startSec;
  document.querySelector("#start").textContent = `0${startMin}:${startSec}`;
  progress.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
  let duration = audio.duration;
  let offsetX = e.offsetX;
  let width = this.clientWidth;
  audio.currentTime = (offsetX / width) * duration;
}

volumeInput.addEventListener("input", () => {
  audio.volume = volumeInput.value / 10;
  if (volumeInput.value == 0) {
    span.innerHTML = ` <i id="volume-icon" class="fas fa-volume-mute"></i>`;
  } else if (volumeInput.value < 5 && volumeInput.value > 0) {
    span.innerHTML = ` <i id="volume-icon" class="fas fa-volume-low"></i>`;
  } else {
    span.innerHTML = ` <i id="volume-icon" class="fas fa-volume-high"></i>`;
  }
});

volumeIcon.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-volume-high")) {
    e.target.classList.remove("fa-volume-high");
    e.target.classList.add("fa-volume-mute");
  } else {
    e.target.classList.remove("fa-volume-mute");
    e.target.classList.add("fa-volume-high");
  }
});
