/**
 * 3D-рендеринг зубів для фону сайту
 * Автоматично адаптується до розміру екрану
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('teeth-bg');
  const ctx = canvas.getContext('2d');
  let teethCount = calculateTeethCount();

  // Ініціалізація canvas
  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    teethCount = calculateTeethCount();
    drawTeeth();
  }

  // Малювання зубів
  function drawTeeth() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < teethCount; i++) {
      drawTooth(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        30 + Math.random() * 50
      );
    }
  }

  // Малювання одного зуба
  function drawTooth(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size/2, y - size);
    ctx.lineTo(x + size, y);
    ctx.closePath();
    ctx.fillStyle = '#00b4d8';
    ctx.fill();
  }

  // Розрахунок кількості зубів залежно від розміру екрану
  function calculateTeethCount() {
    const baseCount = 15;
    const screenArea = window.innerWidth * window.innerHeight;
    const referenceArea = 1920 * 1080;
    return Math.floor(baseCount * (screenArea / referenceArea));
  }

  // Обробники подій
  window.addEventListener('resize', () => {
    initCanvas();
  });

  // Початкова ініціалізація
  initCanvas();
});
