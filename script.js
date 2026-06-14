const table = document.getElementById("display");

const coefficientsInput = document.getElementById("coefficients");
const initialsInput = document.getElementById("initials");
const nEntriesInput = document.getElementById("nEntries");

const computeButton = document.getElementById("computeButton");
computeButton.addEventListener('click', () => {
    const coefficients = coefficientsInput.value.trim().split(',').map(i => i.trim()).map(i => parseInt(i));
    const initials = initialsInput.value.trim().split(',').map(i => i.trim()).map(i => parseInt(i));
    const nEntries = parseInt(nEntriesInput.value.trim());

    const values = computeSequence(coefficients, initials, nEntries);

    table.replaceChildren();
    table.appendChild(createHeaders());
    createEntries(values).forEach(i => table.appendChild(i));
});

function computeSequence(coefficients, initials, nEntries) {
    const values = [];
    for (let i = 0; i < nEntries; i++) {
        if (i < initials.length) {
            values.push(initials[i]);
        } else {
            let value = 0;
            for (let j = 0; j < coefficients.length; j++) {
                value += coefficients[j] * values[i - 1 - j];
            }
            values.push(value);
        }
    }
    return values;
}

function createEntries(values) {
    const entries = [];
    for (let i = 0; i < values.length; i++) {
        entries.push(createEntry(i, values[i]));
    }

    return entries;
}

function createEntry(key, val) {
    const row = document.createElement("tr");

    const keyData = document.createElement("td");
    keyData.textContent = key;

    const valData = document.createElement("td");
    valData.textContent = val;

    row.appendChild(keyData);
    row.appendChild(valData);

    return row;
}

function createHeaders() {
    const row = document.createElement("tr");

    const keyData = document.createElement("th");
    keyData.textContent = "n";

    const valData = document.createElement("th");
    valData.textContent = "a";

    row.appendChild(keyData);
    row.appendChild(valData);

    return row;
}
