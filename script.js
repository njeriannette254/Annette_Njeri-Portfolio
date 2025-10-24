/* --- Initialize Particles.js for romantic background effect --- */
particlesJS("particles-js", {
  particles: {
    number: {
      value: 100, // More particles for a richer effect
      density: {
        enable: true,
        value_area: 900,
      },
    },
    color: {
      value: ["#D32F2F", "#EF5350", "#FFCDD2"], // Shades of red and pink
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#FFCDD2",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 4, // Slightly larger particles
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 120, // Closer links
      color: "#FFCDD2", // Light pink links
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2, // Slower, more gentle movement
      direction: "none",
      random: true, // Random movement direction
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble", // Bubble effect on hover
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 200,
        size: 8, // Larger bubble size
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 150,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

// Page Navigation & Display Logic
const navButtons = document.querySelectorAll("#navigationBar .nav-btn");
const pageSections = document.querySelectorAll(".page-section");

function showPage(pageId) {
  pageSections.forEach((section) => {
    if (section.id === pageId) {
      section.classList.remove("hidden");
      // Animation
      section.querySelectorAll(".reveal-item").forEach((el) => {
        el.classList.remove(
          "fade-in-up",
          "zoom-in",
          "slide-in-left",
          "fade-in",
          "pop-in"
        );
        void el.offsetWidth; // Reflow
        el.classList.add("fade-in-up");
      });
      section.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll
    } else {
      section.classList.add("hidden");
      section.classList.remove("active");
    }
  });

  navButtons.forEach((btn) => {
    if (btn.id === `${pageId}Btn`) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Event listeners
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.id.replace("Btn", "");
    showPage(pageId);
  });
});

// Initially show the home page
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
});

//Gallery
const galleries = {
  "solo-gallery": {
    folder: "media/Solo",
    picPrefix: "solo",
    vidPrefix: "video",
    picCount: 59,
    vidCount: 4,
  },
  "family-gallery": {
    folder: "media/Family",
    picPrefix: "fampic",
    vidPrefix: "famvid",
    picCount: 13,
    vidCount: 0,
  }, // Adjusted counts
  "little-gallery": {
    folder: "media/Little",
    picPrefix: "littlePics",
    vidPrefix: "littleVid",
    picCount: 13,
    vidCount: 0,
  }, // Adjusted counts
  "friends-gallery": {
    folder: "media/Friends",
    picPrefix: "friendpic",
    vidPrefix: "friendvid",
    picCount: 19,
    vidCount: 4,
  },
  "edits-scenery-gallery": {
    folder: "media/Edits-Scenery",
    picPrefix: "editspic",
    vidPrefix: "editsvid",
    picCount: 7,
    vidCount: 6,
  },
};

function loadGallery(galleryId, config) {
  const container = document.getElementById(galleryId);
  if (!container) return; // Exit if container doesn't exist

  // Clear existing content
  container.innerHTML = "";

  // Load pictures
  for (let i = 1; i <= config.picCount; i++) {
    const anchor = document.createElement("a");
    anchor.href = `${config.folder}/${config.picPrefix}${i}.jpg`;
    anchor.className = "glightbox";
    anchor.setAttribute("data-gallery", galleryId);
    const img = document.createElement("img");
    img.src = `${config.folder}/${config.picPrefix}${i}.jpg`;
    img.alt = `Annette's photo ${i}`;
    img.loading = "lazy";
    anchor.appendChild(img);
    container.appendChild(anchor);
  }

  // Load videos
  for (let i = 1; i <= config.vidCount; i++) {
    const anchor = document.createElement("a");
    anchor.href = `${config.folder}/${config.vidPrefix}${i}.mp4`;
    anchor.className = "glightbox";
    anchor.setAttribute("data-gallery", galleryId);
    anchor.setAttribute("data-type", "video");
    const video = document.createElement("video");
    video.src = `${config.folder}/${config.vidPrefix}${i}.mp4`;
    video.controls = false; // GLightbox provides controls
    video.preload = "metadata";
    video.loading = "lazy";
    // Create a simple play icon overlay for videos (visual cue)
    const playOverlay = document.createElement("div");
    playOverlay.classList.add("play-overlay");
    playOverlay.innerHTML = "▶"; // Unicode play symbol

    anchor.appendChild(video);
    anchor.appendChild(playOverlay); // Add play overlay
    container.appendChild(anchor);
  }
}

// Load all galleries when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  for (const id in galleries) {
    loadGallery(id, galleries[id]);
  }
  // Initialize GLightbox AFTER all gallery items are loaded
  GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    plyr: {
      css: "https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.css",
      js: "https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.min.js",
    },
  });
});

