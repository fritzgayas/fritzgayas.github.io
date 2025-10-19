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