// add-documents page
// add.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");
  const successMsg = document.getElementById("successMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("docTitle").value.trim();
    const type = document.getElementById("docType").value;
    const file = document.getElementById("docFile").files[0];

    if (!title || !type || !file) {
      successMsg.textContent = "❌ Please fill in all fields and select a file.";
      successMsg.style.color = "#ff4d4d";
      return;
    }

    // Simulate success (you can add real backend logic here)
    successMsg.textContent = `✅ '${title}' uploaded successfully as ${type}.`;
    successMsg.style.color = "#00ff9d";

    // Optionally reset form
    form.reset();
  });
});
