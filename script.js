const perguntas = [
  {
    pergunta:
      "Qual antiga cidade inca, localizada nos Andes peruanos, é famosa por sua arquitetura de pedra seca?",
    respostas: [
      { opcao: "Machu Picchu", correto: true },
      { opcao: "Cusco", correto: false },
      { opcao: "Ollantaytambo", correto: false }
    ]
  },
  {
    pergunta:
      "Em que país se localiza a lendária cidade de Angkor Wat, um vasto complexo de templos construído no século XII?",
    respostas: [
      { opcao: "Tailândia", correto: false },
      { opcao: "Vietnã", correto: false },
      { opcao: "Camboja", correto: true }
    ]
  },
  {
    pergunta:
      "Qual civilização construiu a cidade de Palmira, um importante centro comercial e cultural na antiga Síria, conhecida por suas colunas e ruínas impressionantes?",
    respostas: [
      { opcao: "Romanos", correto: true },
      { opcao: "Gregos", correto: false },
      { opcao: "Egípcios", correto: false }
    ]
  },
  {
    pergunta:
      "A cidade de Petra, famosa por suas construções esculpidas em arenito rosa, foi a capital de qual antigo povo?",
    respostas: [
      { opcao: "Nabateus", correto: true },
      { opcao: "Fenícios", correto: false },
      { opcao: "Assírios", correto: false }
    ]
  },
  {
    pergunta:
      "Onde se acredita que a mítica cidade de El Dorado, famosa por suas riquezas em ouro, estaria localizada?",
    respostas: [
      { opcao: "América do Norte", correto: false },
      { opcao: "América do Sul", correto: true },
      { opcao: "África", correto: false }
    ]
  },
  {
    pergunta:
      "Qual antiga cidade maia, localizada na Península de Yucatán, no México, é conhecida por sua pirâmide de Kukulkan?",
    respostas: [
      { opcao: "Tikal", correto: false },
      { opcao: "Chichén Itzá", correto: true },
      { opcao: "Palenque", correto: false }
    ]
  },
  {
    pergunta:
      "As ruínas da cidade de Mohenjo-daro, um dos maiores assentamentos da antiga Civilização do Vale do Indo, estão localizadas em qual país atualmente?",
    respostas: [
      { opcao: "Índia", correto: false },
      { opcao: "Paquistão", correto: true },
      { opcao: "Afeganistão", correto: false }
    ]
  },
  {
    pergunta:
      "Qual antiga cidade egípcia, embora não totalmente 'perdida', foi parcialmente submersa pela construção da Represa de Assuã e abriga templos como o de Abu Simbel?",
    respostas: [
      { opcao: "Tebas", correto: false },
      { opcao: "Mênfis", correto: false },
      { opcao: "Núbia", correto: true } 
    ]
  }
];

const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");

let indiceAtual = 0;
let acertos = 0;
let respostaFeedbackElemento;

function carregarPergunta() {
  if (indiceAtual < perguntas.length) {
    const perguntaAtual = perguntas[indiceAtual];
    perguntaElemento.textContent = perguntaAtual.pergunta;
    progressoElemento.textContent = `${indiceAtual + 1}/${perguntas.length}`;
    respostasElemento.innerHTML = "";

    if (!respostaFeedbackElemento) {
      respostaFeedbackElemento = document.createElement("p");
      conteudo.appendChild(respostaFeedbackElemento);
    }
    respostaFeedbackElemento.textContent = "";

    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(
      () => Math.random() - 0.5
    );

    respostasEmbaralhadas.forEach((resposta) => {
      const botao = document.createElement("button");
      botao.classList.add("botao-resposta");
      botao.textContent = resposta.opcao;
      botao.addEventListener("click", () =>
        verificarResposta(resposta.correto)
      );
      respostasElemento.appendChild(botao);
    });
  } else {
    finalizarJogo();
  }
}

function verificarResposta(correta) {
  const botoesRespostas = respostasElemento.querySelectorAll(".botao-resposta");
  botoesRespostas.forEach((botao) => {
    botao.disabled = true;
  });

  if (correta) {
    acertos++;
    respostaFeedbackElemento.textContent = "Resposta Correta!";
    respostaFeedbackElemento.style.color = "green";
    respostaFeedbackElemento.style.textAlign = "center";
    respostaFeedbackElemento.style.fontSize = "1.5em";
  } else {
    respostaFeedbackElemento.textContent = "Resposta Errada!";
    respostaFeedbackElemento.style.color = "red";
    respostaFeedbackElemento.style.textAlign = "center";
    respostaFeedbackElemento.style.fontSize = "1.5em";
  }

  setTimeout(() => {
    indiceAtual++;
    carregarPergunta();
  }, 1500);
}

function finalizarJogo() {
  textoFinal.textContent = `Você acertou ${acertos} de ${perguntas.length}`;
  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";
}

carregarPergunta();
