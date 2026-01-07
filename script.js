const ghost = document.getElementById("ghost");
let timer = null;

function tap() {
  ghost.src = "assets/ghost_tap.png";
  clearTimeout(timer);
  timer = setTimeout(() => (ghost.src = "assets/ghost_idle.png"), 80);
}

window.addEventListener("keydown", tap);
window.addEventListener("mousedown", tap);
