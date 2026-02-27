/* =========================
   Overlay de Material
========================= */

export function showMaterialOverlay(pieceName, spans, scene, showAllMeshes, resetSelection, resetHover, resetListStyles) {

  // Mapa de informações de cada peça
  const materialMap = {
    "Corpo": { denominacao: "Corpo", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "Assets/Imagens/286/Material_corpo.png" },
    "Castelo": { denominacao: "Castelo", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "Assets/Imagens/286/Material_castelo.png" },
    "Sede": { denominacao: "Sede", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_sede.png" },
    "Disco": { denominacao: "Disco", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_disco.png" },
    "Haste": { denominacao: "Haste", subConjunto: "-", material: "SAE-1045 tref.", imagem: "Assets/Imagens/286/Material_haste.png" },
    "Preme-Gaxeta": { denominacao: "Preme-Gaxeta", subConjunto: "-", material: "ASTM A.536 Cl. B", imagem: "Assets/Imagens/286/Material_castelo.png" },
    "Trava da Haste": { denominacao: "Trava da Haste", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_trava.png" },
    "Trava da Bucha": { denominacao: "Trava da Bucha", subConjunto: "-", material: "ASTM A.536 Cl. B", imagem: "Assets/Imagens/286/Material_bucha.png" },
    "Bucha da Haste": { denominacao: "Bucha da Haste", subConjunto: "-", material: "ASTM A.536 Cl. B", imagem: "Assets/Imagens/286/Material_bucha.png" },
    "Rolamento": { denominacao: "Rolamento", subConjunto: "-", material: "Aço Liga", imagem: "Assets/Imagens/286/Material_rolamento.png" },
    "Suporte da Trava": { denominacao: "Suporte de Trava", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_suporte.png" },
    "Volante Trava": { denominacao: "Volante Trava", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "Assets/Imagens/286/Material_volante_t.png" },
    "Volante da Haste": { denominacao: "Volante da Haste", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "Assets/Imagens/286/Material_volante_h.png" },
    "Proteção da Haste": { denominacao: "Proteção da Haste", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_protecao.png" },
    "Anel Raspador": { denominacao: "Anel Raspador", subConjunto: "-", material: "SAE-1020", imagem: "Assets/Imagens/286/Material_raspador.png" },
    "Anéis de Gaxeta": { denominacao: "Anéis de Gaxeta", subConjunto: "-", material: "PTFE", imagem: "Assets/Imagens/286/Material_gaxeta.png" },
    "Junta": { denominacao: "Junta", subConjunto: "-", material: "PTFE", imagem: "Assets/Imagens/286/Material_junta.png" },
    "Atuador Penta-410": { denominacao: "Atuador Penta-410", subConjunto: "-", material: "Diversos", imagem: "Assets/Imagens/286/Material_penta-410.png" }
  };

  // Tabelas DN / Código por peça
  const dnCodigoMap = {
    "Corpo": [
      ["DN", "Código"],
      ['10"x10"', "7406"],
      ['12"x12"', "7390"],
      ['16"x16"', "8847"],
      ['18"x18"', "8326"],
      ['20"x20"', "8250"],
      ['24"x24"', "8417"]
    ],
    "Castelo": [
      ["DN", "Código"],
      ['10"x10"', "7676"],
      ['12"x12"', "7552"],
      ['16"x16"', "7552"],
      ['18"x18"', "7912"],
      ['20"x20"', "8297"],
      ['24"x24"', "8418"]
    ],
    "Sede": [
      ["DN", "Código"],
      ['10"x10"', "7671"],
      ['12"x12"', "7961"],
      ['16"x16"', "8274"],
      ['18"x18"', "8623"],
      ['20"x20"', "8264"],
      ['24"x24"', "8437"]
    ],
    "Disco": [
      ["DN", "Código"],
      ['10"x10"', "7603"],
      ['12"x12"', "7903"],
      ['16"x16"', "8177"],
      ['18"x18"', "8624"],
      ['20"x20"', "8262"],
      ['24"x24"', "8438"]
    ],
    "Haste": [
      ["DN", "Código"],
      ['10"x10"', "7669"],
      ['12"x12"', "8751"],
      ['16"x16"', "8622"],
      ['18"x18"', "8625"],
      ['20"x20"', "8265"],
      ['24"x24"', "8439"]
    ],
    "Preme-Gaxeta": [
      ["DN", "Código"],
      ['10"x10"', "7409"],
      ['12"x12"', "7318"],
      ['16"x16"', "7318"],
      ['18"x18"', "7922"],
      ['20"x20"', "8241"],
      ['24"x24"', "8423"]
    ],
    "Trava da Haste": [
      ["DN", "Código"],
      ['10"x10"', "7406"],
      ['12"x12"', "7390"],
      ['16"x16"', "8847"],
      ['18"x18"', "8326"],
      ['20"x20"', "8250"],
      ['24"x24"', "8417"]
    ],
    "Trava da Bucha": [
      ["DN", "Código"],
      ['10"x10"', "7676"],
      ['12"x12"', "7552"],
      ['16"x16"', "7552"],
      ['18"x18"', "7912"],
      ['20"x20"', "8297"],
      ['24"x24"', "8418"]
    ],
    "Bucha da Haste": [
      ["DN", "Código"],
      ['10"x10"', "7671"],
      ['12"x12"', "7961"],
      ['16"x16"', "8274"],
      ['18"x18"', "8623"],
      ['20"x20"', "8264"],
      ['24"x24"', "8437"]
    ],
    "Rolamento": [
      ["DN", "Código"],
      ['10"x10"', "7671"],
      ['12"x12"', "7961"],
      ['16"x16"', "8274"],
      ['18"x18"', "8623"],
      ['20"x20"', "8264"],
      ['24"x24"', "8437"]
    ],
    "Suporte da Trava": [
      ["DN", "Código"],
      ['10"x10"', "7603"],
      ['12"x12"', "7903"],
      ['16"x16"', "8177"],
      ['18"x18"', "8624"],
      ['20"x20"', "8262"],
      ['24"x24"', "8438"]
    ],
    "Volante Trava": [
      ["DN", "Código"],
      ['10"x10"', "7669"],
      ['12"x12"', "8751"],
      ['16"x16"', "8622"],
      ['18"x18"', "8625"],
      ['20"x20"', "8265"],
      ['24"x24"', "8439"]
    ],
    "Volante da Haste": [
      ["DN", "Código"],
      ['10"x10"', "7409"],
      ['12"x12"', "7318"],
      ['16"x16"', "7318"],
      ['18"x18"', "7922"],
      ['20"x20"', "8241"],
      ['24"x24"', "8423"]
    ],
    "Proteção da Haste": [
      ["DN", "Código"],
      ['10"x10"', "7406"],
      ['12"x12"', "7390"],
      ['16"x16"', "8847"],
      ['18"x18"', "8326"],
      ['20"x20"', "8250"],
      ['24"x24"', "8417"]
    ],
    "Anel Raspador": [
      ["DN", "Código"],
      ['10"x10"', "7676"],
      ['12"x12"', "7552"],
      ['16"x16"', "7552"],
      ['18"x18"', "7912"],
      ['20"x20"', "8297"],
      ['24"x24"', "8418"]
    ],
    "Anéis de Gaxeta": [
      ["DN", "Código"],
      ['10"x10"', "7671"],
      ['12"x12"', "7961"],
      ['16"x16"', "8274"],
      ['18"x18"', "8623"],
      ['20"x20"', "8264"],
      ['24"x24"', "8437"]
    ],
    "Junta": [
      ["DN", "Código"],
      ['10"x10"', "7676"],
      ['12"x12"', "7552"],
      ['16"x16"', "7552"],
      ['18"x18"', "7912"],
      ['20"x20"', "8297"],
      ['24"x24"', "8418"]
    ],
    "Atuador Penta-410": [
      ["DN", "Código"],
      ["Todos", "Penta-410"]
    ]
  };

  const info = materialMap[pieceName];
  if (!info) return;

  const overlayId = `overlay-${pieceName}`;
  if (document.getElementById(overlayId)) return;

  const overlay = document.createElement("div");
  overlay.id = overlayId;

  // Dimensões e posição
  const logoHeight = 88;
  const bottomMargin = 33;
  const availableHeight = window.innerHeight - logoHeight - bottomMargin;
  const divHeight = availableHeight * 0.50  ;
  const divTop = logoHeight + (availableHeight - divHeight) / 2;

  overlay.style.position = "absolute";
  overlay.style.height = `${divHeight}px`;
  overlay.style.width = `${((divHeight * 0.9) / 2) * 1.65}px`;
  overlay.style.left = "20px";
  overlay.style.top = `${divTop}px`;
  overlay.style.padding = "10px";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "space-between";
  overlay.style.zIndex = 30;
  overlay.style.borderRadius = "8px";
  overlay.style.backgroundImage = "none";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";

  // Ocultar lista
  spans.forEach(s => s.style.display = "none");
  const titulo = document.querySelector("#lista-pecas span.titulo");
  if (titulo) titulo.style.display = "none";

  // Conteúdo texto
  const contentDiv = document.createElement("div");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.gap = "8px";
  contentDiv.style.fontSize = "132%";
  contentDiv.style.color = "black";
  contentDiv.style.textShadow = "1px 1px 3px #ffffff";

  const linhaPeca = document.createElement("div");
  linhaPeca.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Denominação</span>: ${info.denominacao}`;
  const linhaSub = document.createElement("div");
  linhaSub.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Sub-conjunto</span>: ${info.subConjunto}`;
  const linhaMat = document.createElement("div");
  linhaMat.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Material</span>: ${info.material}`;

  contentDiv.appendChild(linhaPeca);
  contentDiv.appendChild(linhaSub);
  contentDiv.appendChild(linhaMat);

  // 🔹 Adiciona tabela DN / Código
  const tabelaDados = dnCodigoMap[pieceName];
  if (tabelaDados) {
    const tabela = document.createElement("table");
    tabela.style.borderCollapse = "collapse";
    tabela.style.marginTop = "10px";
    tabela.style.width = "100%";
    tabela.style.textAlign = "center";
    tabela.style.border = "1px solid black";

    tabelaDados.forEach((linha, index) => {
      const tr = document.createElement("tr");
      linha.forEach((celula, colIndex) => {
        const td = document.createElement("td");
        td.textContent = celula;
        td.style.border = "1px solid black";
        td.style.padding = "4px";
        if (index === 0) td.style.fontWeight = "bold";
        tr.appendChild(td);
      });
      tabela.appendChild(tr);
    });

    contentDiv.appendChild(tabela);
  }

  // 🔹 Botão Detalhes com borda e laranja mais forte
  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Detalhes";
  btnDetalhes.style.marginTop = "12px";
  btnDetalhes.style.alignSelf = "center";
  btnDetalhes.style.padding = "6px 16px";
  btnDetalhes.style.fontSize = "1em";
  btnDetalhes.style.fontWeight = "bold";
  btnDetalhes.style.backgroundColor = "#FF6600"; // laranja mais forte
  btnDetalhes.style.color = "white";
  btnDetalhes.style.border = "2px solid #FF6600";
  btnDetalhes.style.borderRadius = "5px";
  btnDetalhes.style.cursor = "pointer";
  btnDetalhes.addEventListener("mouseenter", () => {
    btnDetalhes.style.backgroundColor = "white";
    btnDetalhes.style.color = "#FF6600";
  });
  btnDetalhes.addEventListener("mouseleave", () => {
    btnDetalhes.style.backgroundColor = "#FF6600";
    btnDetalhes.style.color = "white";
  });
  btnDetalhes.addEventListener("click", () => {
    const pdfPath = `Assets/PDF/${pieceName}.pdf`;
    window.open(pdfPath, "_blank");
  });

  contentDiv.appendChild(btnDetalhes);

  overlay.appendChild(contentDiv);

  // Botão fechar
  const btnClose = document.createElement("img");
  btnClose.src = "Assets/Botoes/Close.png";
  btnClose.style.width = "30px";
  btnClose.style.height = "30px";
  btnClose.style.position = "absolute";
  btnClose.style.top = "5px";
  btnClose.style.right = "5px";
  btnClose.style.cursor = "pointer";

  btnClose.addEventListener("click", () => {
    overlay.remove();
    spans.forEach(s => s.style.display = "block");
    if (titulo) titulo.style.display = "block";

    showAllMeshes();
    resetSelection();
    resetHover();
    resetListStyles();
  });

  overlay.appendChild(btnClose);
  document.body.appendChild(overlay);
}