const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const banner = document.getElementById('love-banner');

// --- Dessin du bonhomme ---
function drawStickman() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    // Tête
    ctx.beginPath();
    ctx.arc(150, 200, 30, 0, Math.PI * 2);
    ctx.stroke();

    // Corps
    ctx.beginPath();
    ctx.moveTo(150, 230);
    ctx.lineTo(150, 320);
    ctx.stroke();

    // Bras
    ctx.beginPath();
    ctx.moveTo(150, 260);
    ctx.lineTo(100, 220); // Bras gauche
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(150, 260);
    ctx.lineTo(220, 290); // Bras droit (qui dessine)
    ctx.stroke();

    // Jambes
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(100, 400);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(200, 400);
    ctx.stroke();
}

// --- Dessin d'un coeur ---
function drawHeart(x, y, size) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 75%)`; // Couleurs pastel aléatoires
    ctx.beginPath();
    let topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // Courbe du haut à gauche
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    // Courbe du bas à gauche
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    // Courbe du bas à droite
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    // Courbe du haut à droite
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

// --- Animation ---
const hearts = [];
const totalHearts = 25;
const heartInterval = 200; // ms entre chaque coeur

function startAnimation() {
    drawStickman();

    for (let i = 0; i < totalHearts; i++) {
        setTimeout(() => {
            const x = 230 + Math.random() * (canvas.width - 300);
            const y = 50 + Math.random() * (canvas.height - 150);
            const size = 20 + Math.random() * 30;
            drawHeart(x, y, size);
        }, i * heartInterval);
    }

    // Afficher la bannière à la fin
    setTimeout(() => {
        banner.style.display = 'block';
    }, totalHearts * heartInterval + 500);
}

startAnimation();

// Redessiner si la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    startAnimation(); // Relance l'animation
});