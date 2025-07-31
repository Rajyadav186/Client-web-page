// Student Achievements Data
const students = [
  {
    name: "Riya Patel",
    exam: "NEET 2024 – 620 Marks",
    img: "https://via.placeholder.com/230x200?text=Riya+Patel"
  },
  {
    name: "Harsh Sharma",
    exam: "JEE 2024 – 96.8 Percentile",
    img: "https://via.placeholder.com/230x200?text=Harsh+Sharma"
  },
  {
    name: "Mehul Desai",
    exam: "12th CBSE – 94%",
    img: "https://via.placeholder.com/230x200?text=Mehul+Desai"
  }
];

// Load student cards
const gallery = document.getElementById("achievement-gallery");

students.forEach(student => {
  const card = document.createElement("div");
  card.classList.add("student-card");

  card.innerHTML = `
    <img src="${student.img}" alt="${student.name}" />
    <h4>${student.name}</h4>
    <p>${student.exam}</p>
  `;

  gallery.appendChild(card);
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });


// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");     // Animate icon
  navMenu.classList.toggle("show");         // Slide menu in/out
});

// Close menu on link click
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    hamburger.classList.remove("active");
  });
});

document.querySelector(".nav-logo").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Close menu if on mobile
  document.getElementById("nav-menu").classList.remove("show");
  document.getElementById("hamburger").classList.remove("active");
});


// Contact form submission via email backend
document.getElementById("inquiryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.Name.value;
  const email = this.Email.value;
  const message = this.Message.value;

  try {
    const res = await fetch('http://localhost:5000/send-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      alert("✅ Inquiry sent successfully!");
      this.reset();
    } else {
      alert("❌ Failed to send inquiry. Try again later.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Network error. Please check your connection.");
  }
});
