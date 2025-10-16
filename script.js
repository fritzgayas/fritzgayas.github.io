/* Menu Icon */

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

/* Typed Animation */

const typed = new Typed('.multiple-text', {
    strings: ['Computer Engineer', 'Software Developer', 'Cloud Practitioner', 'Machine Learning Practitioner'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
    });

/* Multiple Infinite Carousel */
document.addEventListener('DOMContentLoaded', function () {
  function createInfiniteCarousels() {
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
      const carouselInner = container.querySelector('.carousel-inner');
      const originalGroup = container.querySelector('.original-group');
      const itemCount = parseInt(container.getAttribute('data-items')) || 4;

      if (!originalGroup) return;

      // 1. Remove old duplicates
      carouselInner.querySelectorAll('.group:not(.original-group)').forEach(dup => dup.remove());

      // 2. Get actual group width
      const groupWidth = calculateActualGroupWidth(originalGroup);
      if (groupWidth <= 0) return;

      const viewportWidth = window.innerWidth;

      // 3. Calculate how many duplicates are needed
      const groupsNeeded = Math.ceil((viewportWidth * 3) / groupWidth);

      // 4. Clone groups to fill the space
      for (let i = 0; i < groupsNeeded; i++) {
        const duplicate = originalGroup.cloneNode(true);
        duplicate.classList.remove('original-group');
        duplicate.setAttribute('aria-hidden', 'true');
        carouselInner.appendChild(duplicate);
      }

      // 5. Adjust speed based on total width
      const totalGroups = groupsNeeded + 1;
      const totalContentWidth = groupWidth * totalGroups;
      setOptimalAnimationSpeed(carouselInner, totalContentWidth, itemCount);
    });
  }

  function calculateActualGroupWidth(group) {
    const rect = group.getBoundingClientRect();
    return rect.width;
  }

  function setOptimalAnimationSpeed(carouselInner, totalContentWidth, itemCount) {
    const scrollDistance = totalContentWidth - window.innerWidth;
    carouselInner.style.setProperty('--scroll-distance', `${scrollDistance}px`);

    // Base speed
    const baseSpeedPer1000px = 12;
    const calculatedSpeed = (scrollDistance / 1000) * baseSpeedPer1000px;

    // Slightly faster if more items
    const itemCountFactor = Math.max(0.8, 6 / itemCount);
    let finalSpeed = calculatedSpeed * itemCountFactor;

    // Responsive adjustments for mobile
    if (window.innerWidth <= 480) {
      finalSpeed *= 0.05;
    } else if (window.innerWidth <= 768) {
      finalSpeed *= 0.1;
    } else {
      finalSpeed *= 0.4;
    }

    const clampedSpeed = Math.max(8, Math.min(30, finalSpeed));

    // ✅ Update only the CSS variable
    carouselInner.style.setProperty('--scroll-speed', `${clampedSpeed}s`);

    // Optional debug
    console.log(
      `Carousel Speed: ${clampedSpeed}s | Distance: ${scrollDistance}px | Total Width: ${totalContentWidth}px`
    );
  }

  createInfiniteCarousels();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createInfiniteCarousels, 250);
  });
});

/* EmailJS */
(function() {
  emailjs.init({
    publicKey: "B0r4Ve0znHWpK9Rg_"   // Replace with your actual Public Key from EmailJS
  });
})();

function sendMail() {
  const parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    number: document.getElementById("number").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs
    .send("service_qr9fwrt", "template_cu7tv3c", parms)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(function(error) {
      console.error("Email sending failed:", error);
      alert("Failed to send message. Please try again.");
    });
}

/* Loading Screen */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const chargerIcon = document.getElementById("charger-icon");

  let progress = 0;

  const interval = setInterval(() => {
    if (progress < 100) {
      progress++;
      progressBar.style.width = progress + "%";
      progressText.textContent = progress + "%";

      // Move the ⚡ icon along with the bar
      chargerIcon.style.left = progress + "%";
    } else {
      clearInterval(interval);

      // Fade out after reaching 100%
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
      }, 600);
    }
  }, 20);
});