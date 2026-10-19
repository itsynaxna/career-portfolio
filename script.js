const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });
  sections.forEach((section) => observer.observe(section));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactOverlay = document.getElementById("contactOverlay");

function showContact() {
  if (!contactOverlay) return;
  contactOverlay.classList.add("active");
  contactOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (closeContact) closeContact.focus();
}

function hideContact() {
  if (!contactOverlay) return;
  contactOverlay.classList.remove("active");
  contactOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (openContact) openContact.focus();
}

if (openContact && closeContact && contactOverlay) {
  openContact.addEventListener("click", showContact);
  closeContact.addEventListener("click", hideContact);
  contactOverlay.addEventListener("click", (event) => {
    if (event.target === contactOverlay) hideContact();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactOverlay.classList.contains("active")) hideContact();
  });
}
