// const PASSWORD_HASH = "0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c"; // 'sansha123'

// async function hashPassword(password) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password);
//   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
//   return Array.from(new Uint8Array(hashBuffer))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');
// }

// async function handleLogin() {
//   const input = document.getElementById("password").value;
//   const hash = await hashPassword(input);
//   const errorBox = document.getElementById("errorBox");

//   if (hash === PASSWORD_HASH) {
//     localStorage.setItem("loggedIn", "true");
//     window.location.href = "index.html";
//   } else {
//     errorBox.textContent = "Incorrect password!";
//   }
// }

// function logout() {
//   localStorage.removeItem("loggedIn");
//   window.location.href = "login.html";
// }

// function checkLogin() {
//   if (localStorage.getItem("loggedIn") !== "true") {
//     window.location.href = "login.html";
//   }
// }

// function toggleMobileMenu() {
//   const menu = document.getElementById("mobileNav");
//   menu.classList.toggle("show");
// }

// function toggleProfileDropdown() {
//   const dropdown = document.getElementById("dropdownMenu");
//   dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
// }

// document.addEventListener("click", function(event) {
//   const dropdown = document.getElementById("dropdownMenu");
//   const profileBtn = document.querySelector(".profile-btn");
//   if (dropdown && !dropdown.contains(event.target) && !profileBtn.contains(event.target)) {
//     dropdown.style.display = "none";
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const darkToggle = document.getElementById("toggleDark");
//   if (darkToggle) {
//     darkToggle.addEventListener("click", () => {
//       document.body.classList.toggle("dark-mode");
//     });
//   }
// });
