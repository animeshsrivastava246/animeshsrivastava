const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const uiStartMenu = document.getElementById('start-menu');
const uiHUD = document.getElementById('hud');
const uiGameOver = document.getElementById('game-over');
const btnStart = document.getElementById('start-btn');
const btnRestart = document.getElementById('restart-btn');
const valScore = document.getElementById('score-val');
const valMultiplier = document.getElementById('multiplier-val');
const valFinalScore = document.getElementById('final-score');
const valFinalMultiplier = document.getElementById('final-multiplier');
const elEnergyFill = document.getElementById('energy-fill');

// Game State Enum
const STATE = {
  MENU: 0,
  PLAYING: 1,
  GAMEOVER: 2
};

let currentState = STATE.MENU;

// System config
const PI2 = Math.PI * 2;
let width, height;
let lastTime = 0;
let isPaused = false;

document.addEventListener('visibilitychange', () => {
  isPaused = document.hidden;
});
let score = 0;
let multiplier = 1;
let comboTimer = 0;
const MAX_COMBO_TIME = 2000; // ms
let gameSessionId = 0; // to track restarts

// Input State
const input = {
  x: window.innerWidth / 2,
  y: window.innerHeight * 0.8,
  isDown: false
};

// Colors matching CSS
const COLORS = {
  cyan: '#C5A059', // Brass / Gold
  pink: '#5B7C99', // Cold Steel
  purple: '#111111', // Deep shadow
  red: '#8A0303', // Blood Red
  white: '#e6e6e6' // Smoke White
};

// Resize handler
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // if menu, center input
  if (currentState === STATE.MENU) {
    input.x = width / 2;
    input.y = height * 0.8;
  }
}
window.addEventListener('resize', resize);
resize();

// Input Listeners
function moveHandler(x, y) {
  input.x = x;
  input.y = y;
}

window.addEventListener('mousemove', e => {
  moveHandler(e.clientX, e.clientY);
});

window.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    moveHandler(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: false }); // Allow preventDefault entirely on html/body via CSS, but passive false allows checking e.cancelable if needed.

// Prevent context menu on long press
window.addEventListener('contextmenu', e => e.preventDefault());

// Entities Arrays
let particles = [];
let entities = [];
let stars = [];

// Init Background Stars (Speed lines)
function initStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.1, // determines speed & size
      color: Math.random() > 0.5 ? COLORS.purple : 'rgba(255,255,255,0.3)',
      speed: (Math.random() * 2 + 1)
    });
  }
}

// Player Class
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.8;
    this.radius = 15;
    this.color = COLORS.cyan;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.15; // interpolation speed
    this.energy = 100;
  }

  update(dt) {
    // Smooth follow cursor/touch
    this.x += (input.x - this.x) * this.speed * (dt / 16);
    this.y += (input.y - this.y) * this.speed * (dt / 16);

    // Bounds check
    this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));

    // Energy drain mechanics
    if (this.energy > 0) {
      this.energy -= dt * 0.005; // slow drain
    }

    // Thruster particles
    if (Math.random() > 0.5) {
      spawnParticle(this.x, this.y + this.radius, (Math.random() - 0.5) * 2, Math.random() * 2 + 2, COLORS.cyan, 1, 3);
    }
  }

  draw(ctx) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;

    // Draw player as a futuristic glowing triangle
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.radius * 1.5);
    ctx.lineTo(this.x + this.radius, this.y + this.radius);
    ctx.lineTo(this.x, this.y + this.radius * 0.5);
    ctx.lineTo(this.x - this.radius, this.y + this.radius);
    ctx.closePath();
    ctx.fill();

    // Core
    ctx.shadowBlur = 0;
    ctx.fillStyle = COLORS.white;
    ctx.beginPath();
    ctx.arc(this.x | 0, this.y | 0, 3, 0, PI2);
    ctx.fill();
  }

  hit() {
    // Explode
    for (let i = 0; i < 30; i++) {
      spawnParticle(this.x, this.y, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, COLORS.cyan, 2, Math.random() * 4 + 2);
    }
    gameOver();
  }
}

// Enemy Obstacles Class
class Enemy {
  constructor() {
    this.x = Math.random() * width;
    this.y = -50;
    this.radius = Math.random() * 15 + 10;
    this.baseSpeed = Math.random() * 3 + 2;
    this.speed = this.baseSpeed + (score / 5000); // gets faster
    this.color = COLORS.red;
    this.angle = 0;
    this.rotSpeed = (Math.random() - 0.5) * 0.1;
    this.type = 'enemy';
    this.markedForDeletion = false;
  }

