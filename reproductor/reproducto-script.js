document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
  particles: {
    number: { value: 274, density: { enable: true, value_area: 800 } },
    color: { value: "#ffd100" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 16.03412060865523,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: "#ffffff",
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 3.206824121731046,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);


});

// =================================================================
// 1. REFERENCIAS DEL DOM Y DATOS
// =================================================================

const musicaAudio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('btn-play-pause');
const prevBtn = document.getElementById('btn-previus');
const nextBtn = document.getElementById('btn-next');
const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
const progressBarContainer = document.getElementById('barra-progres'); // El contenedor DIV
const progress = progressBarContainer.querySelector('.bar'); // El relleno de color
const tumb = progressBarContainer.querySelector('.tumb'); // El círculo (thumb)
const timeDisplay = document.getElementById('time-play');
const titleElement = document.querySelector('.titulo-cancion');
const artistElement = document.querySelector('.artista');

const arrayCanciones = [
    { titulo: "Sunday Morning", artista: "Maroon 5", src: "./sounds/Maroon 5 - Sunday Morning.mp3" },
    { titulo: "Colgando en tus manos", artista: "Carlos Baute", src: "./sounds/Carlos Baute - Colgando en tus manos (con Marta Sanchez).mp3" },
    { titulo: "First Times", artista: "Ed Sheeran", src: "./sounds/Ed Sheeran - First Times.mp3" }, 
    { titulo: "Todo no es casualidad", artista: "Dani J", src: "./sounds/Todo No Es Casualidad.mp3" }, 
    { titulo: "Solo quiero", artista: "Jonny Sky", src: "./sounds/Solo Quiero.mp3" }, 
    { titulo: "Can't Help Falling In Love", artista: "Twenty One Pilots", src: "./sounds/twenty one pilots - Can't Help Falling In Love.mp3" }, 
    { titulo: "Gone, Gone, Gone", artista: "Phillip Phillips", src: "./sounds/Gone, Gone, Gone - Phillip Phillips.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false; 

// =================================================================
// 2. FUNCIONES PRINCIPALES (PLAY/PAUSE/LOAD)
// =================================================================

function playSong(){
    musicaAudio.play();
    isPlaying = true;
    if (playPauseIcon){
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    }
}

function pauseSong(){
    musicaAudio.pause();
    isPlaying = false;
    if (playPauseIcon){
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

function loadSong(index){
    const song = arrayCanciones[index];
    musicaAudio.src = song.src;
    titleElement.textContent = song.titulo;
    artistElement.textContent = song.artista;
    
    // Si ya estaba reproduciendo, debe empezar a sonar la nueva
    if (isPlaying){
        // Usamos loadeddata para asegurarnos de que el audio cargue antes de reproducir
        musicaAudio.addEventListener('loadeddata', playSong, {once : true});
    }
}

// =================================================================
// 3. LISTENERS DE NAVEGACIÓN Y PLAY/PAUSE
// =================================================================

playPauseBtn.addEventListener('click', () => {
    if (isPlaying){
        pauseSong();      
    } else {
        playSong();
    }
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % arrayCanciones.length;
    loadSong(currentSongIndex); // CORREGIDO: Llamar a loadSong
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + arrayCanciones.length) % arrayCanciones.length;
    loadSong(currentSongIndex);
});

// =================================================================
// 4. LÓGICA DE TIEMPO Y PROGRESO (CSS WIDTH)
// =================================================================

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

musicaAudio.addEventListener("timeupdate", () => {
    if (!isNaN(musicaAudio.duration)){
        const percent = (musicaAudio.currentTime / musicaAudio.duration) * 100;
        
        // CORREGIDO: Usar CSS (width) para el progreso y el pulgar
        progress.style.width = `${percent}%`;
        tumb.style.left = `${percent}%`; 

        timeDisplay.textContent = `${formatTime(musicaAudio.currentTime)} / ${formatTime(musicaAudio.duration)}`;
    }

    // CORREGIDO: El evento es 'ended'
    if(musicaAudio.ended){
        nextBtn.click();
    }
});

// =================================================================
// 5. CONTROL DE BARRA DE PROGRESO PERSONALIZADA (CLIC Y ARRASTRE)
// =================================================================

let isSeeking = false;

function setSeekTime(e) {
    // 1. Obtener la posición del clic/arrastre dentro de la barra
    const width = progressBarContainer.clientWidth;
    const clickX = e.offsetX;
    
    // 2. Calcular el porcentaje de progreso (0 a 100)
    const percent = (clickX / width) * 100;

    // 3. Calcular el tiempo en segundos y aplicarlo al audio
    const seekTime = (percent / 100) * musicaAudio.duration;
    musicaAudio.currentTime = seekTime;

    // 4. Actualizar inmediatamente el CSS de la barra (para visualización)
    progress.style.width = `${percent}%`;
    tumb.style.left = `${percent}%`;
}

// Iniciar el arrastre (mousedown)
progressBarContainer.addEventListener('mousedown', (e) => {
    isSeeking = true;
    setSeekTime(e); // Aplica el cambio inmediatamente al hacer click
});

// Arrastrar (mousemove)
document.addEventListener('mousemove', (e) => {
    if (isSeeking) {
        // Debemos calcular la posición relativa al contenedor, incluso si el mouse sale
        const rect = progressBarContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;
        
        // Limita el offsetX para que no se salga de 0% o 100%
        const clickX = Math.max(0, Math.min(offsetX, width));

        const percent = (clickX / width) * 100;
        const seekTime = (percent / 100) * musicaAudio.duration;
        
        musicaAudio.currentTime = seekTime;
        progress.style.width = `${percent}%`;
        tumb.style.left = `${percent}%`;
    }
});

// Detener el arrastre (mouseup)
document.addEventListener('mouseup', () => {
    isSeeking = false;
});


// =================================================================
// 6. INICIALIZACIÓN
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Asegurarse de que el audio tenga una duración válida al inicio
    musicaAudio.addEventListener('loadedmetadata', () => {
        timeDisplay.textContent = `0:00 / ${formatTime(musicaAudio.duration)}`;
    }, { once: true });
    
    loadSong(currentSongIndex); 
});


