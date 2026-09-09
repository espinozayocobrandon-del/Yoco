
const CARD_PIN = "081810";
let enteredPin = "";
let attempts = 0;
let lockedUntil = 0;
function enterPin(number) {

    if (Date.now() < lockedUntil) {
        return;
    }

    if (enteredPin.length >= CARD_PIN.length) {
        return;
    }

    enteredPin += number;

    updatePinDots();

    if (enteredPin.length === CARD_PIN.length) {
        checkPin();
    }
}


function deletePin() {

    if (Date.now() < lockedUntil) {
        return;
    }

    enteredPin = enteredPin.slice(0, -1);

    updatePinDots();
}


function updatePinDots() {

    const dots = document.querySelectorAll("#pin-dots span");

    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }

    });
}


function checkPin() {

    const error = document.getElementById("pin-error");

    if (enteredPin === CARD_PIN) {

        // Correct PIN
        document.getElementById("pin-screen").style.display = "none";

        document.body.classList.add("unlocked");

        enteredPin = "";
        attempts = 0;

        updatePinDots();

    } else {

        attempts++;

        const pinBox = document.querySelector(".pin-box");

pinBox.classList.remove("shake");

void pinBox.offsetWidth;

pinBox.classList.add("shake");
      
        enteredPin = "";
        updatePinDots();

        if (attempts >= 5) {

            lockedUntil = Date.now() + 30000;

            error.textContent =
                "🔒 Too many attempts. Wait 30 seconds.";

            setTimeout(() => {
                error.textContent = "";
            }, 30000);

        } else if (attempts >= 3) {

            lockedUntil = Date.now() + 10000;

            error.textContent =
                "🔒 Too many attempts. Wait 10 seconds.";

            setTimeout(() => {
                error.textContent = "";
            }, 10000);

        } else {

            error.textContent =
                "❌ Incorrect PIN";

            setTimeout(() => {
                error.textContent = "";
            }, 1500);
        }
    }
}
  
const photos = document.querySelectorAll(".photo");
const carousel = document.getElementById("carousel");

let current = 0;
let startX = 0;

function updatePhotos() {

    const total = photos.length;

    photos.forEach((photo, i) => {

        let position = i - current;

        if (position > total / 2)
            position -= total;

        if (position < -total / 2)
            position += total;

        const spacing = window.innerWidth <= 600 ? 125 : 170;

        const x = position * spacing;
        const y = Math.abs(position) * 20;

        let scale;

        if (position === 0) {
            scale = 1;
        } else if (Math.abs(position) === 1) {
            scale = 0.72;
        } else {
            scale = 0.5;
        }

        photo.style.transform =
            `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale})`;

        photo.style.zIndex =
            100 - Math.abs(position);

        photo.style.opacity =
            Math.abs(position) > 2 ? 0 : 1;

    });
}


function nextPhoto() {
    current = (current + 1) % photos.length;
    updatePhotos();
}


// Previous
function previousPhoto() {
    current =
        (current - 1 + photos.length) %
        photos.length;

    updatePhotos();
}


let timer = setInterval(nextPhoto, 2000);


carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    clearInterval(timer);
});

carousel.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;

    if (Math.abs(distance) > 50) {

        if (distance < 0)
            nextPhoto();
        else
            previousPhoto();

    }

    timer = setInterval(nextPhoto, 2000);
});


photos.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        if (index !== current)
            return;

        const image = photo.querySelector("img");

        const fullscreen = document.createElement("div");

        fullscreen.className = "photo-fullscreen";

        fullscreen.innerHTML = `
            <span>×</span>
            <img src="${image.src}">
        `;

        document.body.appendChild(fullscreen);

        fullscreen.addEventListener("click", () => {
            fullscreen.remove();
        });

    });

});


updatePhotos();

window.addEventListener("load", () => {
    const skeleton = document.getElementById("skeleton-screen");

   setTimeout(() => {
    skeleton.style.opacity = "0";
    skeleton.style.transition = "opacity 0.4s ease";

    setTimeout(() => {
        skeleton.remove();

        // Show PIN screen after skeleton
        document.getElementById("pin-screen").style.display = "flex";

    }, 400);

}, 500);
});

const particles = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration =
        (8 + Math.random() * 12) + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particle.style.opacity =
        0.2 + Math.random() * 0.5;

    particles.appendChild(particle);
}

async function shareCard() {
    const shareData = {
        title: "Yoco's Card",
        text: "Check out my Photo NFC Card! 📸",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
        }
    } catch (error) {
        console.log("Sharing cancelled.");
    }
}

function toggleSecretMessage() {

    const message = document.getElementById("secret-message");
    const music = document.getElementById("bgMusic");

    if (message.style.display === "block") {

        // Close message
        message.style.display = "none";

        // Stop music
        music.pause();
        music.currentTime = 0;

    } else {

        // Open secret message
        message.style.display = "block";

        // Play music automatically
        music.play().catch(error => {
            console.log("Music could not start:", error);
        });

    }
}
/* ========================================= */
/* 🎲 MESSAGE BIBLE VERSE GENERATOR */
/* ========================================= */

const messageBibleVerses = [

    {
        reference: "Philippians 4:16",
        text: "I can do all things through him who strengthens me."
    },

    {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord."
    },

    {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd; I shall not want."
    },

    {
        reference: "Proverbs 3:5",
        text: "Trust in the Lord with all your heart and lean not on your own understanding."
    },

    {
        reference: "Isaiah 41:10",
        text: "Fear not, for I am with you; be not dismayed, for I am your God."
    },

    {
        reference: "John 3:16",
        text: "For God so loved the world that he gave up his only son, and whoever believes in him shall not perish but have an eternal life."
    },

    {
        reference: "Hebrews 13:5",
        text: "Keep your life free from love of money, and be contented with what you have, for he has said, 'I will never leave you, nor forsake you.'"
    },
  

];


let lastMessageVerse = -1;

let messageDiceRolling = false;


function rollMessageVerse() {

    /* Prevent double tapping while rolling */

    if (messageDiceRolling) return;

    messageDiceRolling = true;


    const dice =
        document.getElementById("messageDice");

    const message =
        document.querySelector(".message");


    /* Remove old animation */

    dice.classList.remove("rolling");

    message.classList.remove("verse-glow");


    /* Force browser to restart animation */

    void dice.offsetWidth;


    /* 🎲 START DICE ROLL */

    dice.classList.add("rolling");


    /* Wait until the dice finishes */

    setTimeout(() => {

        let newIndex;


        /* Make sure we don't immediately get
           the same verse */

        do {

            newIndex =
                Math.floor(
                    Math.random() *
                    messageBibleVerses.length
                );

        } while (
            messageBibleVerses.length > 1 &&
            newIndex === lastMessageVerse
        );


        lastMessageVerse = newIndex;


        const verse =
            messageBibleVerses[newIndex];


        /* Hide current verse */

        const reference =
            document.getElementById(
                "messageVerseReference"
            );

        const text =
            document.getElementById(
                "messageVerseText"
            );


        reference.style.opacity = "0";

        text.style.opacity = "0";


        /* Change verse */

        setTimeout(() => {

            reference.textContent =
                verse.reference;

            text.textContent =
                verse.text;


            /* ✨ Reveal */

            reference.style.opacity = "";

            text.style.opacity = "";


            message.classList.add(
                "verse-glow"
            );


            messageDiceRolling = false;

        }, 250);


    }, 900);

}