  update(dt) {
    this.y += this.speed * (dt / 16) * (currentState === STATE.MENU ? 0.3 : 1);
    this.angle += this.rotSpeed * (dt / 16);

    if (this.y > height + this.radius) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    // Hexagon
    for (let i = 0; i < 6; i++) {
      const a = (PI2 / 6) * i;
      ctx.lineTo(Math.cos(a) * this.radius, Math.sin(a) * this.radius);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(138, 3, 3, 0.2)';
    ctx.fill();
    ctx.restore();
  }
}

// Collectible Class
class Collectable {
  constructor() {
    this.x = Math.random() * width;
    this.y = -50;
    this.radius = 8;
    this.speed = 3 + (score / 10000);
    this.color = Math.random() > 0.8 ? COLORS.pink : COLORS.cyan;
    this.type = 'collectable';
    this.markedForDeletion = false;
    this.pulse = 0;
  }

  update(dt) {
    this.y += this.speed * (dt / 16) * (currentState === STATE.MENU ? 0.3 : 1);
    this.pulse += 0.1 * (dt / 16);
    if (this.y > height + this.radius) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    const pRadius = this.radius + Math.sin(this.pulse) * 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x | 0, this.y | 0, pRadius, 0, PI2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = COLORS.white;
    ctx.beginPath();
    ctx.arc(this.x | 0, this.y | 0, pRadius / 2, 0, PI2);
    ctx.fill();
  }
}

// Particle System
class Particle {
  constructor(x, y, vx, vy, color, lifeStart, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.life = lifeStart;
    this.lifeStart = lifeStart;
    this.size = size;
    this.markedForDeletion = false;
  }
  update(dt) {
    this.x += this.vx * (dt / 16);
    this.y += this.vy * (dt / 16);
    this.life -= 0.05 * (dt / 16);
    if (this.life <= 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    const alpha = Math.max(0, this.life / this.lifeStart);
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x | 0, this.y | 0, this.size * alpha, 0, PI2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

function spawnParticle(x, y, vx, vy, color, life, size) {
  particles.push(new Particle(x, y, vx, vy, color, life, size));
}

let player;
let spawnTimer = 0;

function startGame() {
  score = 0;
  multiplier = 1;
  comboTimer = 0;
  gameSessionId++;
  entities = [];
  particles = [];
  initStars();
  player = new Player();
  currentState = STATE.PLAYING;

  // UI transitions
  uiStartMenu.classList.remove('active');
  uiGameOver.classList.remove('active');
  uiHUD.classList.add('active');

  updateHUD();
}

function gameOver() {
  currentState = STATE.GAMEOVER;

  // Update final stats
  valFinalScore.innerText = score.toString().padStart(5, '0');
  valFinalMultiplier.innerText = 'x' + multiplier;

  // UI transition
  uiHUD.classList.remove('active');
  uiGameOver.classList.add('active');
}

// Spawner logic
function handleSpawns(dt) {
  spawnTimer += dt;
  const spawnRate = Math.max(200, 1000 - (score * 0.05)); // Gets faster

  if (spawnTimer > spawnRate) {
    if (Math.random() < 0.7) {
      entities.push(new Enemy());
    } else {
      entities.push(new Collectable());
    }
    spawnTimer = 0;
  }
}

function updateHUD() {
  valScore.innerText = Math.floor(score).toString().padStart(5, '0');
  valMultiplier.innerText = 'x' + multiplier;

  if (player) {
    const e = Math.max(0, player.energy);
    elEnergyFill.style.width = `${e}%`;
    if (e < 30) {
      elEnergyFill.style.backgroundColor = COLORS.red;
    } else {
      elEnergyFill.style.backgroundColor = COLORS.cyan;
    }
  }
}

function update(dt) {
  // Update stars (background)
  const masterSpeed = currentState === STATE.PLAYING ? 1 + (score / 10000) : 0.2;
  stars.forEach(s => {
    s.y += s.speed * s.z * masterSpeed * (dt / 16);
    if (s.y > height) {
      s.y = 0;
      s.x = Math.random() * width;
    }
  });

  // Passive entity updates (even in menu mode for visuals)
  entities.forEach(e => e.update(dt));
  particles.forEach(p => p.update(dt));

  if (currentState === STATE.PLAYING) {
    player.update(dt);

    // Decrease energy slowly
    player.energy -= 0.02 * (dt / 16);
    if (player.energy <= 0) {
      player.hit(); // Explode on energy out
    }

    // Combo timer
    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) {
        multiplier = 1;
        valMultiplier.style.animation = 'none';
      }
    }

    // Passive Score
    score += (0.1 * multiplier) * (dt / 16);

    handleSpawns(dt);

    // Collision Detection
    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      if (e.markedForDeletion) continue;

      const dx = player.x - e.x;
      const dy = player.y - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < player.radius + e.radius) {
        if (e.type === 'enemy') {
          player.hit();
        } else if (e.type === 'collectable') {
          e.markedForDeletion = true;
          score += 100 * multiplier;
          player.energy = Math.min(100, player.energy + 15);

          if (e.color === COLORS.pink) {
            multiplier++;
            comboTimer = MAX_COMBO_TIME;
            valMultiplier.style.animation = 'pulse-cyan 0.5s infinite alternate';
          }

          for (let p = 0; p < 15; p++) {
            spawnParticle(e.x, e.y, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, e.color, 1.5, Math.random() * 3 + 1);
          }
        }
      }
    }

