function runSystem(seed, rule, angle, startAngle, generations) {

    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";

    function drawLSystem(string, gen, draw) {
        for (let index = 0; index < string.length; index++) {
            const char = string[index];
            if (char === "F") {
                if (gen < generations) {
                    drawLSystem(rule, gen + 1, draw);
                } else {
                    const newX = currentX + Math.cos(currentAngle * (Math.PI / 180)) * scale;
                    const newY = currentY + Math.sin(currentAngle * (Math.PI / 180)) * scale;

                    if (draw) {
                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", currentX);
                        line.setAttribute("y1", currentY);
                        line.setAttribute("x2", newX);
                        line.setAttribute("y2", newY);
                        line.setAttribute("stroke", "black");
                        canvas.appendChild(line);
                    }
                    else {
                        minX = Math.min(minX, newX);
                        maxX = Math.max(maxX, newX);
                        minY = Math.min(minY, newY);
                        maxY = Math.max(maxY, newY);
                    }

                    currentX = newX;
                    currentY = newY;
                }
            } else if (char === "+") {
                currentAngle += parseFloat(angle);
            } else if (char === "-") {
                currentAngle -= parseFloat(angle);
            } else if (char === "[") {
                const savedPos = { x: currentX, y: currentY, angle: currentAngle };
                index += drawLSystem(string.substring(index + 1), gen, draw) + 1;
                currentX = savedPos.x;
                currentY = savedPos.y;
                currentAngle = savedPos.angle;
            } else if (char === "]") {
                return index;
            }
        }
    }
alert("runSystem called with parameters: " + seed + ", " + rule + ", " + angle + ", " + startAngle + ", " + generations);
    let currentX = 0;
    let currentY = 0;
    let currentAngle = parseFloat(startAngle);

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    let scaleX = 1.0;
    let scaleY = 1.0;
    let scale = 1.0;

    drawLSystem(seed, 1, false);

    scaleX = canvas.width.baseVal.value / (maxX - minX);
    scaleY = canvas.height.baseVal.value / (maxY - minY);
    scale = Math.min(scaleX, scaleY) * 0.9;

    currentX = ((canvas.width.baseVal.value / 2) - ((maxX * scale + minX * scale) / 2));
    currentY = ((canvas.height.baseVal.value / 2) - ((maxY * scale + minY * scale) / 2));

    currentAngle = parseFloat(startAngle);

    drawLSystem(seed, 1, true);
}