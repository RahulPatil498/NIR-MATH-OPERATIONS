function submitOperation() {
  const a = document.getElementById('inputA').value;
  const b = parseFloat(document.getElementById('inputB').value);
  const operation = document.getElementById('operation').value;
  const outputDiv = document.getElementById('output');
  const copyBtn = document.getElementById('copyBtn');

  outputDiv.textContent = "Processing...";
  copyBtn.style.display = "none";

  try {
    const values = a.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

    if (isNaN(b)) throw new Error("Please enter a valid number for b.");

    let result = values.map(val => {
      switch (operation) {
        case "add":
          return round(val + b);
        case "subtract":
          return round(val - b);
        case "multiply":
          return round(val * b);
        case "divide":
          if (b === 0) throw new Error("Cannot divide by zero.");
          return round(val / b);
        default:
          throw new Error("Invalid operation.");
      }
    });

    outputDiv.textContent = result.join(', ');
    copyBtn.style.display = "inline-block";
  } catch (err) {
    outputDiv.textContent = 'Error: ' + err.message;
  }
}

function round(num) {
  return Math.round(num * 10000) / 10000;
}

function copyOutput() {
  const outputText = document.getElementById('output').textContent;
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = outputText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
  alert("Output copied to clipboard!");
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('themeText').textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
}
