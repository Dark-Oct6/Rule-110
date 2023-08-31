for (let i = 0; i < 75; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("click", function() {
        let bg = this.style.backgroundColor;
        this.style.backgroundColor = bg === "rgb(51, 204, 51)" ? "#000" : "#3c3";
    });

    const barI = document.getElementsByClassName("input-bar")[0];
    barI.appendChild(cell);
}

for (let i = 0; i < 75; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const barI = document.getElementsByClassName("output-bar")[0];
    barI.appendChild(cell);
}

function checkCells(a, b, c) {
    let c1 = a;
    let c2 = b;
    let c3 = c;

    let rule = document.getElementById("rules").value;

    /* Lascio questo pezzo di codice in caso volessi tornarci in futuro
    let forbiddenTokens = /^[abcdefghijklmnopqrtuvwxyz0456789\s]*$/;
    if (forbiddenTokens.test(rule.toLowerCase())) {
        console.log("Invalid input. Please use only allowed characters.");
        return false;
    }
    */

    const forbiddenTokens = [
        'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 4, 5, 6, 7, 8, 9
    ];

    if (rule !== "true") {
        for (let i in forbiddenTokens) {
            if (rule.includes(forbiddenTokens[i])) {
                console.log("Qualunque cosa tu stia cercando di fare, non funzionerà");
                return false;
            }
        }    
        rule = rule.replace(/c0/g, "'rgb(51, 204, 51)'");
        return eval(rule); 
    }
    return true;
}

function start() {
    document.getElementById("no-click").style.display = "block";

    const cellsI = document.getElementsByClassName("input-bar")[0].getElementsByClassName("cell");
    const cellsO = document.getElementsByClassName("output-bar")[0].getElementsByClassName("cell");

    for (let i = 0; i < cellsI.length + 3; i++) {
        if (i < cellsI.length) {
            cellsO[i].style.backgroundColor = "#000";
        }

        setTimeout(function() {
            if (i < cellsI.length) {
                cellsI[i].style.borderColor = "#cc3";

                if (i > 1) {
                    const x = cellsI[i - 2].style.backgroundColor;
                    const y = cellsI[i - 1].style.backgroundColor;
                    const z = cellsI[i].style.backgroundColor;
                    if (checkCells(x, y, z)) {
                        cellsO[i - 2].style.backgroundColor = "#3c3";
                    }
                }
            }

            if (i > 2) {
                cellsI[i - 3].style.borderColor = "#c33";
            }

            if (i === cellsI.length + 2) {
                document.getElementById("no-click").style.display = "none";
            }
        }, speed * i);
    }
}

function random() {
    const cellsI = document.getElementsByClassName("input-bar")[0].getElementsByClassName("cell");

    for (let i = 0; i < cellsI.length; i++) {
        cellsI[i].style.backgroundColor = "#000";
        if (Math.random() > 0.5) {
            cellsI[i].style.backgroundColor = "#3c3";
        }
    }
}

function substitute() {
    const cellsI = document.getElementsByClassName("input-bar")[0].getElementsByClassName("cell");
    const cellsO = document.getElementsByClassName("output-bar")[0].getElementsByClassName("cell");

    for (let i = 0; i < cellsI.length; i++) {
        cellsI[i].style.backgroundColor = cellsO[i].style.backgroundColor;
        cellsO[i].style.backgroundColor = "#000";
    }
}

let speed = 50;
document.getElementById("input-speed").addEventListener("input", function() {
    speed = document.getElementById("input-speed").value;
    let d = 4 - Math.floor(Math.log10(speed ** 1 + 1));
    speed = (speed ** 1).toFixed(d);
    document.getElementById("speed").innerHTML = speed;
});

function openModal() {
    document.getElementsByClassName("modal")[0].style.display = "block";
}

function closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementsByClassName("modal")[0];
    if (event.target == modal) {
        modal.style.display = "none";
    }
}