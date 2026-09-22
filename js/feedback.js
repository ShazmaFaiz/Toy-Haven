document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#feedback-form");
  const status = document.querySelector("#feedback-message-status");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Please complete all fields correctly.";
      status.className = "form-message error";
      form.reportValidity();
      return;
    }
    const feedback = {
      name: document.querySelector("#feedback-name").value.trim(),
      email: document.querySelector("#feedback-email").value.trim(),
      message: document.querySelector("#feedback-message").value.trim(),
      date: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem("toyHavenFeedback") || "[]");
    saved.push(feedback);
    localStorage.setItem("toyHavenFeedback", JSON.stringify(saved));
    form.reset();
    status.textContent = "✓ Thank you! Your feedback has been submitted.";
    status.className = "form-message success-text";
  });
  document.querySelectorAll(".accordion-question").forEach((button) =>
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const open = answer.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      button.querySelector("span").textContent = open ? "−" : "+";
    }),
  );
});
