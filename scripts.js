// Selecionando os inputs
const inputs = [
  document.getElementById("numbers"),
  document.getElementById("of"),
  document.getElementById("a")
];

// Selecionando os elementos necessários
const numbersQuantity = document.getElementById("numbers");
const numbersOf = document.getElementById("of");
const numbersA = document.getElementById("a");
const form = document.querySelector("form");
const optionToggle = document.querySelector(".image-toggle");
const contentForm = document.querySelector(".content-right");
const results = document.querySelector(".Results");
const showResults = document.querySelector(".showResults");

// função para aplicar filtro nos inputs
function applyFilter(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d]/g, '');

  });
}

// Aplica o filtro em todos os inputs
inputs.forEach(applyFilter);

// Trocando a imagem da opção de nao repetir números
let ativo = false;

optionToggle.addEventListener("click", () => {
  if (!ativo) {
    optionToggle.style.backgroundImage = "url('../assets/icons/state=active.svg')";
    ativo = true;
  } else {
    optionToggle.style.backgroundImage = "url('../assets/icons/state=default (1).svg')";
    ativo = false;
  }
});


form.onsubmit = function (event) {
  event.preventDefault();
// recuperando os valores que estão dentro dos inputs
  let NumbersQty = parseInt(numbersQuantity.value);
  let NumbersA = parseInt(numbersA.value);
  let NumbersOf = parseInt(numbersOf.value);

  // Validações simples para os inputs
  if (!NumbersQty || !NumbersA || !NumbersOf) {
    alert("Preencha todos os campos!");
    return;
  }

  if (NumbersA < NumbersOf) {
    alert("O valor inicial deve ser menor que o final.");
    return;
  }

  if (NumbersQty > (NumbersA - NumbersOf + 1)) {
    alert("Não é possível sortear essa quantidade entre esse intervalo.");
    return;
  }

  numerosPossiveis = [];

  for (let i = NumbersOf; i <= NumbersA; i++) {
    numerosPossiveis.push(i);
  }

  // Função para embaralhar os números
  function shuffle() {

    if (ativo) {
      // Sem repetição 
      for (let i = numerosPossiveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numerosPossiveis[i], numerosPossiveis[j]] = [numerosPossiveis[j], numerosPossiveis[i]];
      }
      resultado = numerosPossiveis.slice(0, NumbersQty);
    } else {
      // Com repetição
      resultado = [];
      for (let i = 0; i < NumbersQty; i++) {
        const random = Math.floor(Math.random() * numerosPossiveis.length);
        resultado.push(numerosPossiveis[random]);
      }
    }
  }
  // Esconde o formulário e mostra os resultados após submit
  form.style.display = "none";
  results.style.display = "flex";

  shuffle();

  const button = document.querySelector(".buttons");
  const h2 = document.querySelector(".h2-text");
  let count = 1;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    button.style.display = "none";
    showResults.textContent = "";
    shuffle();
    setTimeout(() => {
      afterSubmit();
    }, 1000);
    count++;
    h2.innerText = `${count}º resultado`;

  });

   // Função que coloca os números sorteados na DOM
  function afterSubmit() {

    for (let i = 0; i < resultado.length; i++) {
      setTimeout(() => {
        if (i === 0) {

          const firstDiv = document.createElement("div");
          firstDiv.classList.add("firstNumber", "animation-resultado");
          const numberFormat = document.createElement("div");
          numberFormat.classList.add("numberCircle");
          const numberOne = document.createElement("p");
          numberOne.innerText = resultado[i];
          numberOne.classList.add("numberResult");
          firstDiv.append(numberFormat, numberOne);
          showResults.append(firstDiv);
          results.append(showResults);

          setTimeout(() => {
            numberOne.classList.remove("numberResult");
            numberOne.classList.add("number-static");
            firstDiv.classList.remove("animation-resultado")
            numberFormat.classList.remove("numberCircle");
          }, 2500);
        }

        else {

          const otherNumber = document.createElement("div");
          otherNumber.classList.add("enterNumber");
          const otherFormat = document.createElement("div")
          otherFormat.classList.add("numberCircle");
          const numberOther = document.createElement("p");
          numberOther.classList.add("numberResult");
          numberOther.innerText = resultado[i];
          otherNumber.append(otherFormat, numberOther);
          showResults.append(otherNumber);
          results.append(showResults);

          setTimeout(() => {
            numberOther.classList.remove("numberResult");
            numberOther.classList.add("number-static");
            otherFormat.classList.remove("numberCircle");
          }, 2500);

        }

        if (i === resultado.length - 1) {
          setTimeout(() => {
            button.style.display = "flex";
            results.classList.add("TranslateY")
          }, 2500); // espera a última animação terminar

        }

      }, i * 2500); // 2.5s entre cada número
    }
  }
  afterSubmit();
}









