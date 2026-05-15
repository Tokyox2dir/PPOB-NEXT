// ── DATA ─────────────────────────────────────────────────
const RAW = [
  {
    id: "2445900",
    client: "Hotelmurah [H2H]",
    supplier: "[VSI]",
    product: "iPLN",
    dest: "182101500941",
    time: "11:19:37",
    dur: "0.281",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445899",
    client: "Hotelmurah [H2H]",
    supplier: "[VSI]",
    product: "iPLN",
    dest: "231142005745",
    time: "11:19:35",
    dur: "0.253",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445898",
    client: "Hotelmurah [H2H]",
    supplier: "[VSI]",
    product: "iPLN",
    dest: "538413202094",
    time: "11:19:28",
    dur: "0.281",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445897",
    client: "bkpay [H2H]",
    supplier: "[SMB]",
    product: "DANAKH",
    dest: "087714351850",
    time: "11:19:28",
    dur: "0.083",
    price: "Rp202.400",
    margin: "Rp300",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445896",
    client: "bkpay [H2H]",
    supplier: "[SMB]",
    product: "DANAKH",
    dest: "085137181380",
    time: "11:19:26",
    dur: "0.096",
    price: "Rp80.400",
    margin: "Rp300",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445895",
    client: "bkpay [H2H]",
    supplier: "[SMB]",
    product: "DANAKH",
    dest: "085709404833",
    time: "11:19:22",
    dur: "0.106",
    price: "Rp50.400",
    margin: "Rp300",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445894",
    client: "Hotelmurah [H2H]",
    supplier: "[VSI]",
    product: "iPLN",
    dest: "231142019351",
    time: "11:19:21",
    dur: "0.256",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445893",
    client: "Hotelmurah [H2H]",
    supplier: "[VSI]",
    product: "iPLN",
    dest: "522540406297",
    time: "11:19:20",
    dur: "0.322",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445892",
    client: "Bukalapak [H2H IRS]",
    supplier: "[Indotel]",
    product: "I10",
    dest: "085775032576",
    time: "11:19:20",
    dur: "0.183",
    price: "Rp11.470",
    margin: "Rp45",
    reason: "Transaksi berhasil",
    status: "Success",
  },
  {
    id: "2445891",
    client: "Telin [H2H Sync]",
    supplier: "[Bima Sakti]",
    product: "iBPJSTK",
    dest: "0625260460085717",
    time: "11:19:17",
    dur: "0.909",
    price: "Rp0",
    margin: "Rp0",
    reason: "Transaksi berhasil",
    status: "Success",
  },
];

// ── TRAFFIC DATA ─────────────────────────────────────────
const TRAFFIC = [
  { client: "bkpay", today: 3820, yesterday: 3210 },
  { client: "Hotelmurah", today: 1840, yesterday: 1990 },
  { client: "Bukalapak", today: 980, yesterday: 870 },
  { client: "Telin", today: 620, yesterday: 720 },
  { client: "correct", today: 355, yesterday: 280 },
];

// ── ALERT: CLIENT STOP ───────────────────────────────────
const ALERTS_STOP = [
  {
    client: "Hotelmurah [H2H]",
    product: "iPLN",
    detail: "Traffic turun 22% vs kemarin jam 11 — threshold breach",
    since: "11:15",
  },
  {
    client: "Telin [H2H Sync]",
    product: "iBPJSTK",
    detail: "Response time >900ms, kemungkinan timeout supplier",
    since: "11:19",
  },
];

// ── ALERT: PRODUCT GANGGUAN ──────────────────────────────
const ALERTS_PRODUCT = [
  {
    level: "critical",
    product: "iPLN / [VSI]",
    desc: "Reversed rate naik ke 11.3% (threshold: 10%)",
    time: "11:10",
  },
  {
    level: "warn",
    product: "DANAKH / [SMB]",
    desc: "1 transaksi reversed terdeteksi, monitor ketat",
    time: "11:18",
  },
  {
    level: "info",
    product: "I10 / [Indotel]",
    desc: "Semua produk normal, performa stabil",
    time: "11:00",
  },
];

// ── ALERT: TRANSAKSI RUGI ────────────────────────────────
const ALERTS_RUGI = [
  {
    id: "2445881",
    client: "bkpay [H2H]",
    product: "DANAKH",
    rugi: "Rp1.200",
    time: "11:08",
  },
];

