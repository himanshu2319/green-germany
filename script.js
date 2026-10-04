/* =====================================
   SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =====================================
   RECYCLING MODAL
===================================== */

const binCards = document.querySelectorAll(".bin-card");

const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");


binCards.forEach((card) => {

    card.addEventListener("click", () => {

        const title = card.querySelector("h3").textContent;
        const info = card.dataset.info;

        modalTitle.textContent = title;
        modalText.textContent = info;

        modal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("show");
    }

});


/* =====================================
   RECYCLING GAME
===================================== */

const recyclingItems = [

    {
        emoji: "🍌",
        name: "Banana peel",
        answer: "Bio Waste"
    },

    {
        emoji: "📰",
        name: "Newspaper",
        answer: "Paper"
    },

    {
        emoji: "🍾",
        name: "Glass bottle",
        answer: "Glass"
    },

    {
        emoji: "🥫",
        name: "Metal can",
        answer: "Packaging"
    },

    {
        emoji: "📦",
        name: "Cardboard",
        answer: "Paper"
    },

    {
        emoji: "🥕",
        name: "Vegetable waste",
        answer: "Bio Waste"
    }

];


const choices = [
    "Paper",
    "Glass",
    "Bio Waste",
    "Packaging"
];


let currentItem = 0;
let score = 0;


const gameItem = document.getElementById("gameItem");
const choicesContainer = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const gameMessage = document.getElementById("gameMessage");


function loadGame() {

    const item = recyclingItems[currentItem];

    gameItem.textContent = item.emoji;

    gameMessage.textContent = "";

    choicesContainer.innerHTML = "";


    choices.forEach((choice) => {

        const button = document.createElement("button");

        button.className = "choice";

        button.textContent = choice;

        button.addEventListener("click", () => {

            checkAnswer(choice);

        });

        choicesContainer.appendChild(button);

    });

}


function checkAnswer(choice) {

    const item = recyclingItems[currentItem];

    if (choice === item.answer) {

        score++;

        scoreElement.textContent = score;

        gameMessage.textContent = "✅ Correct! Sehr gut! 🇩🇪";

        gameMessage.style.color = "#8cffbd";

    } else {

        gameMessage.textContent =
            "❌ Not quite! Correct answer: " + item.answer;

        gameMessage.style.color = "#ff7777";

    }


    setTimeout(() => {

        currentItem++;

        if (currentItem >= recyclingItems.length) {

            currentItem = 0;

            gameMessage.textContent =
                "🎉 Game completed! Starting again...";

        }

        loadGame();

    }, 1300);

}


loadGame();


/* =====================================
   GERMAN VERB CONJUGATION
===================================== */

const verbData = {

    machen: {
        ich: "mache",
        du: "machst",
        er: "macht",
        wir: "machen",
        ihr: "macht",
        sie: "machen"
    },

    lernen: {
        ich: "lerne",
        du: "lernst",
        er: "lernt",
        wir: "lernen",
        ihr: "lernt",
        sie: "lernen"
    },

    leben: {
        ich: "lebe",
        du: "lebst",
        er: "lebt",
        wir: "leben",
        ihr: "lebt",
        sie: "leben"
    },

    sammeln: {
        ich: "sammle",
        du: "sammelst",
        er: "sammelt",
        wir: "sammeln",
        ihr: "sammelt",
        sie: "sammeln"
    }

};


const verbSelect = document.getElementById("verbSelect");
const conjugation = document.getElementById("conjugation");


function showVerb() {

    const selectedVerb = verbSelect.value;

    const data = verbData[selectedVerb];

    conjugation.innerHTML = "";


    const subjects = [
        ["Ich", data.ich],
        ["Du", data.du],
        ["Er / Sie", data.er],
        ["Wir", data.wir],
        ["Ihr", data.ihr],
        ["Sie", data.sie]
    ];


    subjects.forEach((subject) => {

        const row = document.createElement("div");

        row.className = "conjugation-row";

        row.innerHTML = `
            <span>${subject[0]}</span>
            <strong>${subject[1]}</strong>
        `;

        conjugation.appendChild(row);

    });

}


verbSelect.addEventListener("change", showVerb);

showVerb();


/* =====================================
   SMOOTH NAVIGATION
===================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =====================================
   SMALL MOUSE PARALLAX FOR HERO
===================================== */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 800) {

    heroVisual.addEventListener("mousemove", (event) => {

        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;


        heroVisual.style.transform =
            `translate(${x * 8}px, ${y * 8}px)`;

    });


    heroVisual.addEventListener("mouseleave", () => {

        heroVisual.style.transform = "translate(0, 0)";

    });

}


/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active-link");

        }

    });

});