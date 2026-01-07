const ghost = document.getElementById("ghost");
const spark = document.getElementById("spark");
const cursorDot = document.getElementById("cursorDot");
const stage = document.querySelector(".stage");

const GHOST_IDLE = "ghost_idle.png";
const GHOST_CLICK = "ghost_click.png";

let idleTimer = null;

/* Switch ghost pose */
function ghostClick(duration = 120) {
  ghost.src = GHOST_CLICK;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    ghost.src = GHOST_IDLE;
  }, duration);
}

/* Spark pop */
function popSpark(x, y) {
  spark.style.left = x + "px";
  spark.style.top = y + "px";
  spark.style.opacity = "1";
  spark.style.transform = "translate(-50%, -50%) scale(1.4)";

  setTimeout(() => {
    spark.style.opacity = "0";
    spark.style.transform = "translate(-50%, -50%) scale(0.8)";
  }, 90);
}

/* Convert mouse position to stage coords */
function stageCoords(clientX, clientY) {
  const r = stage.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
}

/* Keyboard press → ghost hits keyboard */
window.addEventListener("keydown", () => {
  ghostClick(110);

  const r = stage.getBoundingClientRect();
  const x = r.width * 0.35 + (Math.random() * 80 - 40);
  const y = r.height * 0.80 + (Math.random() * 40 - 20);
  popSpark(x, y);
});

/* Mouse click → ghost hits mouse */
window.addEventListener("mousedown", (e) => {
  const p = stageCoords(e.clientX, e.clientY);
  ghostClick(140);
  popSpark(p.x, p.y);
});

/* Mouse move → ghost follows slightly */
window.addEventListener("mousemove", (e) => {
  const p = stageCoords(e.clientX, e.clientY);

  cursorDot.style.left = p.x + "px";
  cursorDot.style.top = p.y + "px";

  const r = stage.getBoundingClientRect();
  const dx = (p.x - r.width / 2) / (r.width / 2);
  const dy = (p.y - r.height / 2) / (r.height / 2);

  ghost.style.transform =
    `translateX(-50%) translate(${dx * 16}px, ${dy * 10}px)`;
});
