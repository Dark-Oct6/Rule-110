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

function addCells() {
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
    
        cell.addEventListener("click", function() {
            let bg = this.style.backgroundColor;
            this.style.backgroundColor = bg === "rgb(51, 204, 51)" ? "#000" : "#3c3";
        });
    
        const barI = document.getElementsByClassName("input-bar")[0];
        barI.appendChild(cell);
    }
    
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
    
        const barI = document.getElementsByClassName("output-bar")[0];
        barI.appendChild(cell);
    }

    const cells = document.getElementsByClassName("cell").length / 2;
    document.getElementById("IC").innerHTML = cells;
    document.getElementById("OC").innerHTML = cells;

    updateTimes();
}

function removeCells() {
    const cells = document.getElementsByClassName("cell").length / 2;

    if (cells > 0) {
        const IB = document.getElementsByClassName("input-bar")[0];
        const OB = document.getElementsByClassName("output-bar")[0];

        for (let i = cells - 1; i >= cells - 25; i--) {
            IB.removeChild(IB.getElementsByClassName("cell")[i]);
            OB.removeChild(OB.getElementsByClassName("cell")[i]);
        }

        document.getElementById("IC").innerHTML = cells - 25;
        document.getElementById("OC").innerHTML = cells - 25;
    }

    updateTimes();
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
        'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ];

    if (rule !== "true" && rule !== "false" && rule !== '') {
        for (let i in forbiddenTokens) {
            if (rule.toLowerCase().includes(forbiddenTokens[i])) {
                console.log("Qualunque cosa tu stia cercando di fare, non funzionerà");
                return false;
            }
        }
        rule = rule.toUpperCase();
        rule = rule.replace(/!A/g, "c1 !== c0");
        rule = rule.replace(/A/g, "c1 === c0");
        rule = rule.replace(/!B/g, "c2 !== c0");
        rule = rule.replace(/B/g, "c2 === c0");
        rule = rule.replace(/!C/g, "c3 !== c0");
        rule = rule.replace(/C/g, "c3 === c0");
        rule = rule.replace(/\*/g, "&&");
        rule = rule.replace(/\+/g, "||");
        rule = rule.replace(/c0/g, "'rgb(51, 204, 51)'");
        return eval(rule); 
    }
    else if (rule === "true") {
        return true;
    }
    else if (rule === "false" || rule === '') {
        return false;
    }
    else {
        // questa parte di codice non dovrebbe essere raggiungibile, però siccome la coccia mi dice così la tengo
        console.log("Qualunque cosa tu stia cercando di fare, non funzionerà");
        return false;
    }
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
                cellsI[i].style.borderColor = "#00f";

                if (i > 1) {
                    const x = cellsI[i - 2].style.backgroundColor;
                    const y = cellsI[i - 1].style.backgroundColor;
                    const z = cellsI[i].style.backgroundColor;
                    if (checkCells(x, y, z)) {
                        cellsO[i - 2].style.backgroundColor = "#3c3";
                    }

                    cellsO[i - 2].style.borderColor = "#00f";
                }
            }

            if (i > 2) {
                cellsI[i - 3].style.borderColor = "#c33";

                cellsO[i - 3].style.borderColor = "#c33";
            }

            if (i === cellsI.length + 2) {
                document.getElementById("no-click").style.display = "none";
            }

            document.getElementById("eta").innerHTML = formatTime(Math.max((cellsI.length - i) * speed, 0));
        }, speed * i);
    }

    /*let str = '';
    for (let i = 0; i < cellsI.length; i++) {
        const col = cellsI[i].style.backgroundColor;
        str += col === "rgb(51, 204, 51)" ? 1 : 0;
    }
    console.log(str);*/

    /*setTimeout(function() {
        let str = '';
        for (let i = 0; i < cellsO.length; i++) {
            const col = cellsO[i].style.backgroundColor;
            str += col === "rgb(51, 204, 51)" ? 1 : 0;
        }
        console.log(str);
    }, cellsO.length * speed);*/
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

function formatTime(t) {

    t -= 0;

    if (t < 1000) {
        return t.toFixed(3 - Math.floor(Math.log10(Math.max(t, 1)))) + "ms";
    }
    return (t / 1000).toFixed(7 - Math.floor(Math.log10(Math.max(t, 1)))) + "s";
}

let speed = 50;
function updateTimes() {
    speed = document.getElementById("input-speed-range").value;

    document.getElementById("input-speed-number").value = speed;

    document.getElementById("speed").innerHTML = formatTime(speed);

    cells = document.getElementsByClassName("cell").length / 2;
    document.getElementById("total-time").innerHTML = formatTime(speed * cells);
    document.getElementById("eta").innerHTML = formatTime(speed * cells);
}

document.getElementById("input-speed-range").addEventListener("input", updateTimes);

document.getElementById("input-speed-number").addEventListener("input", function() {
    speed = document.getElementById("input-speed-number").value;

    document.getElementById("input-speed-range").value = speed;

    updateTimes();
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