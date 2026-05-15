setTimeout(() => {
  const firstRow = document.querySelector("#trx-tbody tr");
  if (firstRow) {
    firstRow.classList.add("flash");
    setTimeout(() => firstRow.classList.remove("flash"), 800);
  }
}, 100);

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
  { client: "bkpay", today: 3820, yesterday: 3210, normal30mTraffic: 42, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Hotelmurah", today: 1840, yesterday: 1990, normal30mTraffic: 28, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Bukalapak", today: 980, yesterday: 870, normal30mTraffic: 17, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Telin", today: 620, yesterday: 720, normal30mTraffic: 9, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "correct", today: 355, yesterday: 280, normal30mTraffic: 6, lastTrafficAt: Date.now(), lastTick: 0 },
];

const CLIENT_STOP_NORMAL_MIN = 15;
const CLIENT_STOP_IDLE_MS = 30 * 60 * 1000;
const DEMO_PENDING_INTERVAL_MS = 5000;
const DEMO_PENDING_RESOLVE_MS = 2000;
const LIVE_PENDING = new Map();

// ── ALERT: CLIENT STOP ───────────────────────────────────
const ALERTS_STOP = [
];

// ── ALERT: PRODUCT GANGGUAN ──────────────────────────────
const ALERTS_PRODUCT = [
  {
    level: "critical",
    product: "iPLN / [VSI]",
    desc: "Supplier callback: product close",
    time: "11:10",
  },
  {
    level: "warn",
    product: "DANAKH / [SMB]",
    desc: "RC 68 melewati threshold filter IT",
    time: "11:18",
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
  const tbody = document.getElementById("traffic-tbody");
  tbody.innerHTML = TRAFFIC.map((t) => {
    const diff = t.today - t.yesterday;
    const pctValue = t.yesterday ? (diff / t.yesterday) * 100 : 0;
    const pct = pctValue.toFixed(1);
    const dir = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
    const sign = diff > 0 ? "+" : "";
    const tickDir = t.lastTick > 0 ? "hot" : t.lastTick < 0 ? "drop" : "";
    const liveBadge =
      diff === 0
        ? ""
        : `<span class="traffic-tick ${diff > 0 ? "hot" : "drop"}">${sign}${diff.toLocaleString("id")}</span>`;
    const barColor =
      dir === "up"
        ? "var(--success)"
        : dir === "down"
          ? "var(--danger)"
          : "var(--text3)";
    const ratio = t.yesterday ? t.today / t.yesterday : 1;
    const barW = Math.max(4, Math.min(100, Math.round(ratio * 100)));
    const barTitle = `${t.today.toLocaleString("id")} / ${t.yesterday.toLocaleString("id")} (${sign}${pct}%)`;
    return `<tr class="${tickDir ? "traffic-pulse" : ""}">
      <td><span class="traffic-client"><span class="live-dot ${tickDir}"></span>${t.client}</span></td>
      <td>
        <span class="mono-sm">${t.today.toLocaleString("id")}</span>
        ${liveBadge}
      </td>
      <td><span class="mono-sm" style="color:var(--text3);">${t.yesterday.toLocaleString("id")}</span></td>
      <td><span class="delta ${dir}">${sign}${pct}%</span></td>
      <td><div class="mini-bar" title="${barTitle}"><div class="mini-bar-fill" style="width:${barW}%;background:${barColor};"></div></div></td>
    </tr>`;
  }).join("");

  TRAFFIC.forEach((t) => (t.lastTick = 0));
}

function updateSummaryStats() {
  const total = TRAFFIC.reduce((sum, t) => sum + t.today, 0);
  const reversed = Math.max(0, Math.round(total * 0.112 + Math.random() * 8));
  const pending = LIVE_PENDING.size;
  const failed = Math.random() > 0.85 ? 1 : 0;
  const processing = Math.random() > 0.75 ? Math.floor(Math.random() * 4) + 1 : 0;
  const success = Math.max(0, total - reversed - pending - failed - processing);
  const successPct = total ? ((success / total) * 100).toFixed(1) : "0.0";

  document.getElementById("s-total").textContent = total.toLocaleString("id");
  document.getElementById("s-success").textContent = success.toLocaleString("id");
  document.getElementById("s-success-pct").textContent = `${successPct}%`;
  document.getElementById("s-pending").textContent = pending.toLocaleString("id");
  document.getElementById("s-rev").textContent = reversed.toLocaleString("id");
  document.getElementById("s-failed").textContent = failed.toLocaleString("id");
  document.getElementById("s-proc").textContent = processing.toLocaleString("id");
  updatePendingVisualState(pending);

  if (chartDonut) {
    chartDonut.data.datasets[0].data = [success, reversed, pending, failed];
    chartDonut.update("none");
  }
}

function updatePendingVisualState(pendingCount = LIVE_PENDING.size) {
  const pendingCard = document.querySelector(".stat-card.pending");
  if (!pendingCard) return;

  pendingCard.classList.toggle("is-live-pending", pendingCount > 0);
}

// ── RENDER ALERT: CLIENT STOP ────────────────────────────
function renderAlertStop() {
  const tbody = document.getElementById("alert-stop-tbody");
  if (!ALERTS_STOP.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">Tidak ada client stop terdeteksi</td></tr>`;
    return;
  }
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
  if (!ALERTS_PRODUCT.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">Tidak ada gangguan produk terdeteksi</td></tr>`;
    return;
  }
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

function renderAllAlerts() {
  renderAlertStop();
  renderAlertProduct();
  renderAlertRugi();
  updateAlertBadges();
}

function updateAlertBadges() {
  const criticalCount = ALERTS_PRODUCT.filter((a) => a.level === "critical").length + ALERTS_STOP.length;
  const warnCount = ALERTS_PRODUCT.filter((a) => a.level === "warn").length + ALERTS_RUGI.length;
  const headerBadges = document.querySelectorAll(".alert-count-badge");
  if (headerBadges[0]) headerBadges[0].textContent = `${criticalCount} kritis`;
  if (headerBadges[1]) headerBadges[1].textContent = `${warnCount} warn`;

  const tabBadges = document.querySelectorAll(".alert-tab .tab-badge");
  if (tabBadges[0]) tabBadges[0].textContent = ALERTS_STOP.length;
  if (tabBadges[1]) tabBadges[1].textContent = ALERTS_PRODUCT.length;
  if (tabBadges[2]) tabBadges[2].textContent = ALERTS_RUGI.length;
}

function upsertProductAlert(alert) {
  const sameKey = `${alert.product}|${alert.level}`;
  const exists = ALERTS_PRODUCT.findIndex((a) => `${a.product}|${a.level}` === sameKey);
  if (exists >= 0) ALERTS_PRODUCT.splice(exists, 1);
  ALERTS_PRODUCT.unshift(alert);
  limitAlertRows(ALERTS_PRODUCT);
}

function upsertClientStopAlert(alert) {
  const clientKey = alert.client.split(" ")[0];
  const exists = ALERTS_STOP.findIndex((a) => a.client.split(" ")[0] === clientKey);
  if (exists >= 0) ALERTS_STOP.splice(exists, 1);
  ALERTS_STOP.unshift(alert);
  limitAlertRows(ALERTS_STOP, 6);
}

function processAlertRules(trx, trafficRow) {
  const now = shortTime();
  const margin = parseSignedMoney(trx.margin);

  if (margin < 0) {
    ALERTS_RUGI.unshift({
      id: trx.id,
      client: trx.client,
      product: trx.product,
      rugi: formatMoney(Math.abs(margin)),
      time: now,
    });
    limitAlertRows(ALERTS_RUGI, 8);
  }

  const productIncident = detectProductIncident(trx);
  if (productIncident) upsertProductAlert({ ...productIncident, time: now });

  updateClientStopAlerts();
  renderAllAlerts();
}

function updateClientStopAlerts() {
  const nowMs = Date.now();

  for (let i = ALERTS_STOP.length - 1; i >= 0; i--) {
    const clientName = ALERTS_STOP[i].client.split(" ")[0];
    const row = TRAFFIC.find((t) => t.client === clientName);
    if (!row || nowMs - row.lastTrafficAt < CLIENT_STOP_IDLE_MS) ALERTS_STOP.splice(i, 1);
  }

  TRAFFIC.forEach((row) => {
    const isNormallyBusy = row.normal30mTraffic > CLIENT_STOP_NORMAL_MIN;
    const idleMs = nowMs - row.lastTrafficAt;

    if (isNormallyBusy && idleMs >= CLIENT_STOP_IDLE_MS) {
      const idleMinutes = Math.floor(idleMs / 60000);
      upsertClientStopAlert({
        client: `${row.client} [H2H]`,
        product: "-",
        detail: `Tidak ada traffic baru ${idleMinutes} menit, normalnya ${row.normal30mTraffic} trx / 30 menit`,
        since: shortTime(new Date(row.lastTrafficAt)),
      });
    }
  });
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
      const marginClass = parseSignedMoney(r.margin) < 0 ? "loss" : "";
      const rowClass = stcls === "pending" ? "trx-row-pending" : "";
      return `<tr class="${rowClass}">
      <td style="color:var(--text3);font-size:11px;">${i + 1}</td>
      <td><span class="trx-id">${r.id}</span></td>
      <td><span class="client-tag">${clientShort}</span></td>
      <td><span class="sup-badge">${r.supplier.replace("[", "").replace("]", "")}</span></td>
      <td><span class="mono-sm" style="color:var(--accent2);">${r.product}</span></td>
      <td><span class="mono-sm">${r.dest}</span></td>
      <td><span class="mono-sm" style="color:var(--text3);">15-06 ${r.time}</span></td>
      <td><span class="mono-sm" style="color:${parseFloat(r.dur) > 0.5 ? "var(--warn)" : "var(--text3)"};">${r.dur}s</span></td>
      <td><span class="price-text">${r.price}</span></td>
      <td><span class="margin-text ${marginClass}">${r.margin}</span></td>
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
          data: [420, 510, 780, 690, 980, 1200, 1100, 1350],
          borderColor: "#4f8cff",
          backgroundColor: "rgba(79,140,255,0.08)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: (ctx) => ctx.dataIndex === ctx.dataset.data.length - 1 ? 4 : 2,
          pointHoverRadius: 5,
        },
        {
          label: "Kemarin",
          data: [380, 450, 600, 880, 740, 990, 1050, 970],
          borderColor: "#555e78",
          borderDash: [4, 3],
          borderWidth: 1.5,
          tension: 0.4,
          fill: false,
          pointRadius: (ctx) => ctx.dataIndex === ctx.dataset.data.length - 1 ? 3 : 2,
          pointHoverRadius: 4,
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
          },
        },
        tooltip: {
          backgroundColor: c.tooltip,
        },
      },
      scales: {
        x: { grid: { color: c.grid }, ticks: { color: c.tick } },
        y: { grid: { color: c.grid }, ticks: { color: c.tick } },
      },
    },
  });

  const ctxD = document.getElementById("chartDonut").getContext("2d");

  chartDonut = new Chart(ctxD, {
    type: "doughnut",
    data: {
      labels: ["Success", "Reversed", "Pending", "Failed"],
      datasets: [
        {
          data: [6755, 858, 2, 0],
          backgroundColor: ["#22c55e", "#f97316", "#3b82f6", "#ef4444"],
        },
      ],
    },
    options: {
      cutout: "72%",
      plugins: { legend: { display: false } },
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
  renderAllAlerts();
  renderPagination();
  initCharts();
  updateSummaryStats();
  simulateLiveTraffic();
  startPendingDemoFeed();
  setInterval(() => {
    updateClientStopAlerts();
    renderAllAlerts();
  }, 60 * 1000);
});

// ── 🚀 LIVE TRAFFIC SIMULATOR (REAL-TIME EFFECT) ─────────
let lastTrxId = 2445900;

// helper format
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function parseMoney(str) {
  return parseInt(str.replace(/[^\d]/g, "")) || 0;
}

function parseSignedMoney(str) {
  const amount = parseInt(str.replace(/[^\d-]/g, ""), 10) || 0;
  return str.includes("-") ? -Math.abs(amount) : amount;
}

function formatMoney(amount) {
  const sign = amount < 0 ? "-" : "";
  return `Rp${sign}${Math.abs(amount).toLocaleString("id")}`;
}

function shortTime(date = new Date()) {
  return date.toTimeString().slice(0, 5);
}

function limitAlertRows(rows, max = 8) {
  rows.splice(max);
}

function detectProductIncident(trx) {
  const rcCandidates = ["68", "91", "96", "99"];
  const shouldEmitRcAlert = trx.status === "Reversed" && Math.random() > 0.55;
  const shouldEmitCloseAlert = Math.random() > 0.92;

  if (shouldEmitCloseAlert) {
    return {
      level: "critical",
      product: `${trx.product} / ${trx.supplier}`,
      desc: "Supplier callback: product close",
    };
  }

  if (shouldEmitRcAlert) {
    const rc = rand(rcCandidates);
    const level = rc === "68" || rc === "91" ? "critical" : "warn";
    return {
      level,
      product: `${trx.product} / ${trx.supplier}`,
      desc: `RC ${rc} melewati threshold filter IT`,
    };
  }

  return null;
}

function buildFakeTransaction(statusOverride) {
  const clients = [
    "Hotelmurah [H2H]",
    "bkpay [H2H]",
    "Bukalapak [API]",
    "Telin [H2H]",
    "correct [API]",
  ];

  const suppliers = [
    "[VSI]",
    "[SMB]",
    "[Indotel]",
    "[Bima Sakti]",
    "[Kisel ApiHub]",
  ];

  const products = ["iPLN", "DANAKH", "TSEL50", "I10", "S25", "iBPJSTK"];
  const statuses = ["Success", "Success", "Success", "Success", "Success", "Reversed"];
  const status = statusOverride || rand(statuses);
  const product = rand(products);
  const supplier = rand(suppliers);
  const client = rand(clients);
  const isBillProduct = product === "iPLN";
  const isLoss = !isBillProduct && status === "Success" && Math.random() > 0.78;
  const marginValue = isBillProduct ? 0 : isLoss ? -(Math.floor(Math.random() * 1600) + 250) : Math.floor(Math.random() * 5) * 100;
  const now = new Date();

  let dur = (Math.random() * 0.5).toFixed(3);
  let reason = "Transaksi berhasil";

  if (status === "Reversed") {
    dur = (Math.random() * 2 + 1).toFixed(3);
    reason = "Timeout dari supplier";
  }

  if (status === "Pending") {
    dur = "0.000";
    reason = "Menunggu balasan";
  }

  lastTrxId++;

  return {
    id: lastTrxId.toString(),
    client,
    supplier,
    product,
    dest: "08" + Math.floor(Math.random() * 10000000000),
    time: now.toTimeString().split(" ")[0],
    dur,
    price: isBillProduct ? "Rp0" : "Rp" + (Math.floor(Math.random() * 900) + 10) + ".000",
    margin: formatMoney(marginValue),
    reason,
    status,
  };
}

function ingestTransaction(newTrx) {
  RAW.unshift(newTrx);
  RAW.pop();
  trackPendingTransaction(newTrx);
  renderTrx();

  const clientName = newTrx.client.split(" ")[0];
  const t = TRAFFIC.find((row) => row.client === clientName) || rand(TRAFFIC);
  const burst = Math.floor(Math.random() * 24) + 7;
  t.lastTrafficAt = Date.now();

  if (newTrx.status === "Success") {
    t.today += burst;
    t.lastTick = burst;
  } else if (newTrx.status === "Reversed") {
    const drop = Math.floor(Math.random() * 8) + 3;
    t.today = Math.max(0, t.today - drop);
    t.lastTick = -drop;
  } else {
    const pendingBump = Math.floor(Math.random() * 5) + 1;
    t.today += pendingBump;
    t.lastTick = pendingBump;
  }

  TRAFFIC.forEach((row) => {
    if (row !== t && Math.random() > 0.72) row.today += Math.floor(Math.random() * 4);
  });

  renderTraffic();
  updateSummaryStats();
  processAlertRules(newTrx, t);
  updateHourlyChart(newTrx.status);
}

function updateHourlyChart(status) {
  if (!chartHourly) return;

  const now = new Date();
  const label = now.toTimeString().slice(0, 8);
  const successData = chartHourly.data.datasets[0].data;
  const yesterdayData = chartHourly.data.datasets[1].data;
  const lastToday = successData.at(-1);
  const lastYesterday = yesterdayData.at(-1);
  const wave = Math.sin(Date.now() / 2600) * 36;
  const jitter = Math.floor(Math.random() * 95) - 38;
  const statusImpact =
    status === "Success" ? Math.floor(Math.random() * 70) + 28 :
    status === "Reversed" ? -(Math.floor(Math.random() * 90) + 35) :
    -(Math.floor(Math.random() * 34) + 8);
  const newToday = Math.max(80, Math.round(lastToday + wave + jitter + statusImpact));
  const yesterdayWave = Math.sin(Date.now() / 4200) * 14;
  const yesterdayJitter = Math.floor(Math.random() * 31) - 15;
  const newYesterday = Math.max(80, Math.round(lastYesterday + yesterdayWave + yesterdayJitter));

  chartHourly.data.labels.push(label);
  successData.push(newToday);
  yesterdayData.push(newYesterday);

  if (chartHourly.data.labels.length > 25) {
    chartHourly.data.labels.shift();
    successData.shift();
    yesterdayData.shift();
  }

  chartHourly.update();
}

function startPendingDemoFeed() {
  function schedulePendingWave() {
    setTimeout(() => {
      if (!document.hidden && LIVE_PENDING.size === 0) {
        const pendingCount = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < pendingCount; i++) {
          ingestTransaction(buildFakeTransaction("Pending"));
        }
      }

      setTimeout(schedulePendingWave, DEMO_PENDING_RESOLVE_MS);
    }, DEMO_PENDING_INTERVAL_MS);
  }

  schedulePendingWave();
}

function trackPendingTransaction(trx) {
  if (trx.status !== "Pending") return;

  LIVE_PENDING.set(trx.id, trx);

  setTimeout(() => resolvePendingTransaction(trx.id), DEMO_PENDING_RESOLVE_MS);
}

function resolvePendingTransaction(id) {
  const pendingTrx = LIVE_PENDING.get(id);
  if (!pendingTrx) return;

  const trx = RAW.find((row) => row.id === id);
  LIVE_PENDING.delete(id);

  if (trx) {
    const resolvedAsReversed = Math.random() > 0.82;
    trx.status = resolvedAsReversed ? "Reversed" : "Success";
    trx.dur = resolvedAsReversed ? (Math.random() * 2 + 1).toFixed(3) : (Math.random() * 0.45 + 0.08).toFixed(3);
    trx.reason = resolvedAsReversed ? "Timeout dari supplier" : "Transaksi berhasil";
  }

  renderTrx();
  updateSummaryStats();
}

// ── 🚀 LIVE TRAFFIC SIMULATOR (FIXED REAL MOVEMENT) ─────────
function simulateLiveTraffic() {
  function pushIncomingTraffic() {
    if (document.hidden) {
      scheduleNextTraffic();
      return;
    }

    ingestTransaction(buildFakeTransaction());
    scheduleNextTraffic();
  }

  function scheduleNextTraffic() {
    const nextDelay = Math.floor(Math.random() * 6500) + 3500; // 3.5s - 10s
    setTimeout(pushIncomingTraffic, nextDelay);
  }

  scheduleNextTraffic();
}
