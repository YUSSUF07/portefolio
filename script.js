// Variables globales
let nodes = [];
const numNodes = 12; // Légère augmentation pour plus de richesse visuelle

function setup() {
    let canvas = createCanvas(300, 300);
    canvas.parent('neural-network');

    // Initialise les nœuds
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: random(50, width - 50),
            y: random(50, height - 50),
            dx: random(-0.3, 0.3), // Vitesse réduite pour un mouvement plus doux
            dy: random(-0.3, 0.3),
            size: random(8, 12),   // Taille variable des nœuds
            pulse: random(0, TWO_PI) // Pour l’effet de pulsation
        });
    }
}

function draw() {
    clear(); // Fond transparent pour intégrer avec le dégradé CSS

    // Dessine les connexions
    strokeWeight(1);
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            if (d < 120) { // Distance légèrement augmentée
                let alpha = map(d, 0, 120, 200, 50); // Opacité décroissante avec la distance
                stroke(255, alpha); // Lignes blanches avec opacité variable
                line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            }
        }
    }

    // Dessine et anime les nœuds
    noStroke();
    for (let node of nodes) {
        // Effet de pulsation
        let pulseSize = node.size + sin(node.pulse) * 2; // Variation de taille
        fill(255, 230); // Blanc avec légère transparence
        ellipse(node.x, node.y, pulseSize, pulseSize);

        // Mise à jour du mouvement
        node.x += node.dx;
        node.y += node.dy;
        node.pulse += 0.05; // Vitesse de pulsation lente

        // Rebond sur les bords avec une marge
        if (node.x < 20 || node.x > width - 20) node.dx *= -1;
        if (node.y < 20 || node.y > height - 20) node.dy *= -1;
    }
}