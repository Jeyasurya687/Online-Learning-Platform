document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile menu
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // 2. Course search
  const searchBtn = document.getElementById("searchBtn");
  const searchBox = document.getElementById("searchBox");
  const courses = [...document.querySelectorAll(".course")];
  const noResults = document.getElementById("noResults");

  searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("show");
    if (searchBox.classList.contains("show")) searchBox.focus();
  });

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim().toLowerCase();
    let found = 0;

    courses.forEach(course => {
      const text = (course.textContent + " " + course.dataset.course).toLowerCase();
      const match = text.includes(query);
      course.hidden = !match;
      if (match) found++;
    });

    noResults.hidden = found !== 0;
  });

  // 3. Course preview popup
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalClose = document.getElementById("modalClose");
  const modalStart = document.getElementById("modalStart");

  function closeModal() {
    modal.hidden = true;
  }

  document.querySelectorAll(".play").forEach(button => {
    button.addEventListener("click", () => {
      modalTitle.textContent =
        button.closest(".course").querySelector("h3").textContent;
      modal.hidden = false;
      modalClose.focus();
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  modalStart.addEventListener("click", () => {
    alert("Great! Connect this button to your real course page later.");
    closeModal();
  });

  // 4. Hero preview button
  document.getElementById("watchBtn").addEventListener("click", () => {
    alert("Preview video coming soon. You can replace this with a YouTube or local video.");
  });

  // 5. View all courses button
  document.getElementById("allCoursesBtn").addEventListener("click", () => {
    searchBox.value = "";
    courses.forEach(course => course.hidden = false);
    noResults.hidden = true;
    document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
  });

  // 6. Animated statistics
  const counters = document.querySelectorAll("[data-target]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      const suffix = element.textContent.includes("%") ? "%" :
                     element.textContent.includes("+") ? "+" : "";

      let current = 0;
      const duration = 1200;
      const start = performance.now();

      function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        current = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
        element.textContent = current.toLocaleString("en-IN") + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));

  // 7. Newsletter
  const newsletter = document.getElementById("newsletter");
  const email = document.getElementById("email");
  const formMessage = document.getElementById("formMessage");

  newsletter.addEventListener("submit", event => {
    event.preventDefault();

    if (!email.value.trim() || !email.checkValidity()) {
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    formMessage.textContent = "Subscribed successfully! 🎉";
    email.value = "";
  });
});