    updateHUD();
  } else if (currentState === STATE.MENU) {
    // visual spawns for menu background
    handleSpawns(dt);
  }

  // Cleanup
  entities = entities.filter(e => !e.markedForDeletion);
  particles = particles.filter(p => !p.markedForDeletion);
}

function draw(time = 0) {
  // Motion blur trail effect
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = `rgba(5, 5, 5, ${currentState === STATE.PLAYING ? 0.3 : 0.1})`;
  ctx.fillRect(0, 0, width, height);

  // Addictive composite operation for glowing
  ctx.globalCompositeOperation = 'lighter';

  // Watermark Animation Logic
  const watermarkTime = time * 0.001;
  const pulseScale = 1 + Math.sin(watermarkTime * 2) * 0.05;
  const glitchOffset = Math.random() > 0.98 ? (Math.random() - 0.5) * 10 : 0;

  ctx.save();
  ctx.translate(width / 2 + glitchOffset, height / 2);
  ctx.rotate(-Math.PI / 12);

  // Outer Glow
  ctx.shadowBlur = 15 + Math.sin(watermarkTime * 4) * 10;
  ctx.shadowColor = COLORS.cyan;

  // Signature Style (Bold, Sharp, Futuristic)
  ctx.font = `900 ${Math.max(width / 14, 30) * pulseScale}px Orbitron`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Layer 1: Dark base (Batman-esque)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillText('ANIMESH SRIVASTAVA', 0, 0);

  // Layer 2: Scrolling Highlight (Peaky Blinders sharp focus/class)
  const gradient = ctx.createLinearGradient(-300, 0, 300, 0);
  const gradOffset = (watermarkTime % 4) / 4;
  gradient.addColorStop(Math.max(0, gradOffset - 0.1), 'rgba(197, 160, 89, 0)');
  gradient.addColorStop(gradOffset, 'rgba(197, 160, 89, 0.25)');
  gradient.addColorStop(Math.min(1, gradOffset + 0.1), 'rgba(197, 160, 89, 0)');

  ctx.fillStyle = gradient;
  ctx.fillText('ANIMESH SRIVASTAVA', 0, 0);

  ctx.restore();

  // Draw Stars
  ctx.fillStyle = COLORS.white;
  stars.forEach(s => {
    ctx.globalAlpha = s.z / 2;
    ctx.beginPath();
    ctx.arc(s.x | 0, s.y | 0, s.z, 0, PI2);
    ctx.fill();
  });
  ctx.globalAlpha = 1.0;

  particles.forEach(p => p.draw(ctx));
  entities.forEach(e => e.draw(ctx));

  if (currentState === STATE.PLAYING && player) {
    player.draw(ctx);
  }
}

function gameLoop(time) {
  if (isPaused) {
    lastTime = time;
    requestAnimationFrame(gameLoop);
    return;
  }

  const dt = time - lastTime;
  lastTime = time;

  // Cap dt to prevent massive jumps when tab is inactive
  if (dt < 100) {
    update(dt);
    draw(time);
  }

  requestAnimationFrame(gameLoop);
}

// Event Listeners for UI
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);

// Init
initStars();
requestAnimationFrame(gameLoop);
