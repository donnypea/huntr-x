const songs = Array.from(document.querySelectorAll('#song-list li'));
const modal = document.getElementById('music-modal');
const audio = document.getElementById('audio');
const nowPlaying = document.getElementById('now-playing');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const closeBtn = document.querySelector('.close');

let currentSongIndex = -1;

function loadSong(index) {
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];
  const src = song.dataset.src;
  const title = song.textContent;

  audio.src = src;
  nowPlaying.textContent = `Now Playing: ${title}`;
  audio.load();        // Ensures it resets before playing
  audio.play();
  currentSongIndex = index;

  // Show modal if hidden
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
  }
}

// 🎵 Open modal on song click
songs.forEach((li, index) => {
  li.addEventListener('click', () => loadSong(index));
});

// ▶️ Play / ⏸ Pause
playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());

// ⏭ Next
nextBtn.addEventListener('click', () => {
  const nextIndex = (currentSongIndex + 1) % songs.length;
  loadSong(nextIndex);
});

// ⏮ Previous
prevBtn.addEventListener('click', () => {
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
});

// ❌ Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  audio.pause();
  audio.currentTime = 0;
});

// 🖱 Click outside to close
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    audio.pause();
    audio.currentTime = 0;
  }
});
