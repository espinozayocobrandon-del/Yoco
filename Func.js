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
        reference: "Philippians 4:13",
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
        reference: "Proverbs 3:5-6",
        text: "Trust in the Lord with all your heart and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."
    },

    {
        reference: "Isaiah 41:10",
        text: "Fear not, for I am with you; be not dismayed, for I am your God."
    },

    {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life."
    },

    {
        reference: "Hebrews 13:5",
        text: "Keep your life free from love of money, and be content with what you have, for he has said, 'I will never leave you nor forsake you.'"
    },

    {
        reference: "Galatians 6:9",
        text: "Let us not grow weary of doing good, for in due season we will reap, if we do not give up."
    },

    {
        reference: "Joshua 1:9",
        text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go."
    },

    {
        reference: "Psalm 46:1",
        text: "God is our refuge and strength, a very present help in trouble."
    },

    {
        reference: "Psalm 37:5",
        text: "Commit your way to the Lord; trust in him, and he will act."
    },

    {
        reference: "Romans 8:28",
        text: "And we know that for those who love God all things work together for good."
    },

    {
        reference: "Isaiah 40:31",
        text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles."
    },

    {
        reference: "Deuteronomy 31:8",
        text: "It is the Lord who goes before you. He will be with you; he will not leave you or forsake you."
    },

    {
        reference: "2 Corinthians 4:16",
        text: "So we do not lose heart. Though our outer self is wasting away, our inner self is being renewed day by day."
    },

    {
        reference: "Psalm 55:22",
        text: "Cast your burden on the Lord, and he will sustain you."
    },

    {
        reference: "Psalm 31:24",
        text: "Be strong, and let your heart take courage, all you who wait for the Lord!"
    },

    {
        reference: "Psalm 121:1-2",
        text: "I lift up my eyes to the hills. From where does my help come? My help comes from the Lord."
    },

    {
        reference: "Psalm 34:17",
        text: "When the righteous cry for help, the Lord hears and delivers them out of all their troubles."
    },

    {
        reference: "Psalm 34:18",
        text: "The Lord is near to the brokenhearted and saves the crushed in spirit."
    },

    {
        reference: "Psalm 23:4",
        text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me."
    },

    {
        reference: "Psalm 27:14",
        text: "Wait for the Lord; be strong, and let your heart take courage; wait for the Lord!"
    },

    {
        reference: "Psalm 62:8",
        text: "Trust in him at all times, O people; pour out your heart before him."
    },

    {
        reference: "Psalm 9:10",
        text: "And those who know your name put their trust in you, for you, O Lord, have not forsaken those who seek you."
    },

    {
        reference: "Nahum 1:7",
        text: "The Lord is good, a stronghold in the day of trouble; he knows those who take refuge in him."
    },

    {
        reference: "2 Corinthians 5:7",
        text: "For we walk by faith, not by sight."
    },

    {
        reference: "Romans 12:12",
        text: "Rejoice in hope, be patient in tribulation, be constant in prayer."
    },

    {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace in believing."
    },

    {
        reference: "Hebrews 10:23",
        text: "Let us hold fast the confession of our hope without wavering, for he who promised is faithful."
    },

    {
        reference: "Hebrews 11:1",
        text: "Now faith is the assurance of things hoped for, the conviction of things not seen."
    },

    {
        reference: "James 1:12",
        text: "Blessed is the man who remains steadfast under trial."
    },

    {
        reference: "1 Peter 5:7",
        text: "Casting all your anxieties on him, because he cares for you."
    },

    {
        reference: "1 Corinthians 16:13",
        text: "Be watchful, stand firm in the faith, act like men, be strong."
    },

    {
        reference: "Lamentations 3:22-23",
        text: "The steadfast love of the Lord never ceases; his mercies never come to an end."
    }



];


let messageDiceRolling = false;

/* ========================================= */
/* 🎲 NO-REPEAT VERSE SHUFFLE SYSTEM */
/* ========================================= */

let shuffledMessageVerses = [];
let messageVerseIndex = 0;


/* Create a random shuffled list */
function shuffleMessageVerses() {

    shuffledMessageVerses = [...messageBibleVerses];

    for (
        let i = shuffledMessageVerses.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            shuffledMessageVerses[i],
            shuffledMessageVerses[j]
        ] = [
            shuffledMessageVerses[j],
            shuffledMessageVerses[i]
        ];
    }

    messageVerseIndex = 0;
}


/* Get the next verse */
function getNextMessageVerse() {

    /* If all verses have been used,
       create a new shuffled list */

    if (
        messageVerseIndex >=
        shuffledMessageVerses.length
    ) {

        shuffleMessageVerses();
    }

    const verse =
        shuffledMessageVerses[messageVerseIndex];

    messageVerseIndex++;

    return verse;
}


/* Shuffle when page starts */
shuffleMessageVerses();


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

    /* Restart animation */
    void dice.offsetWidth;

    /* 🎲 START DICE ROLL */
    dice.classList.add("rolling");

    /* Wait until dice animation finishes */
    setTimeout(() => {

        /* 🎲 Get next verse from shuffled deck */
        const verse =
            getNextMessageVerse();

        /* Get verse elements */
        const reference =
            document.getElementById(
                "messageVerseReference"
            );

        const text =
            document.getElementById(
                "messageVerseText"
            );

        /* Hide current verse */
        reference.style.opacity = "0";
        text.style.opacity = "0";

        /* Change verse after fade-out */
        setTimeout(() => {

            reference.textContent =
                verse.reference;

            text.textContent =
                verse.text;

            /* Show new verse */
            reference.style.opacity = "";
            text.style.opacity = "";

            message.classList.add(
                "verse-glow"
            );

            /* Allow another roll */
            messageDiceRolling = false;

        }, 250);

    }, 900);
}