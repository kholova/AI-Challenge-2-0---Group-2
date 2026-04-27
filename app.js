const EMPLOYEES = [
  {
    id: "musk",
    name: "Elon Musk",
    role: "Chief Engineer (SF.T1.MARS)",
    dept: "Core Engineering (US.R1.D3)",
    score: 536,
    stars: 17,
  },
  {
    id: "bezos",
    name: "Jeff Bezos",
    role: "Senior Principal (SEA.G6.K)",
    dept: "Systems Design (US.R2.D1)",
    score: 328,
    stars: 10,
  },
  {
    id: "nadella",
    name: "Satya Nadella",
    role: "Cloud Architect (RED.0X.AI)",
    dept: "Cloud Platform (IN.F2.G7)",
    score: 200,
    stars: 4,
  },
  {
    id: "arnault",
    name: "Bernard Arnault",
    role: "LVMH Innovation Lead (PAR.F8.L)",
    dept: "Innovation Lab (FR.P7.D2)",
    score: 189,
    stars: 3,
  },
  {
    id: "zuckerberg",
    name: "Mark Zuckerberg",
    role: "Metaverse Director (MPK.1.META)",
    dept: "XR Platforms (US.R3.D4)",
    score: 154,
    stars: 2,
  },
  {
    id: "buffett",
    name: "Warren Buffett",
    role: "Investment Advisor (OMA.G3.V)",
    dept: "Strategy Office (US.R4.D1)",
    score: 98,
    stars: 1,
  },
  {
    id: "huang",
    name: "Jensen Huang",
    role: "GPU Architect (SJ.CUDA.NV)",
    dept: "Accelerated Computing (US.R2.D6)",
    score: 312,
    stars: 9,
  },
  {
    id: "swift",
    name: "Taylor Swift",
    role: "Creative Engineer (NASH.ERAS.TS)",
    dept: "Creative Technology (US.R5.D2)",
    score: 277,
    stars: 7,
  },
  {
    id: "williams",
    name: "Serena Williams",
    role: "Leadership Coach (MIA.ACE.W)",
    dept: "Talent Development (US.R6.D1)",
    score: 145,
    stars: 2,
  },
  {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    role: "Sports Tech Lead (SAU.SIU.CR)",
    dept: "Wearables & Sensors (ME.R1.D5)",
    score: 212,
    stars: 5,
  },
];

let publicSpeakingActive = true;
let searchQuery = "";

function initials(name) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function sortByScoreDesc(list) {
  return [...list].sort((a, b) => b.score - a.score);
}

function createTopPerson(person, rank) {
  const wrap = document.createElement("div");
  wrap.className = "topPerson";

  const avatarClass = rank === 1 ? "topPerson__avatar topPerson__avatar--gold" : "topPerson__avatar";
  const badgeClass =
    rank === 1 ? "topPerson__badge topPerson__badge--gold" : rank === 2 ? "topPerson__badge topPerson__badge--gray" : "topPerson__badge topPerson__badge--brown";
  const pillClass = rank === 1 ? "scorePill scorePill--gold" : "scorePill scorePill--blue";
  const starIcon = rank === 1 ? "fa-solid fa-star scorePill__icon" : "fa-solid fa-star scorePill__icon";

  wrap.innerHTML = `
    <div class="${avatarClass}" aria-hidden="true">
      ${initials(person.name)}
      <span class="${badgeClass}">${rank}</span>
    </div>
    <div class="topPerson__name">${person.name}</div>
    <div class="topPerson__role">${person.role}</div>
    <div class="${pillClass}">
      <i class="${starIcon}" style="color:${rank === 1 ? "var(--gold)" : "var(--blue)"}" aria-hidden="true"></i>
      <span>${person.score.toLocaleString()}</span>
    </div>
  `;

  return wrap;
}

function createPodiumBlocks() {
  const blocks = document.createElement("div");
  blocks.className = "podium__blocks";
  blocks.innerHTML = `
    <div class="block"><div class="block__num">2</div></div>
    <div class="block block--center"><div class="block__num">1</div></div>
    <div class="block"><div class="block__num">3</div></div>
  `;
  return blocks;
}

