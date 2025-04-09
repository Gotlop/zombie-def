const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas
canvas.width = 800;
canvas.height = 600;

// Objek pemain
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
    color: '#0f0'
};

// Array untuk zombie
let zombies = [];
const zombieSpeed = 2;
const zombieSpawnRate = 1000; // Spawn setiap 1 detik

// Kontrol
let keys = {};

// Event listener untuk kontrol
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Fungsi untuk spawn zombie
function spawnZombie() {
    const zombie = {
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        color: '#f00'
    };
    zombies.push(zombie);
}

// Update posisi pemain
function updatePlayer() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
}

// Update posisi zombie
function updateZombies() {
    zombies.forEach((zombie, index) => {
        zombie.y += zombieSpeed;
        // Hapus zombie jika keluar layar
        if (zombie.y > canvas.height) {
            zombies.splice(index, 1);
        }
    });
}

// Gambar semua elemen
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar pemain
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Gambar zombie
    zombies.forEach(zombie => {
        ctx.fillStyle = zombie.color;
        ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
    });
}

// Loop utama game
function gameLoop() {
    updatePlayer();
    updateZombies();
    draw();
    requestAnimationFrame(gameLoop);
}

// Mulai spawn zombie
setInterval(spawnZombie, zombieSpawnRate);

// Mulai game
gameLoop();
