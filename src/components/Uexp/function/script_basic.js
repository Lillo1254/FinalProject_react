// navbar

export function clickoutside(selector) {
  if (!selector) return () => { };

  const handler = (e) => {
    const menus = document.querySelectorAll(selector);
    if (!menus || menus.length === 0) return;

    menus.forEach((menu) => {
      if (!menu.contains(e.target)) {
        if (menu.hasAttribute("open")) {
          menu.removeAttribute("open");
        }
      }
    });
  };
  document.addEventListener("pointerdown", handler);
  return () => document.removeEventListener("pointerdown", handler);
}

// card Detail rating
export function getRatingStars(ratings) {

  let totalPercent = 0;
  let totalWeight = 0;

  ratings.forEach(r => {
    totalPercent += r.id * r.percent;
    totalWeight += r.percent;
  });

  const media = totalPercent / totalWeight;

  if (media >= 4.5) return "⭐⭐⭐⭐⭐ (Exceptional)";
  if (media >= 3.5) return "⭐⭐⭐⭐ (Recommended)";
  if (media >= 2.5) return "⭐⭐⭐ (Meh)";
  if (media >= 1.5) return "⭐⭐ (Poor)";
  return "⭐ (Skip)";
}

// copiata da internet ihihih
export function follow() {
  let lastX = 0;
  let lastY = 0;
  const threshold = 1; 

  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < threshold) return;

    lastX = e.clientX;
    lastY = e.clientY;

    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    document.body.appendChild(trail);
    setTimeout(() => {
      trail.style.opacity = "0";
      trail.style.transform = "translate(-50%, -50%) scaleX(2)";
      setTimeout(() => trail.remove(), 800);
    }, 0);
  });
}

// 



