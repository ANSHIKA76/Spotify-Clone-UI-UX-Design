console.log('Lets write JavaScript');

let currentSong = new Audio();
let songs = [
    { songName: "Goat", filePath: "songs/Goat.mp3", coverPath: "cover/Goat.jpg" },
    { songName: "Lagdi Lahore Di", filePath: "songs/Lagdi Lahore Di.mp3", coverPath: "cover/Lagdi Lahore Diya.jpeg" },
    { songName: "Shayad", filePath: "songs/Shayad Love Aaj Kal.mp3", coverPath: "cover/Shayad.jpeg" },
    { songName: "Tauba Tauba", filePath: "songs/Tauba Tauba.mp3", coverPath: "cover/Tauba Tauba.jpg" },
    { songName: "Raataan Lambiyan", filePath: "songs/Raataan Lambiyan.mp3", coverPath: "cover/raat.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "cover/Chill.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "cover/Funky.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "cover/Karan.jpg" },
]

// Function to convert seconds to MM:SS format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to load and display songs
function loadSongs() {
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = ""; // Clear the list

    songs.forEach((song, index) => {
            
        songUL.innerHTML += `<li data-index="${index}">
        <img class="invert" src="music.svg" alt="">
        <div class="songName">${song.songName} </div>
       <img class="invert" src="play.svg" alt="">
        </li>`;
    });

    // Attach event listeners to each song item
    document.querySelectorAll(".songList li").forEach((element) => {
        element.addEventListener("click", () => {
            let songIndex = parseInt(element.dataset.index);
            playMusic(songIndex);
        });
});
}

// Function to play a song
const playMusic = (index, pause = false) => {
    let song = songs[index];
    currentSong.src = song.filePath;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = song.songName;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};





function loadCovers() {
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = ""; // Clear previous content

    songs.forEach((song, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index", index);

        card.innerHTML = `
            <div class="play" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <!-- Bright Green Circular Background -->
    <circle cx="16" cy="16" r="16" fill="#1fdf64"/>  
    
    <!-- Centered Black Arrow -->
    <g transform="translate(4,4)">
        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" 
        stroke="black" stroke-width="1.5" stroke-linejoin="round" fill="black"/>
    </g>
</svg>

            </div>
            <img class="coverImage" src="${song.coverPath}" alt="Cover Image">
            <h2>${song.songName}</h2>
        `;

        let playButton = card.querySelector(".play");
     //   let coverImage = card.querySelector(".coverImage");

        // Show play button when cover is clicked
        card.addEventListener("mouseover", () => {
            document.querySelectorAll(".play").forEach(btn => btn.style.display = "none"); // Hide others
            playButton.style.display = "block";
        });

        // Play song when play button is clicked
        playButton.addEventListener("click", () => {
            playSong(index);
            playButton.style.display = "none"; // Hide after clicking
        });

        cardContainer.appendChild(card);
    });
}
function playSong(index,pause=false) {
    let song = songs[index];
    currentSong.src = song.filePath;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    
    // Update song info in the above bar
    let songInfo = document.querySelector(".songinfo");
    if (songInfo) {
        songInfo.textContent = songs[index].songName;
    }
}







document.addEventListener("DOMContentLoaded", () => {
    loadCovers();
    
});

// Main function
function main() {
    loadSongs(); // Load song list
    playMusic(0, true); // Play first song in paused state
    loadCovers();
    playSong(0,true);

    // Play/pause functionality
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })


    // Update song time and progress
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar functionality
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Hamburger menu toggle
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous song button
    document.querySelector("#previous").addEventListener("click", () => {
        let index = songs.findIndex(song => currentSong.src.includes(song.filePath));
        if (index > 0) {
            playMusic(index - 1);
        }
    });
    //Next Song button
    document.querySelector("#next").addEventListener("click", () => {
        let index = songs.findIndex(song => currentSong.src.includes(song.filePath));
        if (index < songs.length - 1) {
            playMusic(index + 1);
        }
    });
    

    // Volume control
    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume img").src = currentSong.volume > 0 ? "volume.svg" : "mute.svg";
    });

    // Mute/unmute button
    document.querySelector(".volume img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();
