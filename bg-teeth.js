/**
 * Оптимізований клас для плаваючих зубів з новими фішками
 */
class FloatingTeeth {
  constructor() {
    this.canvas = document.getElementById('teeth-bg');
    if (!this.canvas) {
      console.error('Canvas element #teeth-bg not found!');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.teeth = [];
    this.lastFrameTime = 0;
    this.scrollY = 0;
    this.animationId = null;
    this.devicePixelRatio = window.devicePixelRatio || 1;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createTeethPool();
    this.setupEventListeners();
    this.animate();
  }

  setupCanvas() {
    const width = window.innerWidth;
    const height = document.body.scrollHeight;

    // Оптимізація для ретіна-дисплеїв
    this.canvas.width = width * this.devicePixelRatio;
    this.canvas.height = height * this.devicePixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.style.opacity = '0.1';
    this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
  }

  createTeethPool() {
    const density = 0.00003; // Оптимальна кількість зубів
    const area = this.canvas.width * this.canvas.height / (this.devicePixelRatio ** 2);
    this.teethCount = Math.min(100, Math.floor(area * density));

    this.teeth = Array.from({ length: this.teethCount }, () => {
      const size = 15 + Math.random() * 35;
      return {
        x: Math.random() * (this.canvas.width / this.devicePixelRatio - size),
        y: Math.random() * (this.canvas.height / this.devicePixelRatio - size),
        size: size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.15,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        color: `hsla(${30 + Math.random() * 20}, 30%, 85%, ${0.2 + Math.random() * 0.2})`
      };
    });
  }

  setupEventListeners() {
    const resizeObserver = new ResizeObserver(() => {
      this.setupCanvas();
      this.createTeethPool();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // Оптимізація для табів/мобільних пристроїв
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId);
      } else {
        this.animate();
      }
    });
  }

  animate() {
    this.animationId = requestAnimationFrame((timestamp) => {
      const deltaTime = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;

      // Оптимізація: оновлюємо не частіше 60 FPS
      if (deltaTime < 16) {
        this.animate();
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Видима область з запасом
      const renderTop = this.scrollY - 500;
      const renderBottom = this.scrollY + window.innerHeight + 500;

      this.teeth.forEach(tooth => {
        // Плавніший рух з урахуванням deltaTime
        tooth.x += tooth.speedX * (deltaTime / 16);
        tooth.y += tooth.speedY * (deltaTime / 16);
        tooth.angle += tooth.rotationSpeed * (deltaTime / 16);

        // Відбивання від країв з "в'язкістю"
        if (tooth.x < 0) {
          tooth.x = 0;
          tooth.speedX *= -0.8;
        } else if (tooth.x > this.canvas.width / this.devicePixelRatio - tooth.size) {
          tooth.x = this.canvas.width / this.devicePixelRatio - tooth.size;
          tooth.speedX *= -0.8;
        }

        if (tooth.y < 0) {
          tooth.y = 0;
          tooth.speedY *= -0.8;
        } else if (tooth.y > this.canvas.height / this.devicePixelRatio - tooth.size) {
          tooth.y = this.canvas.height / this.devicePixelRatio - tooth.size;
          tooth.speedY *= -0.8;
        }

        // Малюємо тільки видимі зуби
        if (tooth.y + tooth.size >= renderTop && tooth.y <= renderBottom) {
          this.drawTooth(tooth);
        }
      });

      this.animate();
    });
  }

  drawTooth(tooth) {
    this.ctx.save();
    this.ctx.translate(tooth.x, tooth.y);
    this.ctx.rotate(tooth.angle);

    // Спрощена версія зуба для продуктивності
    this.ctx.beginPath();
    this.ctx.ellipse(
      tooth.size/4, 0,
      tooth.size/2, tooth.size/3,
      0, 0, Math.PI * 2
    );
    this.ctx.fillStyle = tooth.color;
    this.ctx.fill();

    // Додамо трохи деталей
    this.ctx.beginPath();
    this.ctx.moveTo(-tooth.size/3, 0);
    this.ctx.lineTo(tooth.size/3, 0);
    this.ctx.strokeStyle = `hsla(0, 0%, 100%, 0.3)`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    this.teeth = [];
  }
}

// Більш надійна ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    try {
      new FloatingTeeth();
    } catch (error) {
      console.error('FloatingTeeth initialization error:', error);
    }
  }, 300); // Невелика затримка для стабілізації DOM
});
