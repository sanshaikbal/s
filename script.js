// const PASSWORD_HASH = "ca4053a30521714d666ffb67462821f69d70ba009374d01558d0aea15326c152"; // SHA-256 hashed(Ikbal@12)
// ============================
// CONFIGURATION
// ============================
const PASSWORD_HASH = "ca4053a30521714d666ffb67462821f69d70ba009374d01558d0aea15326c152"; // SHA-256 hashed(Ikbal@12)

// ============================
// AUTH + LOGIN HANDLING
// ============================
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function login() {
  const input = document.getElementById("passwordInput").value;
  const remember = document.getElementById("rememberMe").checked;
  const spinner = document.getElementById("spinner");
  const errorMsg = document.getElementById("errorMsg");
  spinner.style.display = "block";
  errorMsg.textContent = "";

  const hashed = await hashPassword(input);
  if (hashed === PASSWORD_HASH) {
    showToast("✅ Logged in successfully!");
    if (remember) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("stayLoggedIn", true);
    } else {
      sessionStorage.setItem("loggedIn", true);
    }
    setTimeout(() => (window.location.href = "index.html"), 1200);
  } else {
    errorMsg.textContent = "❌ Incorrect password";
  }

  spinner.style.display = "none";
}


  function checkLogin() {
    const user = getLoggedInUser();
    if (!user) {
      window.location.href = "login.html";
    } else {
      document.getElementById("userDropdown").innerHTML = `👤 ${user.username} ▼`;
      document.getElementById("userName").textContent = user.username;
      document.getElementById("userEmail").textContent = "📧 " + user.username;
      document.getElementById("userEmail").href = "mailto:" + user.username;
    }
  }


// <!-- Call it here or in body onload -->
{/* <body onload="checkLogin()">
if (remember) {
  localStorage.setItem("loggedInUser", JSON.stringify({ username }));
} else {
  sessionStorage.setItem("loggedInUser", JSON.stringify({ username }));
} */}


function logout() {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html"; // or your login page
}


function confirmLogout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("stayLoggedIn");
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function cancelLogout() {
  document.getElementById("logoutConfirmation").style.display = "none";
}

// ============================
// PASSWORD STRENGTH CHECKER
// ============================
function checkStrength() {
  const input = document.getElementById("passwordInput").value;
  const bar = document.getElementById("bar");
  const text = document.getElementById("strengthText");

  let strength = 0;
  if (input.length > 5) strength++;
  if (/[A-Z]/.test(input)) strength++;
  if (/[0-9]/.test(input)) strength++;
  if (/[^A-Za-z0-9]/.test(input)) strength++;

  const strengthMap = ["Weak", "Okay", "Strong", "Very Strong"];
  const colorMap = ["#ff4d4d", "#ffa500", "#00c853", "#0072ff"];
  bar.style.width = (strength * 25) + "%";
  bar.style.backgroundColor = colorMap[strength - 1] || "#ccc";
  text.textContent = strengthMap[strength - 1] || "";
}

// ============================
// TOGGLE PASSWORD VISIBILITY
// ============================
function togglePassword() {
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

// ============================
// DARK MODE TOGGLE + AUTO
// ============================
function applyTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem("darkMode");
  const enableDark = saved !== null ? saved === "true" : prefersDark;
  document.body.classList.toggle("dark-mode", enableDark);
}

// ============================
// ON LOAD SETUP
// ============================
window.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  const toggleBtn = document.getElementById("toggleDark");
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  // Resume last document
  if (window.location.pathname.endsWith("documents.html")) {
    const last = localStorage.getItem("lastDocument");
    if (last) {
      setTimeout(() => {
        if (confirm("🔁 Resume where you left off?\nGo to: " + last)) {
          window.location.href = last;
        }
      }, 1000);
    }
  }
});

// ============================
// PROFILE DROPDOWN
// ============================
function toggleProfileDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.addEventListener("click", (e) => {
  if (!e.target.closest(".profile-menu")) {
    document.getElementById("dropdownMenu")?.classList.remove("show");
  }
});

// ============================
// MOBILE MENU
// ============================
function toggleMobileMenu() {
  document.getElementById("mobileNav").classList.toggle("show");
}

// ============================
// LIVE SEARCH
// ============================
const searchBox = document.getElementById("searchBox");
searchBox?.addEventListener("input", () => {
  const q = searchBox.value.toLowerCase();
  document.querySelectorAll(".doc-card").forEach(card => {
    const key = card.dataset.keywords?.toLowerCase() || "";
    const text = card.textContent.toLowerCase();
    card.style.display = (key.includes(q) || text.includes(q)) ? "flex" : "none";
  });
});


// ============================
// EMOJI BURST ON HOVER
// ============================
function triggerEmojiBurst(x, y) {
  const emojis = ["📄", "✨", "💾", "🎉"];
  for (let i = 0; i < 8; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.className = "emoji-burst";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    document.body.appendChild(span);

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 80 + 30;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    span.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }], {
      duration: 1000,
      easing: "ease-out"
    });
    setTimeout(() => span.remove(), 1000);
  }
}

