const CONTAINER = document.querySelector(".wordle");
const word = "LUCIERNAGA";
const maxAttempts = 10;

let attempts = 0;

function createTable() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const wordRow = Math.floor(Math.random() * 6);
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";
    if (i === wordRow) {
      for (let j = 0; j < word.length; j++) {
        const input = document.createElement("input");
        input.maxLength = "1";
        input.addEventListener("click", function(event) {
          checkLetter(event);
        });
        input.dataset.index = j;
        input.value = word.charAt(j);
        row.appendChild(input);
      }
    } else {
      for (let j = 0; j < word.length; j++) {
        const input = document.createElement("input");
        input.maxLength = "1";
        input.addEventListener("click", function(event) {
          checkLetter(event);
        });
        input.dataset.index = j;
        input.value = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        row.appendChild(input);
      }
    }
    CONTAINER.appendChild(row);
    const br = document.createElement("br");
    CONTAINER.appendChild(br);
  }
}

createTable(word);

function checkLetter(event) {
  const letter = event.target.value.toLowerCase();
  const index = Number(event.target.dataset.index);
  console.log(`Letra actual: ${letter}, Letra en indice ${index}: ${word[index]}`);

  let foundMatch = false;
  const row = event.target.parentNode;

  if (letter === word[index].toLowerCase()) {
    event.target.style.backgroundColor = "green";
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      alert("Has alcanzado el máximo de intentos permitidos. La palabra era: " + word);
      revealWord();
      return;
    }
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i].toLowerCase()) {
        foundMatch = true;
        break;
      }
    }

    if (foundMatch) {
      const inputs = row.querySelectorAll(`input[data-index="${index}"]`);
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.backgroundColor = "yellow";
      }
    } else {
      event.target.style.backgroundColor = "black";
    }
  }
}

function revealWord() {
  const inputs = CONTAINER.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== word.charAt(i)) {
      inputs[i].value = word.charAt(i);
      inputs[i].style.backgroundColor = "red";
    }
  }
}
