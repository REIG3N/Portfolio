// Gestion du menu burger
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const burgerLine1 = document.getElementById('burgerLine1');
const burgerLine2 = document.getElementById('burgerLine2');
const burgerLine3 = document.getElementById('burgerLine3');
let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  
  if (isMenuOpen) {
    menuOverlay.classList.remove('hidden');
    menuOverlay.classList.add('flex');
    menuToggle.setAttribute('aria-expanded', 'true');
    
    // Animation du burger en X
    burgerLine1.style.transform = 'rotate(45deg) translateY(8px)';
    burgerLine2.style.opacity = '0';
    burgerLine3.style.transform = 'rotate(-45deg) translateY(-8px)';
  } else {
    menuOverlay.classList.add('hidden');
    menuOverlay.classList.remove('flex');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Animation du burger retour normal
    burgerLine1.style.transform = 'none';
    burgerLine2.style.opacity = '1';
    burgerLine3.style.transform = 'none';
  }
}

function closeMenu() {
  if (isMenuOpen) {
    toggleMenu();
  }
}

menuToggle.addEventListener('click', toggleMenu);

// Fermer le menu en cliquant sur l'overlay
menuOverlay.addEventListener('click', function(e) {
  if (e.target === menuOverlay) {
    closeMenu();
  }
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      closeMenu();
    }
  });
});

// Configuration ScrollReveal - Révéler uniquement le contenu, pas les backgrounds
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    reset: false,
    viewFactor: 0.2,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  // Section Hero - révéler seulement le contenu
  sr.reveal('#home > div', {
    delay: 200,
    opacity: 0,
    scale: 0.95,
    duration: 800,
    interval: 100
  });

  // Section Compétences - révéler le titre et les icônes
  sr.reveal('#skillsContainer > h2', {
    delay: 200,
    opacity: 0,
    duration: 600
  });

  sr.reveal('#skillsContainer > div > div', {
    delay: 300,
    opacity: 0,
    scale: 0.9,
    duration: 600,
    interval: 50
  });

  // Section Projets - révéler le titre et les cartes
  sr.reveal('#projectContainer > h2', {
    delay: 200,
    opacity: 0,
    duration: 600
  });

  sr.reveal('#projectContainer > div > div', {
    delay: 300,
    opacity: 0,
    scale: 0.95,
    duration: 700,
    interval: 100
  });

  // Section Contact - révéler le contenu
  sr.reveal('#contactContainer > div > p', {
    delay: 200,
    opacity: 0,
    duration: 600
  });

  sr.reveal('#contactContainer > div > div', {
    delay: 300,
    opacity: 0,
    duration: 600
  });

  sr.reveal('#contactContainer > div > a', {
    delay: 400,
    opacity: 0,
    duration: 600,
    interval: 100
  });
}

// Attendre que les images PNG soient chargées avant de les afficher
function checkImagesLoaded() {
  const containers = document.querySelectorAll('.wave-container, .peaks-container, .steps-container');
  
  containers.forEach(container => {
    const images = container.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    // Vérifier chaque image individuellement
    images.forEach(img => {
      // Si l'image est déjà chargée (complete = true)
      if (img.complete && img.naturalHeight !== 0) {
        loadedCount++;
      } else {
        // Attendre le chargement de l'image
        img.addEventListener('load', function() {
          loadedCount++;
          if (loadedCount === totalImages) {
            container.classList.add('loaded');
          }
        }, { once: true });
        
        // Gérer les erreurs de chargement
        img.addEventListener('error', function() {
          loadedCount++;
          // Afficher quand même le conteneur même si certaines images ont échoué
          if (loadedCount === totalImages) {
            container.classList.add('loaded');
          }
        }, { once: true });
      }
    });
    
    // Si toutes les images sont déjà chargées
    if (loadedCount === totalImages && totalImages > 0) {
      container.classList.add('loaded');
    }
  });
}

// Fonction pour vérifier avec plusieurs tentatives
function initImageLoadCheck() {
  // Vérifier immédiatement
  checkImagesLoaded();
  
  // Vérifier après un court délai pour les images qui se chargent rapidement
  setTimeout(checkImagesLoaded, 50);
  
  // Vérifier après un délai moyen
  setTimeout(checkImagesLoaded, 200);
  
  // Vérifier après un délai plus long au cas où
  setTimeout(checkImagesLoaded, 500);
  
  // Fallback : afficher après 1.5 secondes même si pas détecté (au cas où)
  setTimeout(() => {
    const containers = document.querySelectorAll('.wave-container, .peaks-container, .steps-container');
    containers.forEach(container => {
      if (!container.classList.contains('loaded')) {
        container.classList.add('loaded');
      }
    });
  }, 1500);
}

// Initialiser selon l'état du document
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageLoadCheck);
} else {
  // Le DOM est déjà chargé
  initImageLoadCheck();
}

// Vérifier aussi après le chargement complet de la page
window.addEventListener('load', function() {
  setTimeout(checkImagesLoaded, 100);
});

// Fonction pour gérer le système "Lire plus / Lire moins"
function toggleReadMore(elementId, button) {
  const element = document.getElementById(elementId);
  if (element) {
    const isExpanded = element.classList.contains('expanded');
    
    if (isExpanded) {
      element.classList.remove('expanded');
      button.textContent = 'Lire plus';
    } else {
      element.classList.add('expanded');
      button.textContent = 'Lire moins';
    }
  }
}
