/* =========================
   Overlay de Material
========================= */

export function showMaterialOverlay(pieceName, spans, scene, showAllMeshes, resetSelection, resetHover, resetListStyles) {

  /* =========================
     MAPA DE INFORMAÇÕES
  ========================= */
  const materialMap = {
    "Corpo": { denominacao: "Corpo", subConjunto: "-", material: "ASTM A.216 Gr. WCB" },
    "Castelo": { denominacao: "Castelo", subConjunto: "-", material: "ASTM A.216 Gr. WCB" },
    "Sede": { denominacao: "Sede", subConjunto: "-", material: "SAE-1020" },
    "Disco": { denominacao: "Disco", subConjunto: "-", material: "SAE-1020" },
    "Haste": { denominacao: "Haste", subConjunto: "-", material: "SAE-1045 tref." },
    "Preme-Gaxeta": { denominacao: "Preme-Gaxeta", subConjunto: "-", material: "ASTM A.536 Cl. B" },
    "Trava da Haste": { denominacao: "Trava da Haste", subConjunto: "-", material: "SAE-1020" },
    "Trava da Bucha": { denominacao: "Trava da Bucha", subConjunto: "-", material: "ASTM A.536 Cl. B" },
    "Bucha da Haste": { denominacao: "Bucha da Haste", subConjunto: "-", material: "ASTM A.536 Cl. B" },
    "Rolamento": { denominacao: "Rolamento", subConjunto: "-", material: "Aço Liga" },
    "Suporte da Trava": { denominacao: "Suporte da Trava", subConjunto: "-", material: "SAE-1020" },
    "Volante Trava": { denominacao: "Volante Trava", subConjunto: "-", material: "ASTM A.216 Gr. WCB" },
    "Volante da Haste": { denominacao: "Volante da Haste", subConjunto: "-", material: "ASTM A.216 Gr. WCB" },
    "Proteção da Haste": { denominacao: "Proteção da Haste", subConjunto: "-", material: "SAE-1020" },
    "Anel Raspador": { denominacao: "Anel Raspador", subConjunto: "-", material: "SAE-1020" },
    "Anéis de Gaxeta": { denominacao: "Anéis de Gaxeta", subConjunto: "-", material: "PTFE" },
    "Junta": { denominacao: "Junta", subConjunto: "-", material: "PTFE" },
    "Atuador Penta-410": { denominacao: "Atuador Penta-410", subConjunto: "-", material: "Diversos" }
  };

  /* =========================
     MAPA DE TABELAS INDIVIDUAL
  ========================= */
  const tableMap = {
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
  overlay.style.position = "absolute";
  overlay.style.left = "20px";
  overlay.style.top = "140px";
  overlay.style.padding = "15px";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.zIndex = 30;
  overlay.style.borderRadius = "8px";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.4)"; // fundo 40% transparente
  overlay.style.border = "1px solid #ccc";

  spans.forEach(s => s.style.display = "none");
  const titulo = document.querySelector("#lista-pecas span.titulo");
  if (titulo) titulo.style.display = "none";

  const contentDiv = document.createElement("div");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.gap = "8px";

  contentDiv.innerHTML = `
    <div><b>Denominação:</b> ${info.denominacao}</div>
    <div><b>Sub-conjunto:</b> ${info.subConjunto}</div>
    <div><b>Material:</b> ${info.material}</div>
  `;

  // ======================
  // Ajuste de largura 2.65x da palavra “Denominação”
  // ======================
  const tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.fontWeight = "bold";
  tempSpan.textContent = "Denominação:";
  document.body.appendChild(tempSpan);
  const widthDenom = tempSpan.getBoundingClientRect().width;
  contentDiv.style.width = `${widthDenom * 2.65}px`;
  tempSpan.remove();

  /* TABELA */
  const tableData = tableMap[pieceName];

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "10px";
  table.style.width = "100%";

  tableData.forEach((row, index) => {
    const tr = document.createElement("tr");

    row.forEach(cell => {
      const cellElement = document.createElement(index === 0 ? "th" : "td");
      cellElement.textContent = cell;
      cellElement.style.border = "1px solid #999";
      cellElement.style.padding = "4px 8px";
      cellElement.style.textAlign = "center";
      if (index === 0) cellElement.style.fontWeight = "bold";
      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });

  contentDiv.appendChild(table);

  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Detalhes";
  btnDetalhes.style.marginTop = "12px";
  btnDetalhes.style.alignSelf = "center";
  btnDetalhes.style.padding = "6px 16px";
  btnDetalhes.style.fontWeight = "bold";
  btnDetalhes.style.backgroundColor = "#FF6600";
  btnDetalhes.style.color = "white";
  btnDetalhes.style.border = "2px solid #FF6600";
  btnDetalhes.style.borderRadius = "5px";
  btnDetalhes.style.cursor = "pointer";

  btnDetalhes.addEventListener("click", () => {
    window.open(`Assets/PDF/${pieceName}.pdf`, "_blank");
  });

  contentDiv.appendChild(btnDetalhes);
  overlay.appendChild(contentDiv);
  document.body.appendChild(overlay);

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