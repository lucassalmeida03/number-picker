// Selecionando ELEMENTOS
 const inputs = [
  document.getElementById("numbers"),
  document.getElementById("of"),
  document.getElementById("a")
];

const numbersQuantity = document.getElementById("numbers");
const numbersOf = document.getElementById("of");
const numbersA = document.getElementById("a");
const form = document.querySelector("form");
const optionToggle = document.querySelector(".image-toggle");
const contentForm = document.querySelector(".content-right");
const showResult = document.querySelector(".showResult");


// função para aplicar filtro nos inputs
function aplicarFiltroNumerico(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d]/g, '');
    
  });
}

// Aplica a função em todos
inputs.forEach(aplicarFiltroNumerico);

// Trocando imagem da opcao nao repetir numeros

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

// recuperando os valores dentro dos inputs

form.onsubmit = function(event) {
  event.preventDefault();

  let NumbersQty = parseInt(numbersQuantity.value);
  let NumbersA = parseInt(numbersA.value);
  let NumbersOf = parseInt(numbersOf.value);

  // Validacao simples dos inputs
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

  let numerosPossiveis = [];
  for (let i = NumbersOf; i <= NumbersA; i++) {
    numerosPossiveis.push(i);
  }

  
  // Embaralha
  for (let i = numerosPossiveis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numerosPossiveis[i], numerosPossiveis[j]] = [numerosPossiveis[j], numerosPossiveis[i]];
  }

  // Pega os números sorteados
  let resultado = numerosPossiveis.slice(0, NumbersQty);

  // Esconde o formulário
  form.style.display = "none";
  showResult.style.display = "flex";

}









