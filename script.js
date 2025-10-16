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
document.addEventListener('DOMContentLoaded', function() {
    // Function to create infinite duplicates with proper spacing
    function createInfiniteCarousels() {
        const carouselContainers = document.querySelectorAll('.carousel-container');
        
        carouselContainers.forEach(container => {
            const carouselInner = container.querySelector('.carousel-inner');
            const originalGroup = container.querySelector('.original-group');
            const itemCount = parseInt(container.getAttribute('data-items'));
            
            if (!originalGroup) return;
            
            // Remove all duplicates first (for resize)
            const duplicates = carouselInner.querySelectorAll('.group:not(.original-group)');
            duplicates.forEach(dup => dup.remove());
            
            // Calculate actual group width including gaps
            const groupWidth = calculateActualGroupWidth(originalGroup);
            const viewportWidth = window.innerWidth;
            
            // Calculate how many duplicates we need to fill 3x viewport
            const groupsNeeded = Math.ceil((viewportWidth * 3) / groupWidth);
            
            // Create duplicates
            for (let i = 0; i < groupsNeeded; i++) {
                const duplicate = originalGroup.cloneNode(true);
                duplicate.classList.remove('original-group');
                duplicate.setAttribute('aria-hidden', 'true');
                carouselInner.appendChild(duplicate);
            }
            
            // Calculate optimal animation speed based on total content
            const totalGroups = groupsNeeded + 1; // original + duplicates
            const totalContentWidth = groupWidth * totalGroups;
            setOptimalAnimationSpeed(carouselInner, totalContentWidth, itemCount);
        });
    }
    
    // Calculate actual group width including all gaps
    function calculateActualGroupWidth(group) {
        // Use getBoundingClientRect for accurate measurement
        const rect = group.getBoundingClientRect();
        return rect.width;
    }
    
    // Set optimal animation speed based on total content width
    function setOptimalAnimationSpeed(carouselInner, totalContentWidth, itemCount) {
        // Base speed: larger content = slower animation
        const baseSpeedPer1000px = 15; // seconds per 1000px of content
        const calculatedSpeed = (totalContentWidth / 1000) * baseSpeedPer1000px;
        
        // Adjust based on item count (more items = slightly faster)
        const itemCountFactor = Math.max(0.8, 6 / itemCount);
        const finalSpeed = calculatedSpeed * itemCountFactor;
        
        // Clamp between reasonable values
        const clampedSpeed = Math.max(20, Math.min(60, finalSpeed));
        
        carouselInner.style.animationDuration = `${clampedSpeed}s`;
        console.log(`Animation: ${clampedSpeed}s for ${itemCount} items, ${Math.round(totalContentWidth)}px total`);
    }
    
    // Initialize on load
    createInfiniteCarousels();
    
    // Re-initialize on resize (with debounce)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createInfiniteCarousels();
        }, 250);
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