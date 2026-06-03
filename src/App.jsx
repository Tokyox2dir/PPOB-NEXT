import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  ArcElement,
  DoughnutController,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { filterOptions, menuSections, moduleTables, reportSeries, routeToView, transactions, viewMeta } from "./data.js";

ChartJS.register(ArcElement, BarController, BarElement, CategoryScale, DoughnutController, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend);

const defaultRoute = "/transactions/current";

function getRoute() {
  const hashRoute = window.location.hash.replace("#", "");
  return hashRoute || defaultRoute;
}

function money(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function useHashRoute() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) window.history.replaceState(null, "", `#${defaultRoute}`);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (path) => {
    if (path === route) return;
    window.location.hash = path;
  };

  return [route, navigate];
}

function useClock() {
  const [clock, setClock] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("id-ID", { hour12: false }));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return clock;
}

function Sidebar({ activeView, onNavigate, collapsed }) {
  const [openSection, setOpenSection] = useState(viewMeta[activeView]?.section || "Transaction");

  useEffect(() => {
    setOpenSection(viewMeta[activeView]?.section || "Transaction");
  }, [activeView]);

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">TX</div>
          <div>
            <div className="logo-text">TRX Monitor</div>
            <div className="logo-sub">v3.0 - React</div>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuSections.map((section) => {
          const isOpen = openSection === section.label;
          return (
            <div className={`nav-section ${isOpen ? "nav-section-active" : "collapsed"}`} key={section.label}>
              <button className="nav-section-title" type="button" onClick={() => setOpenSection(isOpen ? "" : section.label)}>
                <span>{section.label}</span>
                <ChevronDown className="nav-chevron" />
              </button>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    className={`nav-subitem ${item.card ? "nav-subitem-card" : ""} ${activeView === item.id ? "active" : ""}`}
                    href={`#${item.path}`}
                    key={item.id}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.path);
                    }}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function Topbar({ title, onToggleSidebar, onToggleTheme, theme }) {
  const clock = useClock();
  return (
    <div className="topbar fixed-elem">
      <button className="sidebar-toggle btn btn-ghost" type="button" onClick={onToggleSidebar} title="Hide sidebar" aria-label="Toggle sidebar">
        <Menu />
      </button>
      <div className="topbar-title">
        {title} <span>02 Jun 2026</span>
      </div>
      <div className="topbar-actions">
        <div className="live-clock">
          <span className="live-dot" />
          <span>{clock}</span>
        </div>
        <button className="theme-toggle-top btn btn-ghost" type="button" onClick={onToggleTheme} title="Toggle theme">
          {theme === "dark" ? <Sun /> : <Moon />}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
        <div className="user-chip">Dito (Super Admin)</div>
      </div>
    </div>
  );
}

function SelectField({ label, options, value, onChange }) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterPanel({ fields = ["account", "gateway", "serviceCode"], onStatus }) {
  const [values, setValues] = useState({});
  const labels = {
    account: "Account",
    gateway: "Gateway",
    provider: "Provider",
    category: "Category",
    serviceCode: "Service Code",
    status: "Status",
  };

  return (
    <div className="filter-card">
      {fields.map((field) => (
        <SelectField
          key={field}
          label={labels[field]}
          options={filterOptions[field]}
          value={values[field] || ""}
          onChange={(value) => setValues((current) => ({ ...current, [field]: value }))}
        />
      ))}
      {onStatus && (
        <button className="btn btn-filter btn-warning" type="button" onClick={() => onStatus("Pending")}>
          Pending Only
        </button>
      )}
      <button className="btn btn-filter btn-primary" type="button">OK</button>
    </div>
  );
}

function Hero({ screenshot, title, subtitle }) {
  return (
    <section className="module-hero">
      <div>
        <span className="eyebrow">Screenshot {screenshot}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

function StatCard({ label, value, tone, onClick }) {
  return (
    <button className={`metric-card ${tone || ""}`} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{label === "Pending" ? "0.03%" : "Live snapshot"}</small>
    </button>
  );
}

function HealthCard({ label, value, caption, tone }) {
  return (
    <div className={`health-card ${tone || ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{caption}</small>
    </div>
  );
}

function GatewayHealthList() {
  const gateways = [
    ["SMB", "98.2%", "1.887B", "stable"],
    ["Bima Sakti", "95.7%", "83.8M", "stable"],
    ["Toplink", "93.1%", "80.4M", "watch"],
    ["Telin", "89.6%", "96.3M", "issue"],
  ];

  return (
    <div className="gateway-health">
      <div className="panel-heading">
        <span>Gateway Health</span>
        <strong>Live</strong>
      </div>
      {gateways.map(([name, success, balance, tone]) => (
        <div className="gateway-row" key={name}>
          <div>
            <strong>{name}</strong>
            <span>Success {success}</span>
          </div>
          <div className="gateway-balance">{balance}</div>
          <span className={`health-dot ${tone}`} />
        </div>
      ))}
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.join("-")}-${index}`} className={row.includes("Pending") ? "row-pending" : row.includes("Rejected") || row.includes("FALSE") ? "row-danger" : ""}>
              <td>{index + 1}</td>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {cell === "TRUE" || cell === "FALSE" ? <span className={`status-pill ${cell === "TRUE" ? "success" : "danger"}`}>{cell}</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SimpleChart({ type, labels, datasets, height = 320 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    chartRef.current?.destroy();
    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#9ca3af" } } },
        scales: {
          x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
          y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [datasets, labels, type]);

  return (
    <div className="chart-panel" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

const donutCenterTextPlugin = {
  id: "donutCenterText",
  afterDraw(chart) {
    if (chart.config.type !== "doughnut") return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim() || "#e8ecf4";
    ctx.font = "800 24px 'DM Sans', sans-serif";
    ctx.fillText("88.7%", centerX, centerY - 6);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text2").trim() || "#8b92a8";
    ctx.font = "800 10px 'DM Sans', sans-serif";
    ctx.fillText("Success Rate", centerX, centerY + 16);
    ctx.restore();
  },
};

function DashboardChart({ type, labels, datasets, options = {}, className = "" }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    chartRef.current?.destroy();
    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#8b92a8", boxWidth: 12, font: { size: 11, weight: "700" } } },
          tooltip: { backgroundColor: "#13161e", borderColor: "#252a38", borderWidth: 1 },
        },
        scales: type === "doughnut" ? undefined : {
          x: { ticks: { color: "#8b92a8" }, grid: { color: "rgba(139,146,168,.13)" } },
          y: { ticks: { color: "#8b92a8" }, grid: { color: "rgba(139,146,168,.13)" } },
        },
        ...options,
      },
      plugins: type === "doughnut" ? [donutCenterTextPlugin] : [],
    });
    return () => chartRef.current?.destroy();
  }, [datasets, labels, options, type]);

  return (
    <div className={`chart-wrap ${className}`.trim()}>
      <canvas ref={canvasRef} />
    </div>
  );
}

const monitorRows = [
  ["SYS-260602-8841", "BK PAY", "SMB", "S100", "08123450001", "17:18:03", "0.8", "Rp96.300", "Rp420", "OK", "Success"],
  ["SYS-260602-8840", "Telin", "Indotel", "S1000", "08123450002", "17:17:41", "1.2", "Rp990.410", "Rp1.120", "Waiting supplier callback", "Pending"],
  ["SYS-260602-8839", "SMB", "Telin", "DANAKH", "08123450003", "17:17:09", "0.5", "-", "-", "service code invalid", "Rejected"],
  ["SYS-260602-8838", "Quantum", "Toplink", "GPYKH", "08123450004", "17:16:22", "0.7", "Rp12.450", "Rp210", "OK", "Success"],
  ["SYS-260602-8837", "Toplink", "PlusLink", "S100", "08123450005", "17:15:55", "1.6", "Rp98.525", "Rp350", "Callback delayed", "Pending"],
  ["SYS-260602-8836", "Redigame", "Bima Sakti", "ATF100", "08123450006", "17:15:02", "0.9", "Rp75.000", "Rp260", "OK", "Success"],
  ["SYS-260602-8835", "BK PAY", "SMB", "PLN20", "08123450007", "17:14:44", "0.6", "Rp20.350", "Rp180", "OK", "Success"],
  ["SYS-260602-8834", "HIGO", "Aviana", "GMS50", "08123450008", "17:14:10", "1.1", "Rp50.750", "Rp300", "Reversed by gateway", "Reversed"],
  ["SYS-260602-8833", "Mitras", "Toplink", "DANA50", "08123450009", "17:13:52", "0.8", "Rp50.120", "Rp240", "OK", "Success"],
  ["SYS-260602-8832", "ESA", "SMB", "OVO25", "08123450010", "17:13:30", "0.9", "Rp25.110", "Rp160", "OK", "Success"],
];

const initialMonitorTraffic = [
  { client: "BK PAY", today: 1820, yesterday: 1540, lastTick: 0 },
  { client: "Telin", today: 1322, yesterday: 1491, lastTick: 0 },
  { client: "SMB", today: 1110, yesterday: 980, lastTick: 0 },
  { client: "Quantum", today: 902, yesterday: 860, lastTick: 0 },
  { client: "Toplink", today: 760, yesterday: 710, lastTick: 0 },
  { client: "Redigame", today: 690, yesterday: 640, lastTick: 0 },
  { client: "HIGO", today: 410, yesterday: 455, lastTick: 0 },
  { client: "Mitras", today: 385, yesterday: 360, lastTick: 0 },
  { client: "ESA", today: 240, yesterday: 315, lastTick: 0 },
];

const initialMonitorBalance = [
  ["WARN", "Toplink", "Gateway", "80.4M", "100M", "warn"],
  ["CRIT", "Telin", "Gateway", "96.3M", "150M", "critical"],
  ["WARN", "Kisel ApiHub", "Gateway", "42.8M", "60M", "warn"],
  ["WARN", "Bukalapak", "Client", "58.2M", "80M", "warn"],
  ["CRIT", "Dana", "Client", "27.5M", "50M", "critical"],
  ["WARN", "ShopeePay", "Client", "45.5M", "65M", "warn"],
  ["WARN", "Indotel", "Gateway", "88.5M", "100M", "warn"],
];

const initialMonitorAlerts = {
  stop: [
    ["Telin", "S100", "Stop transaksi mendadak", "17:02"],
    ["BK PAY", "DANAOPEN", "Callback terlambat", "17:11"],
    ["SMB", "PLN20", "Spike reversal", "17:14"],
    ["Bukalapak", "S50", "No new traffic 32 minutes", "17:16"],
    ["Tokopedia", "DANAKH", "Traffic dropped to 0", "17:18"],
    ["ShopeePay", "PLN", "No request after normal pattern", "17:19"],
    ["Dana", "TSEL50", "Traffic stopped on prepaid route", "17:21"],
    ["Blibli", "I10", "No callback traffic after inquiry spike", "17:22"],
    ["Traveloka", "iPLN", "No payment request after inquiry traffic", "17:23"],
    ["Fastpay", "S25", "Monitoring detected idle route", "17:24"],
  ],
  product: [
    ["critical", "iPLN / VSI", "Supplier callback: product close", "17:08"],
    ["warn", "DANAKH / SMB", "RC 68 exceeded threshold", "17:13"],
    ["critical", "S50 / Kisel ApiHub", "Supplier maintenance callback", "17:15"],
    ["warn", "I10 / Indotel", "RC 91 crossed route threshold", "17:17"],
    ["warn", "PLN / VSI", "RC 96 repeated on inquiry", "17:20"],
    ["critical", "DANA50 / SMB", "Callback product unavailable", "17:22"],
    ["warn", "OVO25 / Bima Sakti", "RC 91 crossed route threshold", "17:24"],
  ],
  rugi: [
    ["SYS-260602-8834", "HIGO", "GMS50", "Rp300", "17:14"],
    ["SYS-260602-8828", "BK PAY", "DANAKH", "Rp1.200", "17:16"],
    ["SYS-260602-8819", "Bukalapak", "S50", "Rp350", "17:18"],
    ["SYS-260602-8808", "Dana", "I10", "Rp275", "17:20"],
    ["SYS-260602-8798", "Traveloka", "iPLN", "Rp650", "17:22"],
    ["SYS-260602-8786", "Fastpay", "S25", "Rp425", "17:24"],
  ],
};

const alertPools = {
  stop: [
    ["Traveloka", "iPLN", "No payment request after inquiry traffic"],
    ["Blibli", "PLN", "Callback traffic stopped"],
    ["MitraPay", "I10", "No request received after busy route"],
    ["Fastpay", "S25", "Monitoring detected idle route"],
    ["OVO", "DANAKH", "Traffic dropped below normal"],
  ],
  product: [
    ["critical", "DANA50 / SMB", "Callback product unavailable"],
    ["warn", "OVO25 / Bima Sakti", "RC 91 crossed route threshold"],
    ["critical", "PLNPOST / VSI", "Inquiry route timeout spike"],
    ["warn", "BPJSKES / Indotel", "RC 96 repeated in payment route"],
  ],
  rugi: [
    ["SYS-260602-8798", "Traveloka", "iPLN", "Rp650"],
    ["SYS-260602-8786", "Fastpay", "S25", "Rp425"],
    ["SYS-260602-8772", "MitraPay", "PLN", "Rp900"],
    ["SYS-260602-8763", "Blibli", "TSEL50", "Rp700"],
  ],
};

function monitorTime(offsetMinutes = 0) {
  const date = new Date(Date.now() - offsetMinutes * 60 * 1000);
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function FilterCombo({ label, placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="filter-group">
      <div className="filter-label">{label}</div>
      <div className={`filter-combo ${open ? "open" : ""}`} data-placeholder={placeholder}>
        <input type="hidden" value={value} readOnly />
        <button className="filter-input filter-combo-toggle" type="button" onClick={() => setOpen((current) => !current)}>
          <span>{value || placeholder}</span>
        </button>
        <div className="filter-combo-menu">
          <input className="filter-combo-search" type="search" placeholder={`Search ${label.toLowerCase()}...`} value={query} onChange={(event) => setQuery(event.target.value)} />
          <div className="filter-combo-options">
            <button
              className={`filter-combo-option ${value ? "" : "active"}`}
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
                setQuery("");
              }}
            >
              {placeholder}
            </button>
            {filtered.map((option) => (
              <button
                className={`filter-combo-option ${value === option ? "active" : ""}`}
                type="button"
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  setQuery("");
                }}
              >
                {option}
              </button>
            ))}
            {!filtered.length && <div className="filter-combo-empty">No results</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentTransactionPage() {
  const [filters, setFilters] = useState({ account: "", gateway: "", provider: "", status: "", clientId: "", supplierId: "", product: "" });
  const [activeAlert, setActiveAlert] = useState("stop");
  const [trafficRows, setTrafficRows] = useState(initialMonitorTraffic);
  const [balanceRows, setBalanceRows] = useState(initialMonitorBalance);
  const [alertRows, setAlertRows] = useState(initialMonitorAlerts);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficRows((current) => {
        const activeIndex = Math.floor(Math.random() * current.length);
        return current.map((row, index) => {
          const tick = index === activeIndex ? Math.floor(Math.random() * 34) + 4 : Math.random() > 0.74 ? Math.floor(Math.random() * 9) + 1 : 0;
          return { ...row, today: row.today + tick, lastTick: tick };
        });
      });
    }, 2200);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setBalanceRows((current) => current.map((row, index) => {
        const value = Number.parseFloat(row[3]);
        const nextValue = Math.max(12, value - (index % 3 === 0 ? Math.random() * 0.9 : Math.random() * 0.25));
        const threshold = Number.parseFloat(row[4]);
        const level = nextValue <= threshold * 0.55 ? "critical" : "warn";
        return [level === "critical" ? "CRIT" : "WARN", row[1], row[2], `${nextValue.toFixed(1)}M`, row[4], level];
      }));
      setAlertRows((current) => {
        const stop = alertPools.stop[Math.floor(Math.random() * alertPools.stop.length)];
        const product = alertPools.product[Math.floor(Math.random() * alertPools.product.length)];
        const rugi = alertPools.rugi[Math.floor(Math.random() * alertPools.rugi.length)];
        return {
          stop: [[stop[0], stop[1], stop[2], monitorTime(Math.floor(Math.random() * 12) + 1)], ...current.stop].slice(0, 8),
          product: [[product[0], product[1], product[2], monitorTime(Math.floor(Math.random() * 12) + 1)], ...current.product].slice(0, 8),
          rugi: [[rugi[0], rugi[1], rugi[2], rugi[3], monitorTime(Math.floor(Math.random() * 12) + 1)], ...current.rugi].slice(0, 8),
        };
      });
    }, 7000);
    return () => clearInterval(timer);
  }, []);
  const criticalAlertCount = alertRows.stop.length + alertRows.product.filter((row) => row[0] === "critical").length + balanceRows.filter((row) => row[5] === "critical").length;
  const warnAlertCount = alertRows.rugi.length + alertRows.product.filter((row) => row[0] === "warn").length + balanceRows.filter((row) => row[5] === "warn").length;
  const pendingCount = monitorRows.filter((row) => row[10] === "Pending").length;
  const rows = monitorRows.filter((row) => {
    if (filters.account && row[1] !== filters.account) return false;
    if (filters.gateway && row[2] !== filters.gateway) return false;
    if (filters.status && row[10] !== filters.status) return false;
    if (filters.product && !row[3].toLowerCase().includes(filters.product.toLowerCase())) return false;
    if (filters.clientId && !row[0].toLowerCase().includes(filters.clientId.toLowerCase())) return false;
    if (filters.supplierId && !`${row[2]}-${row[3]}`.toLowerCase().includes(filters.supplierId.toLowerCase())) return false;
    return true;
  });
  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters({ account: "", gateway: "", provider: "", status: "", clientId: "", supplierId: "", product: "" });

  return (
    <div className="content current-monitor">
      <div className="filter-bar fade-in fixed-elem">
        <div className="filter-group"><div className="filter-label">Start Date</div><input className="filter-input date-input" type="datetime-local" defaultValue="2026-05-15T00:00" /></div>
        <div className="filter-group"><div className="filter-label">End Date</div><input className="filter-input date-input" type="datetime-local" defaultValue="2026-05-15T23:59" /></div>
        <FilterCombo label="Account" placeholder="All Accounts" options={["BK PAY", "ESA", "HIGO", "Mitras", "Quantum", "Redigame", "SMB", "Telin", "Toplink"]} value={filters.account} onChange={(value) => setFilter("account", value)} />
        <div className="filter-group"><div className="filter-label">Client ID</div><input className="filter-input search-input" type="search" placeholder="Search client ID" value={filters.clientId} onChange={(event) => setFilter("clientId", event.target.value)} /></div>
        <FilterCombo label="Gateway" placeholder="All Gateways" options={["Aviana", "Bima Sakti", "Indotel", "PlusLink", "SMB", "Telin", "Toplink"]} value={filters.gateway} onChange={(value) => setFilter("gateway", value)} />
        <div className="filter-group"><div className="filter-label">Supplier ID</div><input className="filter-input search-input" type="search" placeholder="Search supplier ID" value={filters.supplierId} onChange={(event) => setFilter("supplierId", event.target.value)} /></div>
        <FilterCombo label="Provider" placeholder="All Providers" options={["Bank", "E-Wallet", "Games", "PDAM", "PLN", "TELCO"]} value={filters.provider} onChange={(value) => setFilter("provider", value)} />
        <div className="filter-group"><div className="filter-label">Product/Service</div><input className="filter-input search-input" type="search" placeholder="Search product" value={filters.product} onChange={(event) => setFilter("product", event.target.value)} /></div>
        <FilterCombo label="Status" placeholder="All Statuses" options={["Pending", "Success", "Rejected", "Reversed"]} value={filters.status} onChange={(value) => setFilter("status", value)} />
        <div className="filter-actions">
          <button className="btn btn-primary" type="button">Search</button>
          <button className="btn btn-ghost" type="button" onClick={resetFilters}>Reset</button>
        </div>
      </div>

      <div className="stats-row fixed-elem">
        <div className="stat-card total fade-in"><div className="stat-label">Total Transactions</div><div className="stat-value total">7,615</div><div className="stat-pct">Today</div></div>
        <div className="stat-card success fade-in"><div className="stat-label">Success</div><div className="stat-value success">6,755</div><div className="stat-pct">88.7%</div></div>
        <button className={`stat-card pending fade-in stat-card-button ${filters.status === "Pending" ? "pending-filter-active" : ""}`} type="button" onClick={() => setFilter("status", "Pending")}><div className="stat-label">Pending</div><div className="stat-value pending">{pendingCount}</div><div className="stat-pct">0.03%</div></button>
        <div className="stat-card reversed fade-in"><div className="stat-label">Reversed</div><div className="stat-value reversed">858</div><div className="stat-pct">11.3%</div></div>
        <div className="stat-card revenue fade-in"><div className="stat-label">Revenue</div><div className="stat-value revenue">Rp5.69B</div><div className="stat-pct">Today</div></div>
        <div className="stat-card margin fade-in"><div className="stat-label">Margin</div><div className="stat-value margin">Rp9.96M</div><div className="stat-pct">Today</div></div>
      </div>

      <div className="dashboard-main-grid">
        <div className="grid-left">
          <div className="top-charts-row fixed-elem">
            <div className="card chart-card-hourly fade-in">
              <div className="card-header">
                <div className="card-title">Volume Per Hour</div>
                <div className="chart-time-range">05:00 - 11:19</div>
              </div>
              <div className="chart-body">
                <DashboardChart
                  type="line"
                  labels={["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "11:19"]}
                  datasets={[
                    { label: "Today", data: [420, 510, 780, 690, 980, 1200, 1100, 1350], borderColor: "#4f8cff", backgroundColor: "rgba(79,140,255,.08)", borderWidth: 2, tension: 0.4, fill: true, pointRadius: 2, pointHoverRadius: 5 },
                    { label: "Yesterday", data: [380, 450, 600, 880, 740, 990, 1050, 970], borderColor: "#555e78", borderDash: [4, 3], borderWidth: 1.5, tension: 0.4, fill: false, pointRadius: 2, pointHoverRadius: 4 },
                  ]}
                  options={{ interaction: { mode: "index", intersect: false } }}
                />
              </div>
            </div>

            <div className="card chart-card-donut fade-in">
              <div className="card-header">
                <div className="card-title">Status Breakdown</div>
              </div>
              <div className="chart-body donut-body">
                <DashboardChart
                  type="doughnut"
                  className="donut-wrap"
                  labels={["Success", "Reversed", "Pending", "Failed"]}
                  datasets={[{ data: [6755, 858, pendingCount, 0], backgroundColor: ["#22c55e", "#f97316", "#f59e0b", "#ef4444"], borderWidth: 0 }]}
                  options={{ cutout: "72%", layout: { padding: 6 }, plugins: { legend: { display: false }, tooltip: { backgroundColor: "#13161e" } } }}
                />
              </div>
            </div>
          </div>

          <div className="card fade-in flex-fill trx-card">
            <div className="card-header fixed-elem">
              <div className="card-title">Transaction List</div>
              <span id="trx-card-summary">{filters.status ? rows.length.toLocaleString("id-ID") : "7,615"} rows - Page <b>1</b></span>
            </div>
            <div className="table-wrap scrollable flex-fill trx-scroll">
              <table className="trx-table">
                <thead><tr><th>#</th><th>Sys TRX ID</th><th>Client</th><th>Supplier</th><th>Product</th><th>Destination</th><th>Request Time</th><th>Time (s)</th><th>Price</th><th>Margin</th><th>Reason</th><th>Status</th></tr></thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row[0]} className={row[10] === "Pending" ? "trx-row-pending" : ""}>
                      <td>{index + 1}</td>
                      <td><button className="trx-id trx-id-btn" type="button">{row[0]}</button></td>
                      <td><span className="client-tag">{row[1]}</span></td>
                      <td><span className="sup-badge">[{row[2]}]</span></td>
                      <td className="mono-sm">{row[3]}</td>
                      <td className="mono-sm">{row[4]}</td>
                      <td className="request-time">{row[5]}</td>
                      <td className={`duration-time ${Number(row[6]) > 1 ? "slow" : ""}`}>{row[6]}</td>
                      <td className="price-text">{row[7]}</td>
                      <td className="margin-text">{row[8]}</td>
                      <td><span className="reason-text">{row[9]}</span></td>
                      <td><span className={`status-pill ${row[10].toLowerCase()}`}>{row[10]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination fixed-elem">
              <div className="page-info">
                <span>Showing <b>1-{rows.length}</b> of <b>{filters.status ? rows.length : "7,615"}</b> transactions</span>
                <label className="page-size-control">Rows
                  <select defaultValue="10">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>
              <div className="page-btns"><button className="page-btn active" type="button">1</button><button className="page-btn" type="button">2</button><button className="page-btn" type="button">3</button></div>
            </div>
          </div>
        </div>

        <div className="grid-right">
          <div className="card fade-in fixed-elem">
            <div className="card-header"><div className="card-title">Traffic Per Client</div><span className="card-kicker">vs same time yesterday</span></div>
            <div className="table-wrap traffic-scroll">
              <table className="traffic-table">
                <thead><tr><th>Client</th><th>Today</th><th>Yesterday</th><th>Delta</th><th>Bar</th></tr></thead>
                <tbody>
                  {trafficRows.map((row) => {
                    const delta = row.today - row.yesterday;
                    const dir = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
                    const barWidth = Math.min(100, Math.max(10, Math.round((row.today / 1900) * 100)));
                    return (
                    <tr key={row.client} className={row.lastTick ? "traffic-pulse" : ""}>
                      <td>
                        <span className="traffic-client">
                          <span className={`live-dot ${row.lastTick ? "hot" : dir === "down" ? "drop" : "hot"}`} />
                          {row.client}
                          {row.lastTick > 0 && <span className="traffic-tick hot">+{row.lastTick.toLocaleString("id-ID")}</span>}
                        </span>
                      </td>
                      <td>{row.today.toLocaleString("id-ID")}</td>
                      <td>{row.yesterday.toLocaleString("id-ID")}</td>
                      <td><span className={`delta ${dir}`}>{delta > 0 ? "+" : ""}{delta.toLocaleString("id-ID")}</span></td>
                      <td><div className="mini-bar"><span className="mini-bar-fill" style={{ width: `${barWidth}%`, background: dir === "down" ? "var(--danger)" : "var(--success)" }} /></div></td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card fade-in fixed-elem balance-card">
            <div className="card-header"><div className="card-title">Balance Monitor</div><span className="alert-count-badge warn">{balanceRows.length} low</span></div>
            <div className="table-wrap balance-scroll">
              <table className="alert-table balance-table">
                <thead><tr><th>Level</th><th>Account</th><th>Type</th><th>Balance</th><th>Threshold</th></tr></thead>
                <tbody>
                  {balanceRows.map((row) => (
                    <tr key={row[1]}>
                      <td><span className={`alert-badge ${row[5]}`}>{row[0]}</span></td>
                      <td><span className="balance-account">{row[1]}</span></td>
                      <td>{row[2]}</td>
                      <td><span className={`balance-val ${row[5]}`}>{row[3]}</span></td>
                      <td>{row[4]}<div className="balance-meter"><span className={`balance-meter-fill ${row[5]}`} style={{ width: row[5] === "critical" ? "64%" : "80%" }} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card fade-in flex-fill alert-monitor-card">
            <div className="card-header fixed-elem alert-header">
              <div className="alert-header-top">
                <div className="card-title">Alert Monitor</div>
                <div style={{ display: "flex", gap: 5 }}><span className="alert-count-badge danger">{criticalAlertCount} critical</span><span className="alert-count-badge warn">{warnAlertCount} warn</span></div>
              </div>
              <div className="alert-tabs">
                <button className={`alert-tab ${activeAlert === "stop" ? "active" : ""}`} type="button" onClick={() => setActiveAlert("stop")}>Client Info <span className="tab-badge" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>{alertRows.stop.length}</span></button>
                <button className={`alert-tab ${activeAlert === "product" ? "active" : ""}`} type="button" onClick={() => setActiveAlert("product")}>Incidents <span className="tab-badge" style={{ background: "var(--warn-bg)", color: "var(--warn)" }}>{alertRows.product.length}</span></button>
                <button className={`alert-tab ${activeAlert === "rugi" ? "active" : ""}`} type="button" onClick={() => setActiveAlert("rugi")}>Loss Trx <span className="tab-badge" style={{ background: "var(--pending-bg)", color: "var(--pending)" }}>{alertRows.rugi.length}</span></button>
              </div>
            </div>
            <div className={`alert-panel ${activeAlert === "stop" ? "active" : ""} scrollable flex-fill alert-scroll`}>
              <table className="alert-table">
                <thead><tr><th>Client</th><th>Product</th><th>Detail</th><th>Since</th></tr></thead>
                <tbody>
                  {alertRows.stop.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <div className={`alert-panel ${activeAlert === "product" ? "active" : ""} scrollable flex-fill alert-scroll`}>
              <table className="alert-table">
                <thead><tr><th>Level</th><th>Product / Supplier</th><th>Description</th><th>Time</th></tr></thead>
                <tbody>
                  {alertRows.product.map((row) => (
                    <tr key={row.join("-")}><td><span className={`alert-badge ${row[0]}`}>{row[0]}</span></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`alert-panel ${activeAlert === "rugi" ? "active" : ""} scrollable flex-fill alert-scroll`}>
              <table className="alert-table">
                <thead><tr><th>TRX ID</th><th>Client</th><th>Product</th><th>Loss</th><th>Time</th></tr></thead>
                <tbody>
                  {alertRows.rugi.map((row) => (
                    <tr key={row[0]}><td className="mono-sm">{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td><span className="rugi-val">{row[3]}</span></td><td>{row[4]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalPage({ title, screenshot }) {
  return (
    <div className="content module-page">
      <Hero screenshot={screenshot} title={title} subtitle="Server resource, disk usage, and running gateway process snapshot." />
      <pre className="terminal-panel">{`17:21:01 up 113 days, 53 min, load average: 0.03, 0.06, 0.02

Mem: 3.6Gi total  2.1Gi used  1.5Gi available
Disk /data: 100G total  35G used  60G available

PID     %CPU  %MEM  COMMAND
224695  0.0   0.2   target/release/gw-bukalapak-token
224724  0.0   0.1   target/release/gw-bukalapak-trx-pulsa
325104  0.0   0.1   target/release/gw-smb
325927  0.0   0.3   target/release/gw-bimasakti`}</pre>
    </div>
  );
}

function ChangePasswordPage() {
  return (
    <div className="content module-page">
      <Hero screenshot={3} title="Administrator / Change My Password" subtitle="Update credential admin secara ringkas." />
      <form className="form-panel">
        <label>Username<input defaultValue="Dito" /></label>
        <label>Password<input type="password" /></label>
        <label>Confirm Password<input type="password" /></label>
        <button className="btn btn-primary" type="button">Update</button>
      </form>
    </div>
  );
}

function ModulePage({ view }) {
  if (view === "current-transaction") return <LegacyMonitoringPage />;
  if (view === "admin-change-password") return <ChangePasswordPage />;
  const module = moduleTables[view];
  if (!module) return <ReportPage mode="hourly" />;
  if (module.terminal) return <TerminalPage title={module.title} screenshot={module.screenshot} />;

  const fieldMap = view.includes("product") ? ["provider", "category", "serviceCode"] : view.includes("gateway") ? ["gateway", "provider"] : view.includes("member") ? ["account", "status"] : ["account", "serviceCode"];

  return (
    <div className="content module-page">
      <Hero screenshot={module.screenshot} title={module.title} subtitle="Tampilan dibuat dari komponen React, bukan copy HTML per halaman." />
      <FilterPanel fields={fieldMap} />
      <DataTable columns={module.columns} rows={module.rows} />
    </div>
  );
}

function LegacyMonitoringPage() {
  return (
    <iframe
      className="legacy-monitor-frame"
      src="./monitoring/embed.html?v=react-sidebar"
      title="Current Transaction Monitoring"
    />
  );
}

function ReportPage({ mode }) {
  const data = reportSeries[mode];
  const labels = data.map((item) => item.label);
  const tableRows = data.slice().reverse().map((item) => [
    item.label,
    item.success.toLocaleString("id-ID"),
    `${((item.success / (item.success + item.reversed)) * 100).toFixed(2)}%`,
    item.reversed.toLocaleString("id-ID"),
    money(item.revenue),
    money(item.revenue - item.margin),
    money(item.margin),
  ]);

  return (
    <div className="content module-page">
      <Hero screenshot={mode === "monthly" ? 1 : mode === "daily" ? 2 : 3} title={`${mode[0].toUpperCase()}${mode.slice(1)} Report`} subtitle="Revenue, cost, margin, dan traffic status dalam layout report yang lebih modern." />
      <FilterPanel fields={mode === "monthly" ? ["account", "gateway", "serviceCode"] : ["account", "gateway", "serviceCode"]} />
      <div className="chart-grid">
        <SimpleChart
          type="line"
          labels={labels}
          datasets={[
            { label: "Revenue", data: data.map((item) => item.revenue), borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,.1)", tension: 0.35 },
            { label: "Margin", data: data.map((item) => item.margin), borderColor: "#2f80ed", backgroundColor: "rgba(47,128,237,.12)", tension: 0.35 },
          ]}
          height={380}
        />
        <SimpleChart
          type="bar"
          labels={labels}
          datasets={[
            { label: "Success", data: data.map((item) => item.success), backgroundColor: "#63b967" },
            { label: "Reversed", data: data.map((item) => item.reversed), backgroundColor: "#8b5e4f" },
          ]}
          height={380}
        />
      </div>
      <DataTable columns={[mode === "hourly" ? "Hour" : mode === "daily" ? "Date" : "Month", "Success", "Success Rate", "Reversed", "Revenue", "Cost", "Margin"]} rows={tableRows} />
    </div>
  );
}

export default function App() {
  const [route, navigate] = useHashRoute();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const activeView = routeToView[route] || "current-transaction";
  const meta = viewMeta[activeView] || viewMeta["current-transaction"];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const page = useMemo(() => {
    if (activeView.startsWith("report-")) return <ReportPage mode={activeView.replace("report-", "")} />;
    return <ModulePage view={activeView} />;
  }, [activeView]);

  return (
    <div className={`layout ${sidebarHidden ? "sidebar-hidden" : ""}`}>
      <Sidebar activeView={activeView} onNavigate={navigate} collapsed={sidebarHidden} />
      <main className="main">
        <Topbar title={activeView === "current-transaction" ? "Transaction / List" : meta.label} onToggleSidebar={() => setSidebarHidden((value) => !value)} onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} theme={theme} />
        {page}
      </main>
    </div>
  );
}
