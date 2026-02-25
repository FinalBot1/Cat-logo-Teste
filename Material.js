/* =========================
   Overlay de Material
========================= */

export function showMaterialOverlay(pieceName, spans, scene, showAllMeshes, resetSelection, resetHover, resetListStyles) {

  // Mapa de informações de cada peça
  const materialMap = {
    "Corpo": { denominacao: "Corpo", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "/Assets/Imagens/286/Material_corpo1.png" },
    "Castelo": { denominacao: "Castelo", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "/Assets/Imagens/286/Material_castelo.png" },
    "Sede": { denominacao: "Sede", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_sede.png" },
    "Disco": { denominacao: "Disco", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_disco.png" },
    "Haste": { denominacao: "Haste", subConjunto: "-", material: "SAE-1045 tref.", imagem: "/Assets/Imagens/286/Material_haste.png" },
    "Preme-Gaxeta": { denominacao: "Preme-Gaxeta", subConjunto: "-", material: "ASTM A.536 Cl. B", imagem: "/Assets/Imagens/286/Material_castelo.png" },
    "Trava da Haste": { denominacao: "Trava da Haste", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_trava.png" },
    "Bucha da Haste": { denominacao: "Bucha da Haste", subConjunto: "-", material: "ASTM A.536 Cl. B", imagem: "/Assets/Imagens/286/Material_bucha.png" },
    "Rolamento": { denominacao: "Rolamento", subConjunto: "-", material: "Aço Liga", imagem: "/Assets/Imagens/286/Material_rolamento.png" },
    "Suporte da Trava": { denominacao: "Suporte de Trava", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_suporte.png" },
    "Volante Trava": { denominacao: "Volante Trava", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "/Assets/Imagens/286/Material_volante_t.png" },
    "Volante da Haste": { denominacao: "Volante da Haste", subConjunto: "-", material: "ASTM A.216 Gr. WCB", imagem: "/Assets/Imagens/286/Material_volante_h.png" },
    "Proteção da Haste": { denominacao: "Proteção da Haste", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_protecao.png" },
    "Anel Raspador": { denominacao: "Anel Raspador", subConjunto: "-", material: "SAE-1020", imagem: "/Assets/Imagens/286/Material_raspador.png" },
    "Anéis de Gaxeta": { denominacao: "Anéis de Gaxeta", subConjunto: "-", material: "PTFE", imagem: "/Assets/Imagens/286/Material_gaxeta.png" },
    "Junta": { denominacao: "Junta", subConjunto: "-", material: "PTFE", imagem: "/Assets/Imagens/286/Material_junta.png" },
    "Atuador Penta-410": { denominacao: "Atuador Penta-410", subConjunto: "-", material: "Diversos", imagem: "/Assets/Imagens/286/Material_penta-410.png" }
  };

  const info = materialMap[pieceName];
  if (!info) return; // Nenhuma informação para a peça clicada

  const overlayId = `overlay-${pieceName}`;
  if (document.getElementById(overlayId)) return;

  const overlay = document.createElement("div");
  overlay.id = overlayId;

  // Dimensões e posição
  const logoHeight = 88; // altura do logo em px
  const bottomMargin = 33; // título inferior + margem
  const availableHeight = window.innerHeight - logoHeight - bottomMargin;
  const divHeight = availableHeight * 0.85; // 85% do espaço disponível
  const divTop = logoHeight + (availableHeight - divHeight) / 2;

  overlay.style.position = "absolute";
  overlay.style.height = `${divHeight}px`;
  overlay.style.width = `${divHeight * 0.9}px`; // largura = 90% da altura
  overlay.style.left = "20px"; 
  overlay.style.top = `${divTop}px`; 
  overlay.style.padding = "10px";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "space-between";
  overlay.style.zIndex = 30;
  overlay.style.borderRadius = "8px";

  // Aplicar imagem como background do div
  overlay.style.backgroundImage = `url(${info.imagem})`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";

  // Overlay semi-transparente para texto ficar legível
  overlay.style.backdropFilter = "brightness(0.7)";

  // Ocultar lista e "Denominação"
  spans.forEach(s => s.style.display = "none");
  const titulo = document.querySelector("#lista-pecas span.titulo");
  if (titulo) titulo.style.display = "none";

  // Conteúdo texto
  const contentDiv = document.createElement("div");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.gap = "8px";
  contentDiv.style.fontSize = "120%";
  contentDiv.style.color = "white"; // texto legível sobre imagem
  contentDiv.style.textShadow = "1px 1px 3px #000"; // melhor contraste

  const linhaPeca = document.createElement("div");
  linhaPeca.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Denominação</span>: ${info.denominacao}`;

  const linhaSub = document.createElement("div");
  linhaSub.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Sub-conjunto</span>: ${info.subConjunto}`;

  const linhaMat = document.createElement("div");
  linhaMat.innerHTML = `<span style="font-weight:bold;margin-left:5px;">Material</span>: ${info.material}`;

  contentDiv.appendChild(linhaPeca);
  contentDiv.appendChild(linhaSub);
  contentDiv.appendChild(linhaMat);

  overlay.appendChild(contentDiv);

  // Botão fechar
  const btnClose = document.createElement("img");
  btnClose.src = "/Assets/Botoes/Close.png";
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