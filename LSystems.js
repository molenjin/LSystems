function runSystem(seed, rule, angle, startAngle, length, generations) {
    
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";

    let currentX = canvas.width.baseVal.value / 2;
    let currentY = canvas.height.baseVal.value / 2;
    let currentAngle = parseFloat(startAngle);    

    function drawLSystem(string, gen) {
        for (let index = 0; index < string.length; index++) {
            const char = string[index];
            if (char === "F") {
                if (gen < generations) {
                    drawLSystem(rule, gen + 1);
                } else {
                    const newX = currentX + parseFloat(length) * Math.cos(currentAngle * (Math.PI / 180));
                    const newY = currentY + parseFloat(length) * Math.sin(currentAngle * (Math.PI / 180));

                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", currentX);
                    line.setAttribute("y1", currentY);
                    line.setAttribute("x2", newX);
                    line.setAttribute("y2", newY);
                    line.setAttribute("stroke", "black");
                    canvas.appendChild(line);

                    currentX = newX;
                    currentY = newY;
                }
            } else if (char === "+") {
                currentAngle += parseFloat(angle);
            } else if (char === "-") {
                currentAngle -= parseFloat(angle);
            } else if (char === "[") {
                const savedPos = { x: currentX, y: currentY, angle: currentAngle };
                index += drawLSystem(string.substring(index + 1), gen) + 1;
                currentX = savedPos.x;
                currentY = savedPos.y;
                currentAngle = savedPos.angle;
            } else if (char === "]") {
                return index;
            }
        }
    }

    drawLSystem(seed, 1);
}