// Trivia
const triviaQuestions = [
  {
    question: "What is Annette's favorite color?",
    options: ["Blue", "Red", "Pink", "Black"],
    correctAnswer: "Red",
  },
  {
    question: "How tall is Annette?",
    options: ["5 ft 3", "5 ft 1", "5 ft 4", "5 ft 6"],
    correctAnswer: "5 ft 1",
  },
  {
    question: "What is her Instagram username?",
    options: [
      "@_.hastings",
      "@hastings_",
      "@annette_gachamba",
      "@hastings.annette",
    ],
    correctAnswer: "@__.hastings",
  },
  {
    question: "What’s her favorite food?",
    options: ["Pizza", "Rice & stew", "Chapati & beans", "Fries"],
    correctAnswer: "Rice & stew",
  },
  {
    question: "What course is she taking?",
    options: ["Medicine", "Pharmacy", "Nursing", "Dentistry"],
    correctAnswer: "Pharmacy",
  },
  {
    question: "Which university does she study at?",
    options: ["JKUAT", "Kenyatta University", "University of Nairobi", "USIU"],
    correctAnswer: "University of Nairobi",
  },
  {
    question: "When is her birthday?",
    options: [
      "23rd Oct, 2005",
      "12th Dec, 2004",
      "5th Jan, 2006",
      "4th Feb, 2005",
    ],
    correctAnswer: "23rd Oct, 2005",
  },
  {
    question: "What is her full name?",
    options: [
      "Annette Njeri Hastings",
      "Annette Njeri Gachamba",
      "Annette Gachamba Hastings",
      "Annette Njeri Mumbi",
    ],
    correctAnswer: "Annette Njeri Gachamba",
  },
  {
    question: "What name does she like to go by?",
    options: ["Njeri", "Annette", "Hastings", "Gachamba"],
    correctAnswer: "Hastings",
  },
  {
    question: "Which football team does she support?",
    options: ["Chelsea", "Arsenal", "Manchester United", "Liverpool"],
    correctAnswer: "Manchester United",
  },
  {
    question: "How many siblings does Annette have?",
    options: ["3", "4", "2", "5"],
    correctAnswer: "3",
  },
  {
    question: "Name one of Annette’s siblings.",
    options: ["Wayne", "Lisa", "Kevin", "Faith"],
    correctAnswer: "Wayne",
  },
  {
    question: "How many points did she get in KCSE?",
    options: ["78", "84", "80", "75"],
    correctAnswer: "80",
  },
  {
    question: "What was her KCPE score?",
    options: ["398", "412", "421", "406"],
    correctAnswer: "412",
  },
  {
    question: "Who is Annette 2.0?",
    options: ["Claire", "Esther", "Olivia", "Clara"],
    correctAnswer: "Esther",
  },
  {
    question: "Where does she currently live?",
    options: ["Qwetu Chiromo", "Qwetu Hurlingham", "Kilimani", "Parklands"],
    correctAnswer: "Qwetu Chiromo",
  },
  {
    question: "Who is her roommate?",
    options: ["Yvonne", "Omotayo", "Esther", "Shee"],
    correctAnswer: "Omotayo",
  },
  {
    question: "What’s her dad’s name?",
    options: [
      "John Kang'ethe",
      "Hastings Kang'ethe",
      "Peter Gachamba",
      "David Muriuki",
    ],
    correctAnswer: "Hastings Kang'ethe",
  },
  {
    question: "What’s her mum’s name?",
    options: ["Evelyne Mumbi", "Ann Wanjiru", "Sarah Njeri", "Mary Wangui"],
    correctAnswer: "Evelyne Mumbi",
  },
  {
    question: "Which chocolate does she prefer?",
    options: ["Dark", "White", "Milk", "Hazelnut"],
    correctAnswer: "White",
  },
  {
    question: "What phrase does Annette often say?",
    options: ["Innit", "Clock it", "Facts only", "Say less"],
    correctAnswer: "Clock it",
  },
  {
    question: "What’s her Instagram bio?",
    options: [
      "Daughter of a King",
      "Bride of Christ",
      "Faith over fear",
      "Jesus first",
    ],
    correctAnswer: "Bride of Christ",
  },
  {
    question: "What are the last 3 digits of her phone number?",
    options: ["507", "405", "356", "671"],
    correctAnswer: "507",
  },
  {
    question: "What’s her dream country?",
    options: ["USA", "France", "Greece", "Japan"],
    correctAnswer: "USA",
  },
  {
    question: "What business does she run?",
    options: ["Lip Serum", "Jewelry", "Wigs", "Perfume"],
    correctAnswer: "Lip Serum",
  },
  {
    question: "One of her favorite cars?",
    options: ["Vitz", "Harrier (New Model)", "Range Rover", "Mazda CX-5"],
    correctAnswer: "Harrier (New model)",
  },
  {
    question: "What’s her biggest talent?",
    options: ["Cooking", "Dancing", "Drawing", "Acting"],
    correctAnswer: "Dancing",
  },
  {
    question: "Which social media apps does she use most?",
    options: [
      "Instagram, WhatsApp, TikTok",
      "Twitter, Facebook, YouTube",
      "Snapchat, Telegram, Instagram",
      "LinkedIn, Twitter, TikTok",
    ],
    correctAnswer: "Instagram, WhatsApp, TikTok",
  },
  {
    question: "What color is her phone (not the case)?",
    options: ["Black", "White", "Silvery gray", "Blue"],
    correctAnswer: "Blue",
  },
  {
    question: "What’s her favorite brand?",
    options: ["Adidas", "Nike", "Puma", "Gucci"],
    correctAnswer: "Nike",
  },
  {
    question: "How many piercings does she have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "Does she have a nose piercing?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Does she wear rings?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "Does she wear watches?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "How many bracelets?",
    options: ["None", "Few", "Many", "One"],
    correctAnswer: "Many",
  },
  {
    question: "Does she wear headbands?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "Is she afraid of heights?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "What church does she attend?",
    options: [
      "Every Nation Nairobi",
      "Jubilee Christian Church",
      "Deliverance Church",
      "Mavuno",
    ],
    correctAnswer: "Every Nation Nairobi",
  },
  {
    question: "Who was her roommate back in 1st year?",
    options: ["Yvonne", "Esther", "Louisa", "Clara"],
    correctAnswer: "Yvonne",
  },
  {
    question: "Which high school friends are with her at UoN?",
    options: [
      "Louisa, Mideva, Shee",
      "Yvonne, Esther, Wayne",
      "Clara, Claire, Mideva",
      "Faith, Shee, Louisa",
    ],
    correctAnswer: "Louisa, Mideva, Shee",
  },
  {
    question: "What does she prefer: Chocolate or Ice Cream?",
    options: ["Chocolate", "Ice Cream"],
    correctAnswer: "Ice Cream",
  },
  {
    question: "What word does she commonly text?",
    options: ["Real!", "Bet", "Fr", "Sure"],
    correctAnswer: "Real!",
  },
  {
    question: "Does she watch anime?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Is she a workaholic?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "Is she a night owl?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Is she a perfectionist?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "What’s her weight range?",
    options: ["40–50 kg", "50–60 kg", "60–70 kg", "45–55 kg"],
    correctAnswer: "50–60 kg",
  },
  {
    question: "Does she enjoy DJ stuff?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  { question: "Does she paint?", options: ["Yes", "No"], correctAnswer: "Yes" }, // Changed to Yes based on hobby section
  {
    question: "Is she allergic to fish?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "What’s her dream career?",
    options: ["Pharmacist", "Doctor", "Engineer", "Scientist"],
    correctAnswer: "Doctor",
  },
  {
    question: "What kind of music does she love?",
    options: ["Afrobeats", "Old School RnB", "Pop", "Gospel"],
    correctAnswer: "Old School RnB",
  },
  {
    question: "Does she love playing with cats?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Does she have a pet dog?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Has she considered working with drones?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "What’s her religion?",
    options: ["Christian", "Muslim", "Hindu", "Atheist"],
    correctAnswer: "Christian",
  },
  {
    question: "Has she read about Hinduism?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Does she love green peppers (hoho)?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Does she watch soccer?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    question: "Has she ever been to Mombasa?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    question: "What is her favorite type of flower?",
    options: ["Roses", "Lilies", "Tulips", "Daisies"],
    correctAnswer: "Roses",
  },
  {
    question: "Does she prefer sunrise or sunset?",
    options: ["Sunrise", "Sunset"],
    correctAnswer: "Sunset",
  },
  {
    question: "What's her go-to comfort food?",
    options: ["Ice Cream", "Chocolate Cake", "Pizza", "Soup"],
    correctAnswer: "Ice Cream",
  },
  {
    question: "Is she an early bird or a night owl?",
    options: ["Early Bird", "Night Owl"],
    correctAnswer: "Early Bird",
  },
  {
    question: "What's her preferred vacation type?",
    options: [
      "Beach relaxation",
      "Mountain adventure",
      "City exploration",
      "Camping in nature",
    ],
    correctAnswer: "Beach relaxation",
  },
  {
    question: "Does she enjoy cooking?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
];

const quizSection = document.getElementById("trivia"); // Parent section for the quiz
const introToQuizPage = document.getElementById("introToQuizPage");
const quizPage = document.getElementById("quizPage");
const toQuizBtn = document.getElementById("toQuiz");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreBar = document.getElementById("scoreBar");
const endScreen = document.getElementById("endScreen");
const finalScoreEl = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartQuiz");

let currentQuestionIndex = 0;
let score = 0;

function beginQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  introToQuizPage.style.display = "none";
  quizPage.style.display = "block";
  endScreen.style.display = "none";
  questionEl.style.display = "block";
  answersEl.style.display = "flex";
  updateScoreDisplay();
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < triviaQuestions.length) {
    const q = triviaQuestions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => handleAnswer(option));
      answersEl.appendChild(btn);
    });

    // Animation
    questionEl.classList.remove("fade-in-up");
    answersEl.classList.remove("fade-in");
    void questionEl.offsetWidth; // Reflow
    questionEl.classList.add("fade-in-up");
    answersEl.classList.add("fade-in");
  } else {
    endQuiz();
  }
}

function handleAnswer(selected) {
  const correct = triviaQuestions[currentQuestionIndex].correctAnswer;
  if (selected === correct) {
    score++;
  }

  updateScoreDisplay();
  currentQuestionIndex++;
  showQuestion(); // Move to next question or end quiz
}

function updateScoreDisplay() {
  scoreEl.textContent = `${score}/${triviaQuestions.length}`;
  const progress = (score / triviaQuestions.length) * 100;
  scoreBar.style.setProperty("--score-progress", `${progress}%`);
}

function endQuiz() {
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  quizPage.style.display = "none";
  endScreen.style.display = "block";
  finalScoreEl.textContent = `You scored ${score} out of ${triviaQuestions.length}!`;
  // Animation
  finalScoreEl.classList.remove("fade-in");
  restartBtn.classList.remove("pop-in");
  void finalScoreEl.offsetWidth; // Reflow
  finalScoreEl.classList.add("fade-in");
  restartBtn.classList.add("pop-in");
}

toQuizBtn.addEventListener("click", beginQuiz);
restartBtn.addEventListener("click", beginQuiz);

document.addEventListener("DOMContentLoaded", () => {});
