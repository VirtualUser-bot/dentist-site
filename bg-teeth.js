/**
 * Реалістичний рендеринг зубів для фону
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('teeth-bg');
  const ctx = canvas.getContext('2d');
  
  // Кольори для зубів
  const toothColors = ['#f8f4ff', '#fffaf0', '#f5fffa'];
  const shadowColor = 'rgba(0, 0, 0, 0.1)';

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTeeth();
  }

  function drawTeeth() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Кількість зубів залежить від розміру екрану
    const teethCount = Math.floor((canvas.width * canvas.height) / 50000);
    
    for (let i = 0; i < teethCount; i++) {
      drawTooth(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        20 + Math.random() * 40
      );
    }
  }

  function drawTooth(x, y, size) {
    // Форма зуба (більш реалістична)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + size/3, y - size/2,
      x + size*2/3, y - size/2,
      x + size, y
    );
    ctx.bezierCurveTo(
      x + size*2/3, y + size/4,
      x + size/3, y + size/4,
      x, y
    );
    ctx.closePath();
    
    // Градієнт для об'ємного ефекту
    const gradient = ctx.createLinearGradient(x, y - size/2, x, y + size/4);
    gradient.addColorStop(0, toothColors[Math.floor(Math.random() * toothColors.length)]);
    gradient.addColorStop(1, '#e6e6fa');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Тінь для реалізму
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  window.addEventListener('resize', initCanvas);
  initCanvas();
});
