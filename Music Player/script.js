const music = [
    {id: "1", name: "My War", anime: "Attack on Titan", img: "images/Attack on Titan.png", src: "music/Attack on Titan.mp3"},
    {id: "2", name: "Bon Appétit S", anime: "Blend S", img: "images/Blend S.jpg", src: "music/Blend S.mp3"},
    {id: "3", name: "Gurenge", anime: "Demon Slayer", img: "images/Demon Slayer.jpg", src: "music/Demon Slayer.mp3"},
    {id: "4", name: "Golden Wind", anime: "JoJo's Bizzare Adventure", img: "images/Giorono.jpg", src: "music/JoJo's Bizarre Adventure.mp3"},
    {id: "5", name: "Kaikai Kitan", anime: "Jujutsu Kaisen", img: "images/Jujutsu Kaisen.jpg", src: "music/Jujutsu Kaisen.mp3"},
    {id: "6", name: "Nippon Egao Hyakkei", anime: "Joshiraku", img: "images/Joshiraku.jpg", src: "music/Joshiraku.mp3"},
    {id: "7", name: "Shilouette", anime: "Naruto", img: "images/Naruto.jpg", src: "music/Naruto.mp3"},
    {id: "8", name: "Hey Kids!", anime: "Noragami", img: "images/Noragami.png", src: "music/Noragami.mp3"},
    {id: "9", name: "Renai Circulation", anime: "Bakemonogatari", img: "images/Renai Circulation.jpg", src: "music/Renai Circulation.mp3"},
    {id: "10", name: "Unravel", anime: "Tokyo Ghoul", img: "images/Tokyo Ghoul.jpg", src: "music/Tokyo Ghoul.mp3"}
];

const volumeSlider = document.querySelector(".volumeSlider");
const volumeUp = document.querySelector(".volumeUp");
const volumeOff = document.querySelector(".volumeOff");
const loveIcon = document.querySelector(".loveIcon");
const loveIconFill = document.querySelector(".loveIconFill");

const imageArea = document.querySelector(".imageArea img")
const songName = document.querySelector(".songDetail .name");
const songAnime = document.querySelector(".songDetail .anime");
const audio = document.querySelector(".audio");

const progressArea = document.querySelector(".progressArea");
const progressBar = document.querySelector(".progressBar");

const currentText = document.querySelector(".current");
const durationText = document.querySelector(".duration");

const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");

const repeatBtn = document.querySelector(".repeat");

const queueBtn = document.querySelector(".queue");
const closeBtn = document.querySelector(".close");

const musicList = document.querySelector(".musicList");
const ul = document.querySelector("ul");

// Play music function
const playMusic = (indexNumber) => {
    audio.src = music[indexNumber].src;
    audio.play();
    imageArea.src = music[indexNumber].img;
    songName.textContent = music[indexNumber].name;
    songAnime.textContent = music[indexNumber].anime;
}

// Play random music when reload
let musicIndex = Math.floor(Math.random() * music.length);
window.addEventListener("load", () => {
    audio.src = music[musicIndex].src;
    imageArea.src = music[musicIndex].img;
    songName.textContent = music[musicIndex].name;
    songAnime.textContent = music[musicIndex].anime;
})

// Volume bar
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
    if(audio.volume === 0){
        volumeUp.style.display = "none";
        volumeOff.style.display = "inline";
    } else{
        volumeUp.style.display = "inline";
        volumeOff.style.display = "none";
    }
})

// Love icon
loveIcon.addEventListener("click", () => {
    loveIcon.style.display = "none";
    loveIconFill.style.display = "inline";
    loveIconFill.setAttribute("title","Added to favorite")
})
loveIconFill.addEventListener("click", () => {
    loveIconFill.style.display = "none";
    loveIcon.style.display = "inline";
})

// Music progress bar
const updateProgressBar = () => {
    const duration = Math.floor(audio.duration).toString();
    const currentTime = Math.floor(audio.currentTime).toString();
    progressBar.style.width = ((progressArea.clientWidth / duration) * currentTime) + "px";
};
// Update playing music currentTime according to the clicked progress bar width
progressArea.addEventListener("click", (event) => {
    const clickedOffsetX = event.offsetX;
    const duration = Math.floor(audio.duration).toString();
    audio.currentTime = ((clickedOffsetX / progressArea.clientWidth) * duration);
});

// Music current and duration Time
const updateCurrentAndDuration = (time) => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    const secondText = second < 10 ? "0" + second : second;

    return minute + ":" + secondText;
};
audio.addEventListener("loadeddata", () => {
    const duration = Math.floor(audio.duration).toString();
    durationText.textContent = updateCurrentAndDuration(duration);
});
audio.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audio.currentTime).toString();
    currentText.textContent = updateCurrentAndDuration(currentTime);
    updateProgressBar();
});

