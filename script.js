/* Music Player (Part Three) */

const playlistContainerTag = document.getElementsByClassName(
  "playlistContainer"
)[0];

const currentAndTotalTimeTag = document.getElementsByClassName(
  "currentAndTotalTime"
)[0];

const currentProgressTag = document.getElementById("currentProgress");
const audioTag = document.getElementsByClassName("audioTag")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
  { trackId: "music/Chemical Game(MP3_320K).mp3", title: "Chemical Game" },
  { trackId: "music/Dejavu(MP3_320K).mp3", title: "Dejavu" },
  {
    trackId: "music/Superman(MP3_320K).mp3",title: "Superman"},
  { trackId: "music/ခိုငယ်တစ်ကောင်ရဲ့ ခဲဒဏ်ရာ(MP3_320K).mp3", title: "ခိုငယ်တစ်ကောင်ရဲ့ ခဲဒဏ်ရာ" },
  { trackId: "music/စွဲ(MP3_320K).mp3", title: "စွဲ " },
  { trackId: "music/နောက်ဆုံးညနေ(MP3_320K).mp3", title: "နောက်ဆုံးညနေ " },
  { trackId: "music/အနီရောင်မီးခြစ်(MP3_320K).mp3", title: "အနီရောင်မီးခြစ် " },
  { trackId: "music/အမေ့အသက်(MP3_320K).mp3", title: "အမေ့အသက် " },
  { trackId: "music/အမေ့အိမ်(MP3_320K).mp3", title: "အမေ့အိမ် " },
  { trackId: "music/အိပ်နေရင်းနဲ့လမ်းလျှောက်တဲ့ရောဂါ(MP3_320K).mp3", title: "အိပ်နေရင်းနဲ့လမ်းလျှောက်တဲ့ရောဂါ " },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
    currentPlayingIndex = i;
    playSong();
  });
  trackTag.classList.add("trackItem");
  const title = (i + 1).toString() + ". " + tracks[i].title;
  trackTag.textContent = title;
  playlistContainerTag.append(trackTag);
}

let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration); // 147.92938
  durationText = createMinuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audioTag.currentTime); // 147.3949
  const currentTimeText = createMinuteAndSecondText(currentTime);
  const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
  currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText;
  updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
  const currentProgressWidth = (500 / duration) * currentTime;
  currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

const createMinuteAndSecondText = (totalSecond) => {
  const minutes = Math.floor(totalSecond / 60);
  const seconds = totalSecond % 60;

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    playSong();
  } else {
    audioTag.play();
    updatePlayAndPauseButton();
  }
});

pauseButtonTag.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === 0) {
    return;
  }
  currentPlayingIndex -= 1;
  playSong();
});

nextButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length - 1) {
    return;
  }
  currentPlayingIndex += 1;
  playSong();
});

const playSong = () => {
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  updatePlayAndPauseButton();
};

const updatePlayAndPauseButton = () => {
  if (isPlaying) {
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "inline";
  } else {
    playButtonTag.style.display = "inline";
    pauseButtonTag.style.display = "none";
  }
};
