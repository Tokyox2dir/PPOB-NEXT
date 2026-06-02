import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { filterOptions, menuSections, moduleTables, reportSeries, routeToView, transactions, viewMeta } from "./data.js";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend);

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
        <button className="btn btn-warning" type="button" onClick={() => onStatus("Pending")}>
          Pending Only
        </button>
      )}
      <button className="btn btn-primary" type="button">OK</button>
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

function CurrentTransactionPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const rows = statusFilter ? transactions.filter((row) => row[3] === statusFilter) : transactions;
  const pendingCount = transactions.filter((row) => row[3] === "Pending").length;

  return (
    <div className="content dashboard-content">
      <Hero screenshot="Live" title="Current Transaction" subtitle="Monitoring transaksi real-time dengan filter status dan traffic." />
      <div className="metrics-grid">
        <StatCard label="Success" value="94.81%" tone="success" />
        <StatCard label="Pending" value={pendingCount} tone="warning" onClick={() => setStatusFilter("Pending")} />
        <StatCard label="Rejected" value="3" tone="danger" />
        <StatCard label="Traffic / min" value="1,956" />
      </div>
      <FilterPanel fields={["account", "gateway", "serviceCode", "status"]} onStatus={setStatusFilter} />
      {statusFilter && (
        <div className="status-banner">
          Menampilkan transaksi <strong>{statusFilter}</strong> saja.
          <button type="button" onClick={() => setStatusFilter("")}>Reset</button>
        </div>
      )}
      <div className="chart-grid">
        <SimpleChart
          type="line"
          labels={["17:12", "17:13", "17:14", "17:15", "17:16", "17:17", "17:18"]}
          datasets={[
            { label: "Traffic", data: [820, 1100, 980, 1450, 1760, 1920, 1956], borderColor: "#2f80ed", backgroundColor: "rgba(47,128,237,.12)", tension: 0.35 },
            { label: "Success Rate", data: [92, 94, 95, 91, 96, 94, 95], borderColor: "#00c853", backgroundColor: "rgba(0,200,83,.1)", tension: 0.35 },
          ]}
        />
        <SimpleChart
          type="bar"
          labels={["Pending", "Success", "Rejected", "Reversed"]}
          datasets={[{ label: "Status", data: [pendingCount, 42, 3, 5], backgroundColor: ["#fbbf24", "#22c55e", "#ef4444", "#8b5e4f"] }]}
        />
      </div>
      <DataTable columns={["Time Stamp", "Account", "RefId", "Status", "Code", "Destination", "Value"]} rows={rows} />
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
  if (view === "current-transaction") return <CurrentTransactionPage />;
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
        <Topbar title={meta.label} onToggleSidebar={() => setSidebarHidden((value) => !value)} onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} theme={theme} />
        {page}
      </main>
    </div>
  );
}
