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

let index = 0;

function mostrarTelaProfessor() {
  // Transição de cena
  document.getElementById("sala-coordenador").style.display = "none";
  document.getElementById("cenario3").style.display = "block";

  // Mostra NPC
  document.getElementById("npc3").style.display = "block";

  // Configura e exibe a caixa de diálogo PADRÃO
  const dialogo = document.getElementById("caixa-dialogo");
  dialogo.style.display = "block"; 
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
    const cenario = document.getElementById("cenario3");
    // Remove event listener antigo (se houver)
    cenario.onclick = null;
  
    if (index < mensagens.length) {
      escreverTextoGradualmente(mensagens[index], "texto-dialogo", () => {
        index++;
        // Só adiciona o listener DEPOIS do texto ter terminado de ser escrito
        cenario.onclick = mostrarProximaMensagem;
      });
    } else {
      // Remove clique extra e vai para a luta
      cenario.onclick = null;
      setTimeout(mostrarTelaLuta, 1000);
    }
  }  
  
  mostrarProximaMensagem();


  function mostrarTelaLuta() {
   
    document.getElementById("cenario3").style.display = "none";
    document.getElementById("caixa-dialogo").style.display = "none";
  
   
    const telaLuta = document.getElementById("tela-luta");
    telaLuta.style.display = "block";
  
    
    const audioLuta = document.getElementById("audio-luta");
    audioLuta.volume = 0.8;
    audioLuta.play();
    
    
  }
}
function acaoLuta(acao) {
  const mensagem = document.getElementById("mensagem-acao");
  mensagem.style.display = "block";

  switch (acao) {
    case "atacar":
      mensagem.textContent = `${nomeJogador} lançou um ataque poderoso!`;
      break;
    case "defender":
      mensagem.textContent = `${nomeJogador} ergueu um escudo mágico!`;
      break;
    case "especial":
      mensagem.textContent = `${nomeJogador} usou um ataque especial: DOMÍNIO DE CSS!`;
      break;
    case "fugir":
      mensagem.textContent = `${nomeJogador} tentou fugir da batalha!`;
      break;
    default:
      mensagem.textContent = "Ação desconhecida.";
  }

  setTimeout(() => {
    mensagem.style.display = "none";
  }, 2000);
}



