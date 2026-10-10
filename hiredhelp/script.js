const FORM_ENDPOINT = "";
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}
document.querySelectorAll(".chips button").forEach(btn => {
  btn.addEventListener("click", () => {
    const sel = document.getElementById("citySelect");
    if (sel) sel.value = btn.dataset.city;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
});
document.querySelectorAll(".request").forEach(btn => {
  btn.addEventListener("click", () => {
    const sel = document.getElementById("serviceSelect");
    if (sel) sel.value = btn.dataset.service;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
});
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get("website")) return;
    status.hidden = false;
    status.textContent = "Opening your email app…";
    const subject = encodeURIComponent("Hired Help request");
    const body = encodeURIComponent(`Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nCity: ${data.get("city")||""}\nService: ${data.get("service")||""}\n\n${data.get("message")||""}`);
    window.location.href = `mailto:sales@hiredhelput.com?subject=${subject}&body=${body}`;
  });
}
(function () {
  const el = document.getElementById("seasonBanner");
  if (!el) return;
  const m = new Date().getMonth();
  let text = "Home repairs, sprinklers, yard care, and mowing — ask if your job fits.";
  if (m >= 3 && m <= 5) text = "Spring: sprinkler startup and seasonal yard cleanup are available.";
  else if (m >= 5 && m <= 8) text = "Summer: mowing, yard care, and sprinkler adjustments are available.";
  else if (m >= 8 && m <= 10) text = "Fall: fall sprinkler preparation, yard cleanup, and end-of-season mowing are available.";
  else text = "Winter: basic home repairs are available. Ask about other work.";
  el.textContent = text;
})();