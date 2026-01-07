html, body { height: 100%; margin: 0; }
body { background:#070711; display:grid; place-items:center; overflow:hidden; }

.stage{
  position: relative;
  width: min(920px, 96vw);
  height: min(520px, 80vh);
  background: radial-gradient(circle at 50% 40%, rgba(155, 80, 255, .35), transparent 60%);
  border-radius: 24px;
}

.prop{ position:absolute; bottom: 40px; filter: drop-shadow(0 10px 18px rgba(0,0,0,.55)); }
.keyboard{ left: 120px; width: 420px; opacity: .95; }
.mouse{ right: 140px; width: 160px; opacity: .95; }

.ghost{
  position:absolute;
  left: 50%;
  bottom: 150px;
  transform: translateX(-50%);
  width: 420px;
  pointer-events:none;
  user-select:none;
}

.spark{
  position:absolute;
  width: 18px; height: 18px;
  border-radius: 999px;
  opacity: 0;
  pointer-events:none;
  background: radial-gradient(circle, rgba(255,255,255,.95), rgba(255,200,120,.65), transparent 70%);
  filter: blur(0.2px) drop-shadow(0 0 16px rgba(255,170,90,.75));
  transform: translate(-50%, -50%) scale(1);
}

.cursor-dot{
  position:absolute;
  width: 8px; height: 8px;
  border-radius: 999px;
  background: rgba(200,160,255,.95);
  transform: translate(-50%, -50%);
  pointer-events:none;
  opacity: .85;
}