// Controls
// Update play and pause button
let isPlaying;
const updatePlayPauseButton = () => {
    if(isPlaying){
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    } else{
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    }
};
// Play button
playBtn.addEventListener("click", () => {
    isPlaying = true;
    updatePlayPauseButton();
    audio.play();
    playingMusic();
}) 
// Pause button
pauseBtn.addEventListener("click", () => {
    isPlaying = false;
    updatePlayPauseButton();
    audio.pause();
})
// Previous button
previousBtn.addEventListener("click", () => {
    musicIndex -= 1;
    if(musicIndex < 0){
        musicIndex = music.length - 1;
    }
    playMusic(musicIndex);
    isPlaying = true;
    updatePlayPauseButton();
    playingMusic();
})
// Next button
nextBtn.addEventListener("click", () => {
    musicIndex += 1;
    if(musicIndex > music.length - 1){
        musicIndex = 0;
    }
    playMusic(musicIndex);
    isPlaying = true;
    updatePlayPauseButton();
    playingMusic();
})

// Change repeat, loop, shuffle icons
repeatBtn.addEventListener("click", () => {
    let repeatBtnText = repeatBtn.textContent;
    switch (repeatBtnText) {
        case "repeat":
            repeatBtn.textContent = "repeat_one";
            repeatBtn.setAttribute("title","Song looped");
            break;
        case "repeat_one":
            repeatBtn.textContent = "shuffle";
            repeatBtn.setAttribute("title","Playlist shuffled");
            break;
        case "shuffle":
            repeatBtn.textContent = "repeat";
            repeatBtn.setAttribute("title","Playlist looped");
            break;
    };
});

// After music end
audio.addEventListener("ended", () => {
    let repeatBtnText = repeatBtn.textContent;
    switch (repeatBtnText) {
        case "repeat":
            musicIndex += 1;
            if(musicIndex > music.length - 1){
                musicIndex = 0;
            }
            playMusic(musicIndex);
            isPlaying = true;
            updatePlayPauseButton();
            playingMusic();
            break;

        case "repeat_one":
            audio.currentTime = 0;
            playMusic(musicIndex);
            isPlaying = true;
            updatePlayPauseButton();
            break;

        case "shuffle":
            let randomNumber = Math.floor(Math.random() * music.length);
            do{
                randomNumber = Math.floor(Math.random() * music.length);
            } 
            while (musicIndex === randomNumber);
            musicIndex = randomNumber;
            playMusic(musicIndex);
            isPlaying = true;
            updatePlayPauseButton();
            playingMusic();
            break;
    };
});

// Create music list
for(let i = 0; i < music.length; i++){
    const li = document.createElement("li");
    li.setAttribute("li-Index",`${i}`);
    
    const row = document.createElement("div");
    row.classList.add("row");

    const p1 = document.createElement("p");
    p1.append(music[i].name)

    const p2 = document.createElement("p");
    p2.append(music[i].anime);

    const span = document.createElement("span");
    span.classList.add("audioDurationText");

    const liAudio = document.createElement("audio");
    liAudio.src = music[i].src;

    // add music duration in music list
    liAudio.addEventListener("loadeddata", () => {
        const duration = Math.floor(liAudio.duration).toString();
        span.textContent = updateCurrentAndDuration(duration);
        span.setAttribute("duration", `${updateCurrentAndDuration(duration)}`);
    })

    // // change music/image/name/anime
    li.addEventListener("click", () => {
        musicIndex = i;
        playMusic(musicIndex);
        isPlaying = true;
        updatePlayPauseButton();
        playingMusic();
    });

    row.append(p1,p2)
    li.append(row,span,liAudio);
    ul.append(li);
};
// Change music duration and playing
const playingMusic = () => {
    const allLiTag = ul.querySelectorAll("li");
    for(let j = 0; j <  allLiTag.length; j++) {
        const audioDurationText = allLiTag[j].querySelector(".audioDurationText");

        if(allLiTag[j].classList.contains("playing")){
            audioDurationText.textContent = audioDurationText.getAttribute("duration");
            allLiTag[j].classList.remove("playing");
        };

        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            audioDurationText.textContent = "Playing";
            allLiTag[j].classList.add("playing");
        };
    };
};

// Music list show and hide
queueBtn.addEventListener("click", () => {
    musicList.classList.remove("hide")
    musicList.classList.add("show");
})
closeBtn.addEventListener("click", () => {
    musicList.classList.remove("show")
    musicList.classList.add("hide");
})