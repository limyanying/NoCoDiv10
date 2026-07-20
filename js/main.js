//Clickable Hero image change 
const hero = document.getElementById("heroImage");

const heroImages = [
    "images/noco-hero1.jpg",
    "images/noco-hero2.jpg",
    "images/noco-hero3.jpg",
    "images/noco-hero4.jpg"
];

let currentImage = 0;

function nextImage(){
    currentImage = (currentImage + 1) % heroImages.length;
    hero.src = heroImages[currentImage];
}

hero.onclick = nextImage;

// Automatically change every 3 seconds
setInterval(nextImage, 3000);

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach((element) => {
  observer.observe(element);
});

// Enhanced smooth scrolling with easing
document
  .getElementById("explore-treatments-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.getElementById("treatments");
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - 100; // 100px offset from top
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth acceleration/deceleration
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);

    // Highlight the section
    target.classList.add("highlight-section");
    setTimeout(() => {
      target.classList.remove("highlight-section");
    }, 2000);
  });

// Testimonial Slider
const track = document.getElementById("testimonial-track");
const dots = document.querySelectorAll(".slider-dot");
let currentIndex = 0;

function updateSlider(index) {
  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateSlider(parseInt(dot.dataset.index));
  });
});

// Auto-advance testimonials
setInterval(() => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateSlider(currentIndex);
}, 5000);

// Chatbot functionality
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatMessages = document.getElementById("chatbot-messages");
const chatInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-message");

chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("active");
});

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, true);
    chatInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I can help you book a consultation or answer questions about our treatments. Would you like to schedule an appointment?",
        "That's a great question! Our Nano Botox treatment typically lasts 3-4 months with proper aftercare.",
        "I'd be happy to assist with pricing information. Which treatment are you interested in?",
        "Our virtual consultations take about 15 minutes and can be done via video call or our AI analysis tool.",
        "For that concern, I'd recommend our Plasma Lift treatment which has a 94% satisfaction rate.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse);
    }, 1000);
  }
}

sendButton.addEventListener("click", handleUserMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserMessage();
});

// Modal functionality
const bookNowBtn = document.getElementById("book-now-btn");
const virtualConsultBtn = document.getElementById("virtual-consult-btn");
const bookingModal = document.getElementById("booking-modal");
const closeModal = document.getElementById("close-modal");

bookNowBtn.addEventListener("click", () => {
  bookingModal.classList.add("active");
});

virtualConsultBtn.addEventListener("click", () => {
  bookingModal.classList.add("active");
  // In a real implementation, would switch to virtual consult flow
});

closeModal.addEventListener("click", () => {
  bookingModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.remove("active");
  }
});

// Form submission
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Thank you for your submission! In a real implementation, this would connect to our booking system."
    );
    if (form.closest(".modal-content")) {
      bookingModal.classList.remove("active");
    }
    form.reset();
  });
});

// Smooth scrolling for navigation
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});
