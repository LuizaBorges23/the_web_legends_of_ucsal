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
  document.getElementById("nome-personagem").textContent = "Coordenador Osbaldo";

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
  dialogo.style.display = "blox";
  const nomePersonagem = document.getElementById("nome-personagem");
  nomePersonagem.textContent = "Professor Ronnie";

  // Opcional: manter estilo do nome igual aos outros, se quiser garantir:
  nomePersonagem.style.backgroundColor = "#2D3E56";
  nomePersonagem.style.color = "#fff";

  // Texto formatado igual às outras cenas
  const mensagens = [
    `Olá, ${nomeJogador}, vejo que você é o herói escolhido.`,
    "O Mago da Web é mais perigoso do que imaginamos...",
    "Ele controla os elementos da web como se fossem magia!",
    "Mas você ainda não está pronto e terá que passar por um treinamento",
    "Você terá que aprender os *Conhecimentos da Web*"
  ];

  let index = 0;

  function mostrarProximaMensagem() {
    if (index < mensagens.length) {
      escreverTextoGradualmente(mensagens[index], "texto-dialogo", () => {
        index++;
        setTimeout(mostrarProximaMensagem, 1000);
      });
    } else {
      // Quando todas as mensagens forem exibidas
      setTimeout(mostrarTelaLuta, 1000);
    }
  }

  mostrarProximaMensagem();


  function mostrarTelaLuta() {
    document.getElementById("cenario3").style.display = "none";
    document.getElementById("caixa-dialogo").style.display = "none";

    const telaLuta = document.getElementById("tela-luta");
    telaLuta.style.display = "block";

    // Tocar música de luta (se já tiver o áudio)
    const audioLuta = new Audio("music/battle.mp3");
    audioLuta.play();
  }
}
function debugIrPara(tela) {
  // Parar animações, listeners e limpar diálogos
  const textoElemento = document.getElementById("texto-dialogo");
  textoElemento.textContent = "";
  const clone = textoElemento.cloneNode(true);
  textoElemento.parentNode.replaceChild(clone, textoElemento); // Remove eventListener de clique
  if (intervaloTexto) clearInterval(intervaloTexto);
  if (proximoDialogoCallback) {
    document.removeEventListener("click", proximoDialogoCallback);
    proximoDialogoCallback = null;
  }
  // Parar música, tempo, etc (se houver)
  const audioLuta = document.getElementById("audio-luta");
  if (audioLuta) {
    audioLuta.pause();
    audioLuta.currentTime = 0;
  }

  // Esconde todas as telas
  const telas = ['tela-inicial', 'cenario1', 'sala-coordenador', 'cenario3', 'tela-luta'];
  telas.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Esconde elementos de NPCs e caixas de diálogo
  ['npc1', 'npc2', 'npc3', 'caixa-dialogo', 'menu-combate', 'nome-jogador', 'botao-confirmar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Exibir e reiniciar a cena correspondente
  switch (tela) {
    case 'inicio':
      document.getElementById('tela-inicial').style.display = 'flex';
      break;

    case 'cenario1':
      document.getElementById('cenario1').style.display = 'block';
      document.getElementById('npc1').style.display = 'block';
      document.getElementById('legenda-inicial').style.display = 'block';
      escreverTextoGradualmente(
        "Mais um dia se inicia na Universidade Católica do Salvador...",
        "legenda-inicial",
        () => {
          document.getElementById('cenario1').addEventListener("click", function cliqueContinuar() {
            document.getElementById("legenda-inicial").style.display = "none";
            document.getElementById("npc1").style.display = "block";
            iniciarDialogo();
            document.getElementById('cenario1').removeEventListener("click", cliqueContinuar);
          });
        }
      );
      break;

    case 'coordenador':
      document.getElementById('sala-coordenador').style.display = 'block';
      document.getElementById('npc2').style.display = 'block';
      document.getElementById('caixa-dialogo').style.display = 'flex';
      iniciarDialogoCoordenador();
      break;

    case 'cenario3':
      document.getElementById('cenario3').style.display = 'block';
      document.getElementById('npc3').style.display = 'block';
      document.getElementById('caixa-dialogo').style.display = 'flex';
      // Reutiliza a lógica de mostrar diálogo do professor Ronnie
      nomeJogador = nomeJogador || "Jogador"; // nome fictício se ainda não digitado
      mostrarTelaProfessor();
      break;

    case 'luta':
      document.getElementById('tela-luta').style.display = 'block';
      document.getElementById('menu-combate').style.display = 'flex';
      document.getElementById('caixa-dialogo').style.display = 'flex';
      document.getElementById('nome-personagem').textContent = "Debug";
      document.getElementById('texto-dialogo').textContent = "Você está testando a tela de luta.";
      break;
  }
}
function irParaCoordenador() {
  dialogo.textContent = "Você acompanha o aluno até a sala do coordenador pedagógico, onde ele receberá o suporte necessário.";
  botaoCoordenador.style.display = "none";
}
