/**
 * 3D-зуби, що плавають з фізикою та адаптацією до скролу
 */
class FloatingTeeth {
  constructor() {
    this.canvas = document.getElementById('teeth-bg');
    this.ctx = this.canvas.getContext('2d');
    this.teeth = [];
    this.lastFrameTime = 0;
    this.scrollY = 0;
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.createTeethPool();
    this.setupEventListeners();
    this.animate(0);
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.body.scrollHeight;
    this.canvas.style.opacity = '0.15';
  }

  createTeethPool() {
    const density = 0.00005; // зубів на піксель
    const totalPixels = this.canvas.width * this.canvas.height;
    this.teethCount = Math.floor(totalPixels * density);
    
    this.teeth = Array.from({ length: this.teethCount }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: 15 + Math.random() * 35,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.1,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: `hsl(${30 + Math.random() * 20}, 30%, ${85 + Math.random() * 10}%)`
    }));
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = document.body.scrollHeight;
    });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Оптимізація: рендеримо тільки видиму область
    const renderTop = this.scrollY - 200;
    const renderBottom = this.scrollY + window.innerHeight + 200;

    this.teeth.forEach(tooth => {
      // Оновлюємо позицію
      tooth.x += tooth.speedX;
      tooth.y += tooth.speedY;
      tooth.angle += tooth.rotationSpeed;

      // Відбивання від країв
      if (tooth.x < 0 || tooth.x > this.canvas.width) tooth.speedX *= -1;
      if (tooth.y < 0 || tooth.y > this.canvas.height) tooth.speedY *= -1;

      // Малюємо тільки якщо зуб у видимій зоні
      if (tooth.y >= renderTop && tooth.y <= renderBottom) {
        this.drawTooth(tooth);
      }
    });

    requestAnimationFrame(this.animate.bind(this));
  }

  drawTooth(tooth) {
    this.ctx.save();
    this.ctx.translate(tooth.x, tooth.y);
    this.ctx.rotate(tooth.angle);

    // 3D-ефект через градієнт
    const gradient = this.ctx.createLinearGradient(
      -tooth.size/2, 0,
      tooth.size/2, 0
    );
    gradient.addColorStop(0, tooth.color);
    gradient.addColorStop(1, this.lightenColor(tooth.color, 20));

    // Форма зуба з кривими Безьє
    this.ctx.beginPath();
    this.ctx.moveTo(-tooth.size/2, 0);
    this.ctx.bezierCurveTo(
      -tooth.size/4, -tooth.size/3,
      tooth.size/4, -tooth.size/3,
      tooth.size/2, 0
    );
    this.ctx.bezierCurveTo(
      tooth.size/4, tooth.size/4,
      -tooth.size/4, tooth.size/4,
      -tooth.size/2, 0
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Тінь для глибини
    this.ctx.strokeStyle = `rgba(0, 0, 0, 0.05)`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1)}`;
  }
}

// Ініціалізація при повному завантаженні
if (document.readyState === 'complete') {
  new FloatingTeeth();
} else {
  window.addEventListener('load', () => new FloatingTeeth());
}