// ── RENDER TRAFFIC ───────────────────────────────────────
function renderTraffic() {
  const max = Math.max(...TRAFFIC.map((t) => Math.max(t.today, t.yesterday)));
  const tbody = document.getElementById("traffic-tbody");
  tbody.innerHTML = TRAFFIC.map((t) => {
    const diff = t.today - t.yesterday;
    const pct = ((diff / t.yesterday) * 100).toFixed(1);
    const dir = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
    const sign = diff > 0 ? "+" : "";
    const barColor =
      dir === "up"
        ? "var(--success)"
        : dir === "down"
          ? "var(--danger)"
          : "var(--text3)";
    const barW = Math.round((t.today / max) * 100);
    return `<tr>
      <td><span class="traffic-client">${t.client}</span></td>
      <td><span class="mono-sm">${t.today.toLocaleString("id")}</span></td>
      <td><span class="mono-sm" style="color:var(--text3);">${t.yesterday.toLocaleString("id")}</span></td>
      <td><span class="delta ${dir}">${sign}${pct}%</span></td>
      <td><div class="mini-bar"><div class="mini-bar-fill" style="width:${barW}%;background:${barColor};"></div></div></td>
    </tr>`;
  }).join("");
}

// ── RENDER ALERT: CLIENT STOP ────────────────────────────
function renderAlertStop() {
  const tbody = document.getElementById("alert-stop-tbody");
  tbody.innerHTML = ALERTS_STOP.map(
    (a) => `<tr>
    <td>
      <span class="stop-badge">
        <span class="dot"></span>
        ${a.client.split(" ")[0]}
      </span>
    </td>
    <td><span class="mono-sm" style="color:var(--accent2);">${a.product}</span></td>
    <td style="max-width:200px; white-space:normal; line-height:1.4; font-size:11.5px;">${a.detail}</td>
    <td><span class="mono-sm" style="color:var(--text3);">${a.since}</span></td>
  </tr>`,
  ).join("");
}

// ── RENDER ALERT: PRODUCT GANGGUAN ──────────────────────
function renderAlertProduct() {
  const tbody = document.getElementById("alert-product-tbody");
  tbody.innerHTML = ALERTS_PRODUCT.map((a) => {
    const cls =
      a.level === "critical"
        ? "critical"
        : a.level === "warn"
          ? "warn"
          : "info";
    return `<tr>
      <td>
        <span class="alert-badge ${cls}">
          <span class="alert-dot ${a.level === "critical" ? "blink" : ""}" style="background:${cls === "critical" ? "var(--danger)" : cls === "warn" ? "var(--warn)" : "var(--pending)"};"></span>
          ${a.level.toUpperCase()}
        </span>
      </td>
      <td><span class="mono-sm" style="color:var(--text);">${a.product}</span></td>
      <td style="max-width:200px; white-space:normal; line-height:1.4; font-size:11.5px;">${a.desc}</td>
      <td><span class="mono-sm" style="color:var(--text3);">${a.time}</span></td>
    </tr>`;
  }).join("");
}

// ── RENDER ALERT: TRANSAKSI RUGI ─────────────────────────
function renderAlertRugi() {
  const tbody = document.getElementById("alert-rugi-tbody");
  if (!ALERTS_RUGI.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">Tidak ada transaksi rugi hari ini</td></tr>`;
    return;
  }
  tbody.innerHTML = ALERTS_RUGI.map(
    (a) => `<tr>
    <td><span class="trx-id">${a.id}</span></td>
    <td><span class="client-tag">${a.client.split(" ")[0]}</span></td>
    <td><span class="mono-sm" style="color:var(--accent2);">${a.product}</span></td>
    <td><span class="rugi-val">${a.rugi}</span></td>
    <td><span class="mono-sm" style="color:var(--text3);">${a.time}</span></td>
  </tr>`,
  ).join("");
}

// ── SWITCH ALERT TAB ─────────────────────────────────────
function switchAlertTab(tab, btn) {
  // deactivate all tabs & panels
  document
    .querySelectorAll(".alert-tab")
    .forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".alert-panel").forEach((p) => {
    p.classList.remove("active");
    p.style.display = "none";
  });
  // activate selected
  btn.classList.add("active");
  const panel = document.getElementById("panel-" + tab);
  panel.classList.add("active");
  panel.style.display = "flex";
}

// ── RENDER TRANSACTION TABLE ─────────────────────────────
function renderTrx() {
  const tbody = document.getElementById("trx-tbody");
  tbody.innerHTML = RAW.slice(0, 10)
    .map((r, i) => {
      const stcls = r.status.toLowerCase();
      const clientShort = r.client.split(" ")[0];
      return `<tr>
      <td style="color:var(--text3);font-size:11px;">${i + 1}</td>
      <td><span class="trx-id">${r.id}</span></td>
      <td><span class="client-tag">${clientShort}</span></td>
      <td><span class="sup-badge">${r.supplier.replace("[", "").replace("]", "")}</span></td>
      <td><span class="mono-sm" style="color:var(--accent2);">${r.product}</span></td>
      <td><span class="mono-sm">${r.dest}</span></td>
      <td><span class="mono-sm" style="color:var(--text3);">15-06 ${r.time}</span></td>
      <td><span class="mono-sm" style="color:${parseFloat(r.dur) > 0.5 ? "var(--warn)" : "var(--text3)"};">${r.dur}s</span></td>
      <td><span class="price-text">${r.price}</span></td>
      <td><span class="margin-text">${r.margin}</span></td>
      <td style="color:var(--text3);max-width:120px;overflow:hidden;text-overflow:ellipsis;">${r.reason}</td>
      <td><span class="status-pill ${stcls}">${r.status}</span></td>
    </tr>`;
    })
    .join("");
}

