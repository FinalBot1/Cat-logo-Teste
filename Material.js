/* =========================
   Overlay de Material
========================= */

export function showMaterialOverlay(pieceName, spans, scene, showAllMeshes, resetSelection, resetHover, resetListStyles) {

  // =========================
  // MAPA DE INFORMAÇÕES
  // =========================
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

  const info = materialMap[pieceName];
  if (!info) return;

  const overlayId = `overlay-${pieceName}`;
  if (document.getElementById(overlayId)) return;

  const overlay = document.createElement("div");
  overlay.id = overlayId;

  // =========================
  // POSICIONAMENTO ABAIXO DO LOGO
  // =========================
  const logoEl = document.getElementById("logo");
  const logoRect = logoEl.getBoundingClientRect();
  const topMargin = 10;
  const divTop = logoRect.bottom + topMargin;

  overlay.style.position = "absolute";
  overlay.style.left = "20px";
  overlay.style.top = `${divTop}px`;
  overlay.style.padding = "10px";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "flex-start";
  overlay.style.zIndex = 30;
  overlay.style.borderRadius = "8px";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";

  // Ocultar lista
  spans.forEach(s => s.style.display = "none");
  const titulo = document.querySelector("#lista-pecas span.titulo");
  if (titulo) titulo.style.display = "none";

  // =========================
  // CONTEÚDO
  // =========================
  const contentDiv = document.createElement("div");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.gap = "8px";
  contentDiv.style.fontSize = "132%";
  contentDiv.style.color = "black";
  contentDiv.style.textShadow = "1px 1px 3px #ffffff";

  const linhaPeca = document.createElement("div");
  linhaPeca.innerHTML = `<span id="medida-denominacao" style="font-weight:bold;margin-left:5px;">Denominação</span>: ${info.denominacao}`;

  const linhaSub = document.createElement("div");
  linhaSub.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Sub-conjunto</span>: ${info.subConjunto}`;

  const linhaMat = document.createElement("div");
  linhaMat.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Material</span>: ${info.material}`;

  contentDiv.appendChild(linhaPeca);
  contentDiv.appendChild(linhaSub);
  contentDiv.appendChild(linhaMat);

  // BOTÃO DETALHES
  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Detalhes";
  btnDetalhes.style.marginTop = "12px";
  btnDetalhes.style.alignSelf = "center";
  btnDetalhes.style.padding = "6px 16px";
  btnDetalhes.style.fontSize = "1em";
  btnDetalhes.style.fontWeight = "bold";
  btnDetalhes.style.backgroundColor = "#FF6600";
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
  document.body.appendChild(overlay);

  // =========================
  // DIMENSIONAMENTO BASEADO NO TEXTO
  // =========================
  requestAnimationFrame(() => {

    const textoDenom = document.getElementById("medida-denominacao");
    const rectTexto = textoDenom.getBoundingClientRect();

    const larguraBase = rectTexto.width;
    const alturaBase = rectTexto.height;

    overlay.style.width = `${larguraBase * 2.65}px`;
    overlay.style.height = `${alturaBase * 6.5}px`;

  });

  // BOTÃO FECHAR
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
}