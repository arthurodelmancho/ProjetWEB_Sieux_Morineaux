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