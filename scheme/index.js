const nodes = [
  { id: "alliksaar", label: "Алликсаар" },
  { id: "duhast", label: "Ду Хаст Вячеславович" },
  { id: "anastasia", label: "Анастасия Ширинкина" },
  { id: "igor", label: "Игорь Зверёк" },
  { id: "anton", label: "Антон Строй" },
  { id: "stanislav", label: "Станислав Клитотехнис" },
  { id: "aleksandr", label: "Александр Троян" },
  { id: "ludmila", label: "Людмила Водолазская" },
  { id: "olga", label: "Ольга Боргдорф" },
  { id: "sergey", label: "Сергей Брус" },
  { id: "dmitriy", label: "Дмитрий Возигнуй" },
  { id: "kristina", label: "Кристина Болтушкина" },
  { id: "maxim", label: "Максим Висюлькин" },
];

document.addEventListener("DOMContentLoaded", () => {
  nodes.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = label;
    }
  });

  const edges = [
    {
      from: { id: "duhast", side: "left" },
      to: { id: "alliksaar", side: "right" },
    },
    {
      from: { id: "anastasia", side: "left" },
      to: { id: "alliksaar", side: "right" },
    },
    {
      from: { id: "stanislav", side: "left" },
      to: { id: "alliksaar", side: "buttom" },
    },
    {
      from: { id: "igor", side: "left" },
      to: { id: "alliksaar", side: "buttom" },
    },
    {
      from: { id: "anton", side: "left" },
      to: { id: "alliksaar", side: "buttom" },
    },
    {
      from: { id: "aleksandr", side: "left" },
      to: { id: "stanislav", side: "right" },
    },
    {
      from: { id: "ludmila", side: "left" },
      to: { id: "stanislav", side: "buttom" },
    },
    {
      from: { id: "olga", side: "left" },
      to: { id: "stanislav", side: "buttom" },
    },
    {
      from: { id: "sergey", side: "left" },
      to: { id: "stanislav", side: "buttom" },
    },
    {
      from: { id: "dmitriy", side: "left" },
      to: { id: "olga", side: "right" },
    },
    {
      from: { id: "kristina", side: "left" },
      to: { id: "olga", side: "right" },
    },
    {
      from: { id: "maxim", side: "left" },
      to: { id: "olga", side: "right" },
    },
    {
      from: { id: "maxim", side: "right" },
      to: { id: "dmitriy", side: "right" },
    },
  ];

  const root = document.getElementById("scheme-root");
  const svgNS = "http://www.w3.org/2000/svg";

  // Далее идёт блок vibe coding
  function port(el, side) {
    const r = el.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    const cx = r.left - rr.left + r.width / 2;
    const cy = r.top - rr.top + r.height / 2;
    if (side === "left") return { x: r.left - rr.left, y: cy, dx: -1, dy: 0 };
    if (side === "right") return { x: r.right - rr.left, y: cy, dx: 1, dy: 0 };
    if (side === "top") return { x: cx, y: r.top - rr.top, dx: 0, dy: -1 };
    return { x: cx, y: r.bottom - rr.top, dx: 0, dy: 1 };
  }

  function draw() {
    const rr = root.getBoundingClientRect();
    const w = rr.width;
    const h = rr.height;
    let svg = root.querySelector("svg.links");
    if (!svg) {
      svg = document.createElementNS(svgNS, "svg");
      svg.classList.add("links");
      root.appendChild(svg);
      const defs = document.createElementNS(svgNS, "defs");
      const marker = document.createElementNS(svgNS, "marker");
      marker.setAttribute("id", "arrow");
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "10");
      marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "6");
      marker.setAttribute("markerHeight", "6");
      marker.setAttribute("orient", "auto-start-reverse");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      path.setAttribute("fill", "#AAAAAA");
      marker.appendChild(path);
      defs.appendChild(marker);
      svg.appendChild(defs);
    }
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.querySelectorAll("path.edge").forEach((p) => p.remove());

    edges.forEach((e) => {
      const fromEl = document.getElementById(e.from.id);
      const toEl = document.getElementById(e.to.id);
      if (!fromEl || !toEl) return;
      const p1 = port(fromEl, e.from.side);
      const p4 = port(toEl, e.to.side);
      const o = 20;
      const p2 = { x: p1.x + p1.dx * o, y: p1.y + p1.dy * o };
      const p3 = { x: p4.x + p4.dx * o, y: p4.y + p4.dy * o };
      const mid = { x: p2.x, y: p3.y };
      const path = document.createElementNS(svgNS, "path");
      const d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${mid.x} ${mid.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y}`;
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#AAAAAA");
      path.setAttribute("stroke-width", "2");
      path.setAttribute("class", "edge");
      path.setAttribute("marker-end", "url(#arrow)");
      svg.appendChild(path);
    });
  }

  draw();
  window.addEventListener("resize", draw);
});
