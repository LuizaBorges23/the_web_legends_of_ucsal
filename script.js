let nomeJogador = "";

function escreverTextoGradualmente(texto, elementoId, aoTerminar) {
  const elemento = document.getElementById(elementoId);
  elemento.textContent = "";
  let i = 0;

  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      const continuar = () => {
        document.removeEventListener("click", continuar);
        if (aoTerminar) aoTerminar();
      };
      document.addEventListener("click", continuar);
    }
  }, 40);
}

function iniciarJogo() {
  document.getElementById("tela-inicial").style.display = "none";
  const cenario = document.getElementById("cenario1");
  cenario.style.display = "block";

  escreverTextoGradualmente("Mais um dia se inicia na Universidade Católica do Salvador...", "legenda-inicial", () => {
    function cliqueParaContinuar() {
      document.getElementById("legenda-inicial").style.display = "none";
      document.getElementById("npc1").style.display = "block";
      cenario.removeEventListener("click", cliqueParaContinuar);
    }
    cenario.addEventListener("click", cliqueParaContinuar);
  });
}

function iniciarDialogo() {
  document.getElementById("npc1").style.pointerEvents = "none";
  document.getElementById("caixa-dialogo").style.display = "block";
  document.getElementById("nome-personagem").textContent = "Segurança";

  escreverTextoGradualmente("Entendido... sim coordenador... entrarei em contato com ele....", "texto-dialogo", () => {
    escreverTextoGradualmente("Ei, você! Isso mesmo, você! Qual é o seu nome, aluno?", "texto-dialogo", () => {
      document.getElementById("nome-jogador").style.display = "inline";
      document.getElementById("botao-confirmar").style.display = "inline";
    });
  });
}

function salvarNome() {
  const nomeInput = document.getElementById("nome-jogador").value.trim();
  if (nomeInput === "") {
    alert("Por favor, digite seu nome.");
    return;
  }

  nomeJogador = nomeInput;

  document.getElementById("nome-jogador").style.display = "none";
  document.getElementById("botao-confirmar").style.display = "none";

  escreverTextoGradualmente(`Certo, ${nomeJogador}, é você quem o coordenador busca. Vá imediatamente à sua sala!`, "texto-dialogo", () => {
    setTimeout(() => {
      document.getElementById("caixa-dialogo").style.display = "none";
      document.getElementById("npc1").style.display = "none";

      function avancarPorEnter(event) {
        if (event.key === "Enter") {
          document.removeEventListener("keydown", avancarPorEnter);
          document.getElementById("cenario1").style.display = "none";
          document.getElementById("sala-coordenador").style.display = "block";
          document.getElementById("npc2").style.display = "block";
          document.getElementById("caixa-dialogo").style.display = "block";

          iniciarDialogoCoordenador();
        }
      }

      document.addEventListener("keydown", avancarPorEnter);
      alert("Pressione Enter para continuar...");
    }, 2000);
  });
}

function iniciarDialogoCoordenador() {
  document.getElementById("nome-personagem").textContent = "Coordenador";

  escreverTextoGradualmente(`Oi ${nomeJogador}, estive esperando por você! Precisamos da sua ajuda.`, "texto-dialogo", () => {
    escreverTextoGradualmente(
        "Hackers vêm invadindo o portal do aluno, a mando do Mago da Web. Só você pode derrotá-lo.",
        "texto-dialogo",
        () => {
          escreverTextoGradualmente(
              "Mas tenha cuidado! Ele tem poderes inimagináveis!",
              "texto-dialogo",
              () => {
                escreverTextoGradualmente(
                    "Você encontrará desafios ao longo do caminho, não confie em ninguém. Conto com você, herói.",
                    "texto-dialogo",
                  () => {
                    // No final do diálogo com o coordenador:
                    setTimeout(() => {
                      mostrarTelaProfessor();
                    }, 2000);
                  }
                );
              }
          );
        }
    );
  });
}

function mostrarTelaProfessor() {
  // Transição de cena
  document.getElementById("sala-coordenador").style.display = "none";
  document.getElementById("cenario3").style.display = "block";

  // Mostra NPC
  document.getElementById("npc3").style.display = "block";

  // Configura e exibe a caixa de diálogo PADRÃO
  const dialogo = document.getElementById("caixa-dialogo");
  dialogo.style.display = "flex";
  document.getElementById("nome-personagem").textContent = "Professor Ronnie";

  // Texto formatado igual às outras cenas
  const mensagens = [
    `Olá, ${nomeJogador}, vejo que você é o herói escolhido.`,
    "O Mago da Web é mais perigoso do que imaginamos...",
    "Ele controla os elementos da web como se fossem magia!"
  ];

  let index = 0;

  function mostrarProximaMensagem() {
    if (index < mensagens.length) {
      escreverTextoGradualmente(mensagens[index], "texto-dialogo", () => {
        index++;
        setTimeout(mostrarProximaMensagem, 1000);
      });
    }
  }

  mostrarProximaMensagem();
}
