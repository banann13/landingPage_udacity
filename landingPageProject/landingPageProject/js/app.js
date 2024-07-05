document.addEventListener("DOMContentLoaded", () => {
  // Get the nav list and all the sections
  const navList = document.getElementById("navbar__list");
  const sections = document.querySelectorAll("section");

  // Build the navigation menu
  const createNavMenu = () => {
    let navHTML = "";
    sections.forEach((section) => {
      const sectionID = section.id;
      const sectionName = section.dataset.nav;
      navHTML += `<li><a class="menu__link" href="#${sectionID}">${sectionName}</a></li>`;
    });
    navList.innerHTML = navHTML;
  };

  // Call the function to create the nav menu
  createNavMenu();

  // Get the distance of a section from the top of the viewport
  const getSectionDistance = (section) =>
    Math.floor(section.getBoundingClientRect().top);

  // Remove the active class from a section
  const deactivateSection = (section) => {
    section.classList.remove("your-active-class");
    section.style.cssText =
      "background: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%);";
  };

  // Add the active class to a section if it's in the viewport
  const activateSection = (condition, section) => {
    if (condition) {
      section.classList.add("your-active-class");
      section.style.cssText = "background: #333;";
    }
  };

  // Highlight the section currently in the viewport
  const highlightSectionInView = () => {
    sections.forEach((section) => {
      const sectionDistance = getSectionDistance(section);
      const inView = sectionDistance < 150 && sectionDistance >= -150;
      deactivateSection(section);
      activateSection(inView, section);
    });
  };

  // Listen for scroll events to highlight sections
  window.addEventListener("scroll", highlightSectionInView);

  // Smooth scroll to sections when nav links are clicked
  const setupSmoothScrolling = () => {
    const navLinks = document.querySelectorAll(".menu__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        document
          .querySelector(link.getAttribute("href"))
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  // Enable smooth scrolling
  setupSmoothScrolling();

  // Hide the nav menu when not scrolling
  let scrollTimer;
  const navMenu = document.querySelector(".navbar__menu");

  window.addEventListener("scroll", () => {
    navMenu.style.top = "0";
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      navMenu.style.top = "-50px";
    }, 2000);
  });

  // Show the "scroll to top" button when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  // Scroll to the top when the button is clicked
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
