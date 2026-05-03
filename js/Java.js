// Fonction pour le header responsive

function afficherMenu () {
    let menu = document.getElementById("liens");
    if (menu.style.display === "none") {
        menu.style.display = "flex";
    }
    else {
        menu.style.display = "none";
    }
    return;
}

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        document.getElementById("liens").style.display = "flex";}
    else {
        document.getElementById("liens").style.display = "none";
        }
    }
);

// Fonctions pour les boutons sur la photo d'accueil

function contact() {
    window.location.replace("./Contact.html");
}

// fonctions pour le carrousel de la page d'accueil

let current = 0;

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.evenement');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(s => s.style.display = 'none');
    slides[0].style.display = 'block';
    dots[0].style.opacity = '1';

    window.goTo = function(idx) {
        slides[current].style.display = 'none';
        dots[current].style.opacity = '0.3';
        current = (idx + slides.length) % slides.length;
        slides[current].style.display = 'block';
        dots[current].style.opacity = '1';
    }
});

// fonctions pour l'affichage des cartes

function basculer(id) {
  const liste = document.querySelector('#' + id + " .a-afficher");
  if (liste.style.display === 'block') {
    liste.style.display = 'none';
  } else {
    liste.style.display = 'block';
  }
}

// Carrousel de la page contact

const slides = document.querySelectorAll('.professeur');
let index = 0;

function getNbVisibles() {
    return window.innerWidth <= 1024 ? 1 : 3;
}

function allerA(position) {
    slides.forEach(slide => slide.style.display = 'none');
    index = ((position % slides.length) + slides.length) % slides.length;
    const visibles = getNbVisibles();
    for (let i = 0; i < visibles; i++) {
        slides[(index + i) % slides.length].style.display = 'block';
    }
}

allerA(0);
setInterval(() => allerA(index + getNbVisibles()), 3000);

window.addEventListener('resize', () => allerA(index));