// ── PAGINATION ────────────────────────────────────────────
function renderPagination() {
  const wrap = document.getElementById("page-btns");
  const pages = [1, 2, "...", 304, 305];
  wrap.innerHTML = pages
    .map((p) => {
      if (p === "...")
        return `<div class="page-btn" style="cursor:default;border-color:transparent;color:var(--text3);">…</div>`;
      return `<div class="page-btn ${p === 1 ? "active" : ""}" onclick="goPage(${p})">${p}</div>`;
    })
    .join("");
}

function goPage(n) {
  document
    .querySelectorAll(".page-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
}

// ── CHARTS ───────────────────────────────────────────────
let chartHourly, chartDonut;

function getChartColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    grid: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
    tick: dark ? "#555e78" : "#9aa0b8",
    tooltip: dark ? "#13161e" : "#ffffff",
  };
}

function initCharts() {
  const c = getChartColors();
  Chart.defaults.font.family = "'DM Sans', sans-serif";

  // Hourly
  const ctxH = document.getElementById("chartHourly").getContext("2d");
  chartHourly = new Chart(ctxH, {
    type: "line",
    data: {
      labels: [
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "11:19",
      ],
      datasets: [
        {
          label: "Hari Ini",
          data: [420, 680, 890, 1020, 1140, 1250, 1380, 835],
          borderColor: "#4f8cff",
          backgroundColor: "rgba(79,140,255,0.08)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: "#4f8cff",
        },
        {
          label: "Kemarin",
          data: [380, 610, 820, 950, 1060, 1180, 1290, 910],
          borderColor: "#555e78",
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderDash: [4, 3],
          tension: 0.4,
          fill: false,
          pointRadius: 2,
          pointBackgroundColor: "#555e78",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          labels: {
            color: c.tick,
            font: { size: 11 },
            boxWidth: 18,
            padding: 14,
          },
        },
        tooltip: {
          backgroundColor: c.tooltip,
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#e8ecf4",
          bodyColor: "#8b92a8",
        },
      },
      scales: {
        x: {
          grid: { color: c.grid },
          ticks: { color: c.tick, font: { size: 10 } },
        },
        y: {
          grid: { color: c.grid },
          ticks: { color: c.tick, font: { size: 10 } },
        },
      },
    },
  });

  // Donut
  const ctxD = document.getElementById("chartDonut").getContext("2d");
  chartDonut = new Chart(ctxD, {
    type: "doughnut",
    data: {
      labels: ["Success", "Reversed", "Pending", "Failed"],
      datasets: [
        {
          data: [6755, 858, 2, 0],
          backgroundColor: ["#22c55e", "#f97316", "#3b82f6", "#ef4444"],
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: c.tooltip,
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#e8ecf4",
          bodyColor: "#8b92a8",
        },
      },
    },
  });
}

function updateChartColors() {
  const c = getChartColors();
  if (chartHourly) {
    chartHourly.options.plugins.legend.labels.color = c.tick;
    chartHourly.options.scales.x.grid.color = c.grid;
    chartHourly.options.scales.x.ticks.color = c.tick;
    chartHourly.options.scales.y.grid.color = c.grid;
    chartHourly.options.scales.y.ticks.color = c.tick;
    chartHourly.options.plugins.tooltip.backgroundColor = c.tooltip;
    chartHourly.update();
  }
  if (chartDonut) {
    chartDonut.options.plugins.tooltip.backgroundColor = c.tooltip;
    chartDonut.update();
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("theme-label").textContent = isDark
    ? "Dark Mode"
    : "Light Mode";
  updateChartColors();
}

function refreshData() {
  const btn = document.querySelector(".btn-ghost");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.7s linear infinite;"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg> Refreshing…`;
  setTimeout(() => {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg> Refresh`;
  }, 1200);
}

const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);

document.addEventListener("DOMContentLoaded", () => {
  renderTrx();
  renderTraffic();
  renderAlertStop();
  renderAlertProduct();
  renderAlertRugi();
  renderPagination();
  initCharts();
});
