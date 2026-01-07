const ghost = document.getElementById("ghost");
const spark = document.getElementById("spark");
const cursorDot = document.getElementById("cursorDot");

const GHOST_IDLE = "assets/ghost_idle.png";
const GHOST_CLICK = "assets/ghost_click.png";

let backToIdleTimer = null;

// Utility: switch ghost pose briefly
function setGhostClickPose(duration = 120) {
  ghost.src = GHOST_CLICK;
  clearTimeout(backToIdleTimer);
  backToIdleTimer = setTimeout(() => (ghost.src = GHOST_IDLE), duration);
}

// Utility: spark effect at x/y inside stage
function popSpark(x, y) {
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.opacity = "1";
  spark.style.transform = "translate(-50%, -50%) scale(1.35)";
  // fade out
  setTimeout(() => {
    spark.style.opacity = "0";
    spark.style.transform = "translate(-50%, -50%) scale(0.9)";
  }, 90);
}

// Get stage-local coordinates
const stage = document.querySelector(".stage");
function toStageXY(clientX, clientY) {
  const r = stage.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
}

// Keyboard press => ghost click near keyboard
window.addEventListener("keydown", (e) => {
  setGhostClickPose(110);

  // spark somewhere around the keyboard area
  const r = stage.getBoundingClientRect();
  const x = r.width * 0.34 + (Math.random() * 80 - 40);
  const y = r.height * 0.78 + (Math.random() * 40 - 20);
  popSpark(x, y);
});

// Mouse click => ghost click at cursor position
window.addEventListener("mousedown", (e) => {
  const p = toStageXY(e.clientX, e.clientY);
  setGhostClickPose(140);
  popSpark(p.x, p.y);
});

// Mouse move => show cursor dot + ghost “leans” slightly toward cursor
window.addEventListener("mousemove", (e) => {
  const p = toStageXY(e.clientX, e.clientY);

  // cursor indicator
  cursorDot.style.left = `${p.x}px`;
  cursorDot.style.top = `${p.y}px`;

  // ghost subtle follow
  const r = stage.getBoundingClientRect();
  const dx = (p.x - r.width / 2) / (r.width / 2);   // -1..1
  const dy = (p.y - r.height / 2) / (r.height / 2); // -1..1

  ghost.style.transform =
    `translateX(-50%) translate(${dx * 14}px, ${dy * 8}px)`;
});