function createRowCard(person, rank) {
  const row = document.createElement("div");
  row.className = "rowCard";
  row.setAttribute("role", "listitem");

  row.innerHTML = `
    <div class="rowCard__rank">${rank}</div>
    <div class="rowCard__person">
      <span class="rowCard__avatar" aria-hidden="true">${initials(person.name)}</span>
      <div style="min-width:0">
        <p class="rowCard__name">${person.name}</p>
        <p class="rowCard__role">${person.role}</p>
      </div>
    </div>
    <div class="rowCard__stars" aria-label="Stars">
      <i class="fa-regular fa-display" aria-hidden="true"></i>
      <span>${person.stars}</span>
    </div>
    <div class="rowCard__total">
      <div class="rowCard__totalLabel">TOTAL</div>
      <div class="rowCard__totalScore">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <span>${person.score.toLocaleString()}</span>
      </div>
    </div>
    <button class="rowCard__chev" type="button" aria-label="Expand">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </button>
  `;

  return row;
}

function render(employees) {
  const podiumPeopleEl = document.getElementById("podiumPeople");
  const podiumBlocksEl = document.getElementById("podiumBlocks");
  const rowsEl = document.getElementById("rows");
  if (!podiumPeopleEl || !podiumBlocksEl || !rowsEl) return;

  podiumPeopleEl.innerHTML = "";
  podiumBlocksEl.innerHTML = "";
  rowsEl.innerHTML = "";

  const sorted = sortByScoreDesc(employees);
  const top3 = sorted.slice(0, 3);
  const rest = sorted;

  const [first, second, third] = top3;
  if (second) podiumPeopleEl.appendChild(createTopPerson(second, 2));
  if (first) podiumPeopleEl.appendChild(createTopPerson(first, 1));
  if (third) podiumPeopleEl.appendChild(createTopPerson(third, 3));
  podiumBlocksEl.appendChild(createPodiumBlocks());

  if (rest.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No employees match your search.";
    rowsEl.appendChild(empty);
    return;
  }

  rest.forEach((p, i) => rowsEl.appendChild(createRowCard(p, i + 1)));
}

function getVisibleEmployees() {
  let list = [...EMPLOYEES];

  if (publicSpeakingActive) {
    // mock public speaking filter – shows limited set for demo
    const allowed = new Set(["musk", "bezos", "huang"]);
    list = list.filter((e) => allowed.has(e.id));
  }

  const q = searchQuery.trim().toLowerCase();
  if (q) list = list.filter((e) => e.name.toLowerCase().includes(q));

  return list;
}

function update() {
  render(getVisibleEmployees());
}

function bindSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const onChange = () => {
    searchQuery = input.value ?? "";
    update();
  };

  input.addEventListener("input", onChange);
}

function bindDropdowns() {
  const dds = Array.from(document.querySelectorAll(".dd"));
  if (dds.length === 0) return;

  const closeAll = () => dds.forEach((dd) => dd.removeAttribute("data-open"));

  dds.forEach((dd) => {
    const btn = dd.querySelector(".dd__btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dd.getAttribute("data-open") === "true";
      closeAll();
      if (!isOpen) dd.setAttribute("data-open", "true");
      btn.setAttribute("aria-expanded", String(!isOpen));
    });

    dd.querySelectorAll(".dd__item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const kind = dd.getAttribute("data-dd");
        if (kind === "year" || kind === "quarter") {
          console.log("filter by year/quarter – no backend");
        }
        closeAll();
        btn.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

function bindPublicSpeaking() {
  const btn = document.getElementById("publicSpeakingBtn");
  if (!btn) return;

  const sync = () => {
    btn.classList.toggle("catToggle--active", publicSpeakingActive);
    btn.setAttribute("aria-pressed", String(publicSpeakingActive));
  };

  btn.addEventListener("click", () => {
    publicSpeakingActive = !publicSpeakingActive;
    sync();
    update();
  });

  sync();
}

update();
bindSearch();
bindDropdowns();
bindPublicSpeaking();

