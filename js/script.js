let pick = document.querySelector(".portfolio");
let icons = document.querySelector(".Icons_text h2");
let slider = document.querySelector(".slider");
let navLinks = document.querySelectorAll(".nav_ul li a");

window.addEventListener("scroll", function() {
    let value = window.scrollY;
    let width = window.innerWidth;

    let portfolioTime, iconsTime, aboutTime, projectsTime, contactTime;

    if (width <= 880) { 
        portfolioTime = 180;  
        iconsTime = 1500;     
        aboutTime = 600;      
        projectsTime = 2500;
        contactTime = 4700;
    } else {
        portfolioTime = 600;  
        iconsTime = 2100;     
        aboutTime = 1000;     
        projectsTime = 3900;  
        contactTime = 6700;
    }

    // 1. Portfolio & Icons 애니메이션
    if (value < portfolioTime) {
        pick.style.animation = 'portfolio_unPick 0.5s ease-out forwards';
    } else {
        pick.style.animation = 'portfolio_pick 1s ease-in-out forwards';
    }

    if (value < iconsTime) {
        icons.style.animation = 'Icons_unPick 0.5s ease-out forwards';
    } else {
        icons.style.animation = 'Icons_pick 0.7s ease-in-out forwards';
    }

    let currentPos = "";
    if (value > contactTime) {
        currentPos = "pos-contact";
    } else if (value > projectsTime) {
        currentPos = "pos-projects";
    } else if (value > aboutTime) {
        currentPos = "pos-about";
    }else {
        currentPos = "pos-welcome";
    }
    // nav바 스트레치
    if (!slider.classList.contains(currentPos)) {
        slider.classList.add("stretching");
        
        // 이동 애니메이션 시간에 맞춰 제거
        setTimeout(() => {
            slider.classList.remove("stretching");
        }, 300);
    }

    // 슬라이더 위치
    slider.classList.remove("pos-welcome", "pos-about", "pos-projects", "pos-contact");
    slider.classList.add(currentPos);

    navLinks.forEach((link, index) => {
        link.style.color = "#555"; // 초기화
        if (currentPos === "pos-contact" && index === 3) link.style.color = "white";
        else if (currentPos === "pos-projects" && index === 2) link.style.color = "white";
        else if (currentPos === "pos-about" && index === 1) link.style.color = "white";
        else if (currentPos === "pos-welcome" && index === 0) link.style.color = "white";
    });
});
//음악 플레이어
const songs = [
  { title: "Meshuggah - Bleed", audio: "./Bleed.mp3", cover: "./images/obzen_cover.jpg" },
  { title: "Meshuggah - Swarm", audio: "./Swarm.mp3", cover: "./images/koloss.jpg" },
  { title: "Renai Circulation", audio: "./Renai_Circulation.mp3", cover: "./images/renai.jpg" }
];

let songIndex = 0; // 현재 재생 중인 노래 번호 (0부터 시작)

const music = document.getElementById("myAudio");
const albumArt = document.getElementById("albumArt");
const songTitle = document.querySelector("h3");
const playBtn = document.getElementById("playBtn");

// 노래 로드 함수
function loadSong(song) {
  songTitle.innerText = song.title;
  music.src = song.audio;
  albumArt.src = song.cover;
}

// 이전 곡으로 이동
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1; // 처음이면 마지막 곡으로
  loadSong(songs[songIndex]);
  playMusic();
}

// 다음 곡으로 이동
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0; // 마지막이면 첫 곡으로
  loadSong(songs[songIndex]);
  playMusic();
}

// 재생/일시정지
function toggleMusic() {
  if (music.paused) playMusic();
  else pauseMusic();
}

function playMusic() {
  music.play();
  albumArt.classList.add("playing");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseMusic() {
  music.pause();
  albumArt.classList.remove("playing");
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}
music.addEventListener('ended', nextSong);