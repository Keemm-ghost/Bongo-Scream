(() => {
  const ghost = document.getElementById("ghost");

  const SRC = {
    idle: "ii.png",
    key: "k.png",
    mouseLeftUp: "ml.png",
    mouseRightDown: "mr.png",
  };

  let keysHeld = new Set();

  let lastMouseX = null;
  let lastMouseY = null;

  let mouseIdleTimer = null;
  const MOUSE_IDLE_MS = 120; // tweak if needed

  function setImage(src) {
    if (ghost.src.includes(src)) return;
    ghost.src = src;
  }

  function showIdleOrKey() {
    if (keysHeld.size > 0) setImage(SRC.key);
    else setImage(SRC.idle);
  }

  // ---------- KEYBOARD ----------
  window.addEventListener("keydown", (e) => {
    keysHeld.add(e.code);

    // Keyboard only works when mouse is NOT moving
    if (!mouseIdleTimer) {
      setImage(SRC.key);
    }
  });

  window.addEventListener("keyup", (e) => {
    keysHeld.delete(e.code);

    if (!mouseIdleTimer) {
      showIdleOrKey();
    }
  });

  window.addEventListener("blur", () => {
    keysHeld.clear();
    if (!mouseIdleTimer) setImage(SRC.idle);
  });

  // ---------- MOUSE ----------
  window.addEventListener("mousemove", (e) => {
    if (lastMouseX === null || lastMouseY === null) {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      return;
    }

    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    const DEADZONE = 1;
    if (Math.abs(dx) <= DEADZONE && Math.abs(dy) <= DEADZONE) return;

    // Mouse overrides keyboard
    if (dx > 0 || dy > 0) setImage(SRC.mouseRightDown);
    else setImage(SRC.mouseLeftUp);

    if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
    mouseIdleTimer = setTimeout(() => {
      mouseIdleTimer = null;
      showIdleOrKey();
    }, MOUSE_IDLE_MS);
  });
})();
