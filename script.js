let nodes = [];
const numNodes = 12;

function setup() {
    let canvas = createCanvas(300, 300);
    canvas.parent('neural-network');
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: random(50, width - 50),
            y: random(50, height - 50),
            dx: random(-0.3, 0.3),
            dy: random(-0.3, 0.3),
            size: random(8, 12),
            pulse: random(0, TWO_PI)
        });
    }
}

function draw() {
    clear();
    strokeWeight(1);
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            if (d < 120) {
                let alpha = map(d, 0, 120, 200, 50);
                stroke(255, alpha);
                line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            }
        }
    }
    noStroke();
    for (let node of nodes) {
        let pulseSize = node.size + sin(node.pulse) * 2;
        fill(255, 230);
        ellipse(node.x, node.y, pulseSize, pulseSize);
        node.x += node.dx;
        node.y += node.dy;
        node.pulse += 0.05;
        if (node.x < 20 || node.x > width - 20) node.dx *= -1;
        if (node.y < 20 || node.y > height - 20) node.dy *= -1;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
});