document.querySelectorAll(".doc-card").forEach(card => {
  card.addEventListener("mouseover", (e) => {
    const rect = card.getBoundingClientRect();
    triggerEmojiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  card.addEventListener("click", () => {
    localStorage.setItem("lastDocument", card.getAttribute("href"));
  });
});

// ============================
// TOAST MESSAGE
// ============================
function showToast(message = "✅ Success!", duration = 3000) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

// ============================
// GSAP ANIMATIONS (Optional)
// ============================
document.querySelectorAll(".doc-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(card, { scale: 1.05, duration: 0.2 });
    }
  });
  card.addEventListener("mouseleave", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(card, { scale: 1, duration: 0.2 });
    }
  });
});

// ============================
// SMOOTH SCROLL FOR LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Optional JS for smooth scrolling on anchor clicks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
/* <script> */
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const circles = Array.from({ length: window.innerWidth < 500 ? 20 : 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 20 + 5,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    color: `hsla(${Math.random() * 360}, 70%, 60%, 0.2)`
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const c of circles) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.x += c.dx;
      c.y += c.dy;
      if (c.x < 0 || c.x > width) c.dx *= -1;
      if (c.y < 0 || c.y > height) c.dy *= -1;
    }
    requestAnimationFrame(animate);
  }

  animate();
// nav
src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"


  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("navOverlay");
  const links = nav.querySelectorAll("a");
  const hamburger = document.querySelector(".hamburger");
  let isNavOpen = false;

  function toggleMobileMenu() {
    if (!isNavOpen) {
      overlay.style.display = "block";

      gsap.to(nav, {
        x: "250px",
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.fromTo(links, {
        opacity: 0,
        x: -20
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        delay: 0.2
      });

      isNavOpen = true;
      document.addEventListener("click", handleOutsideClick);
    } else {
      gsap.to(nav, {
        x: "-250px",
        duration: 0.4,
        ease: "power2.in"
      });

      overlay.style.display = "none";
      isNavOpen = false;
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  // Auto-close when a nav link is clicked
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        toggleMobileMenu();
      }
    });
  });

  // Close if clicked outside
  function handleOutsideClick(e) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      toggleMobileMenu();
    }
  }

  // Start hidden on small screens
  if (window.innerWidth < 768) {
    gsap.set(nav, { x: "-250px" });
  }
// login
    particlesJS("particles-js", {
      particles: {
        number: { value: 60 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.2 },
        size: { value: 3 },
        move: { enable: true, speed: 1 }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: "repulse" } }
      },
      retina_detect: true
    });

    // function handleLoginFlip() {
    //   const box = document.getElementById("loginBox");
    //   box.classList.add("flip");
    //   setTimeout(() => {
    //     login();
    //     box.classList.remove("flip");
    //   }, 600);
    // }
    // ptofile page
    // ============================
// DARK MODE TOGGLE HANDLER
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleDark");

  // Load saved preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Toggle dark mode on button click
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
});
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
{/* pdf moral */}
  function openPDFModal(pdfUrl) {
    document.getElementById("pdfViewer").src = pdfUrl;
    document.getElementById("pdfModal").style.display = "flex";
  }

  function closePDFModal() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfViewer").src = "";
  }

  // Optional: Close modal on outside click
  window.onclick = function (event) {
    const modal = document.getElementById("pdfModal");
    if (event.target === modal) {
      closePDFModal();
    }
  };
// TO do App
function addTask() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;

  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push({ text: text, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks(true);
  input.value = '';
}

function renderTasks(animate = false) {
  const list = document.getElementById('todoList');
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (task.done ? ' done' : '');
    li.innerHTML = `
      <span onclick="toggleDone(${index})">${task.text}</span>
      <button onclick="editTask(${index})">✏️</button>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;
    list.appendChild(li);
    if (animate) {
      li.style.opacity = 0;
      li.style.transform = 'translateY(20px)';
      setTimeout(() => {
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = 1;
        li.style.transform = 'translateY(0)';
      }, 50);
    }
  });
}

function deleteTask(index) {
  const list = document.getElementById('todoList');
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const item = list.children[index];

  if (item) {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = 0;
    item.style.transform = 'translateX(30px)';
    setTimeout(() => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }, 300);
  }
}

function toggleDone(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

window.addEventListener('load', () => {
  renderTasks();

  // ✅ Add task when Enter is pressed
  document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
  });
});
// register page
function handleRegister() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMsg = document.getElementById("registerError");

  errorMsg.textContent = "";

  if (!email || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // Simple email/phone validation
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhone = /^[0-9]{10}$/.test(email);

  if (!isEmail && !isPhone) {
    errorMsg.textContent = "Enter a valid email or phone number.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    errorMsg.textContent = "Account already exists.";
    return;
  }

  users[email] = password; // For production, hash the password
  localStorage.setItem("users", JSON.stringify(users));
  alert("✅ Registration successful! You can now login.");
  window.location.href = "login.html";
}
// login page
function handleLogin() {
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const spinner = document.getElementById('spinner');

  errorMsg.textContent = '';
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none';
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username] && users[username] === password) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Invalid login credentials.";
    }
  }, 1000);
}
 function togglePassword() {
      const input = document.getElementById("passwordInput");
      const icon = document.getElementById("eyeIcon");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }
    function logout() {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
