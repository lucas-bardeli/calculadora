const $ = (id) => document.getElementById(id);

const calculo = $("calculo");
const resultado = $("resultado");

let numero1 = "";
let numero2 = "";
let operacao = null;

// -------------------------------
// Atualiza display

function atualizarCalculo() {
  calculo.innerText = [numero1, operacao, numero2].filter(Boolean).join(" ");
}

// -------------------------------
// Números

function adicionarNumero(n) {

  if (operacao === null) {
    numero1 += n;
  } else {
    numero2 += n;
  }

  atualizarCalculo();
}

// -------------------------------
// Vírgula

function adicionarVirgula() {

  if (operacao === null) {

    if (!numero1.includes(",")) {
      numero1 += ",";
    }

  } else {

    if (!numero2.includes(",")) {
      numero2 += ",";
    }

  }

  atualizarCalculo();
}

// -------------------------------
// Operações

function definirOperacao(op) {

  if (numero1 === "") return;

  operacao = op;
  atualizarCalculo();
}

// -------------------------------
// Converter vírgula para ponto

function parseNumero(n) {
  return parseFloat(n.replace(",", "."));
}

// -------------------------------
// Igual

function calcular() {

  if (!numero1) return;

  const n1 = parseNumero(numero1);
  const n2 = parseNumero(numero2);

  let r = 0;

  switch (operacao) {

    case "÷":
      r = n1 / n2;
      break;

    case "×":
      r = n1 * n2;
      break;

    case "-":
      r = n1 - n2;
      break;

    case "+":
      r = n1 + n2;
      break;

    default:
      r = n1;
  }

  if (!isFinite(r)) {
    resultado.innerText = "Erro";
    return;
  }

  resultado.innerText = r.toString().replace(".", ",");

}

// -------------------------------
// Limpar

function limpar() {

  numero1 = "";
  numero2 = "";
  operacao = null;

  calculo.innerText = "0";
  resultado.innerText = "0";
}

// -------------------------------
// Eventos números

for (let i = 0; i <= 9; i++) {

  $("n" + i).addEventListener("click", () => adicionarNumero(i));

}

// -------------------------------
// Vírgula

$("ponto").addEventListener("click", adicionarVirgula);

// -------------------------------
// Operações

$("divisao").addEventListener("click", () => definirOperacao("÷"));
$("multiplicacao").addEventListener("click", () => definirOperacao("×"));
$("subtracao").addEventListener("click", () => definirOperacao("-"));
$("adicao").addEventListener("click", () => definirOperacao("+"));

// -------------------------------
// Igual

$("igual").addEventListener("click", calcular);

// -------------------------------
// Limpar

$("limpar").addEventListener("click", limpar);

// -------------------------------
// Suporte a teclado

document.addEventListener("keydown", (e) => {

  const k = e.key;

  if (!isNaN(k)) adicionarNumero(k);

  if (k === "," || k === ".") adicionarVirgula();

  if (k === "+") definirOperacao("+");

  if (k === "-") definirOperacao("-");

  if (k === "*") definirOperacao("×");

  if (k === "/") definirOperacao("÷");

  if (k === "Enter" || k === "=") calcular();

  if (k === "Escape") limpar();

});