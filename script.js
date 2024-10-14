
//------------------- MENU HAMBURGER LOGIC-------------------------

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");
const navLinks = document.querySelectorAll("#mobile-menu a");

// Fonction pour ouvrir et fermer le menu
const toggleMenu = () => {
  mobileMenu.classList.toggle("translate-x-full");  // Cache à droite
  mobileMenu.classList.toggle("translate-x-0");     // Affiche vers la gauche
  hamburgerIcon.classList.toggle("hidden");         // Gère icône hamburger
  closeIcon.classList.toggle("hidden");             // Gère icône fermeture
};

// Ouvrir/fermer le menu lors du clic sur le bouton hamburger
menuButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Empêche la propagation pour que le clic sur le bouton n'active pas la fermeture
  toggleMenu();
});

// Fermer le menu lorsqu'on clique sur un lien
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      mobileMenu.classList.add("translate-x-full");  // Cache à droite
      mobileMenu.classList.remove("translate-x-0");  // Cache le menu
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }, 800); // Délai de 800ms
  });
});

// Fermer le menu si on clique en dehors
document.addEventListener("click", (event) => {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnButton = menuButton.contains(event.target);

  if (!isClickInsideMenu && !isClickOnButton) {
    if (!mobileMenu.classList.contains("translate-x-full")) {
      // Fermer le menu seulement si ouvert
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  }
});

//-------------------------ANIMATION H5-------------------------

const title = document.querySelector("h5");
const letters = [... document.querySelectorAll('h5 span')]

title.addEventListener("mouseenter", handleLetters);
title.addEventListener("mouseleave", handleLetters);

let IsAnimatingIn = false;
let calledOUt = false;
let animOpened = false;

function handleLetters() {
  if (animOpened) {
   AnimOut();
   animOpened = false;
   return; 
  }
  if (IsAnimatingIn) {
    calledOUt = true;
    return;
  }

  IsAnimatingIn = true;
  const animPromise = new Promise((resolve) => {
    AnimIn()
    setTimeout(() => {
      resolve()
    }, 750)
  })
  animPromise.then(() => {
    IsAnimatingIn = false;
    if (calledOUt) {
      AnimOut()
      calledOUt = false;
    } else if (!calledOUt) {
      animOpened = true;
    }
   
  })
}

function AnimIn() {
  anime({
    targets: "h5 span",
    translateX: function() {
     return anime.random(-100,100) 
    },
    translateY: function() {
      return anime.random(-100,100) 
    },
    translateZ: function() {
      return anime.random(-2000,750) 
    },
    rotate: function () {
      return anime.random(-250,250) 
    },
    easing: "easeOutCirc",
    durattion: 750
  })
}

function AnimOut() {
  anime({
    targets: "h5 span",
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    easing: "easeInQuad",
    durattion: 750
  })
}
