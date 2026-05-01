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

// Fonctions pour les boutons

function contact() {
    window.location.replace("./Contact.html");
}

// fonctions pour le carorusel

let current = 0;

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.evenement');
    const dots = document.querySelectorAll('.dot');

    slides[0].classList.add('active');
    dots[0].classList.add('active');

    window.goTo = function(idx) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }
});