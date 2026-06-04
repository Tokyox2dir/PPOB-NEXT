import {
  Activity,
  Ban,
  Calendar,
  Clock,
  Gauge,
  Grid2X2,
  KeyRound,
  List,
  Network,
  PanelTop,
  Route,
  Server,
  Shield,
  ShieldCheck,
  Store,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

export const menuSections = [
  {
    label: "Business",
    items: [
      { id: "business-overview", label: "Business Overview", path: "/business/overview", icon: Gauge },
    ],
  },
  {
    label: "Transaction",
    items: [
      { id: "current-transaction", label: "Current Transaction", path: "/transactions/current", icon: Grid2X2 },
      { id: "rejected-transaction", label: "Rejected Transaction", path: "/transactions/rejected", icon: Ban },
      { id: "transaction-route", label: "Transaction Route", path: "/transactions/route", icon: Route },
      { id: "transaction-per-minute", label: "Transaction Per Minute", path: "/transactions/per-minute", icon: Clock },
    ],
  },
  {
    label: "Products",
    items: [
      { id: "product-list", label: "Product List", path: "/products/list", icon: Store },
      { id: "product-route", label: "Product Route", path: "/products/route", icon: Route },
      { id: "check-price", label: "Check Price", path: "/products/check-price", icon: PanelTop },
    ],
  },
  {
    label: "Gateway",
    items: [
      { id: "gateway-list", label: "Gateway List", path: "/gateway/list", icon: Network },
      { id: "process-list", label: "Process List", path: "/gateway/process", icon: TrendingUp },
    ],
  },
  {
    label: "Member",
    items: [
      { id: "member-list", label: "Member List", path: "/member/list", icon: UserPlus },
      { id: "member-virtual", label: "Member Virtual", path: "/member/virtual", icon: WalletCards },
    ],
  },
  {
    label: "Admin Settings",
    items: [
      { id: "admin-administrators", label: "Administrator", path: "/admin/administrators", icon: ShieldCheck },
      { id: "admin-access-log", label: "Access Log", path: "/admin/access-log", icon: Activity },
      { id: "admin-change-password", label: "Change My Password", path: "/admin/change-password", icon: KeyRound },
      { id: "admin-list-pages", label: "List Pages", path: "/admin/pages", icon: List },
      { id: "admin-list-role", label: "List Role", path: "/admin/roles", icon: Shield },
    ],
  },
  {
    label: "Report",
    items: [
      { id: "report-monthly", label: "Monthly Report", path: "/reports/monthly", icon: Calendar, card: true },
      { id: "report-daily", label: "Daily Report", path: "/reports/daily", icon: Calendar, card: true },
      { id: "report-hourly", label: "Hourly Report", path: "/reports/hourly", icon: Clock, card: true },
    ],
  },
];

export const routeToView = Object.fromEntries(
  menuSections.flatMap((section) => section.items.map((item) => [item.path, item.id]))
);

export const viewMeta = Object.fromEntries(
  menuSections.flatMap((section) => section.items.map((item) => [item.id, { ...item, section: section.label }]))
);

export const filterOptions = {
  account: ["BK PAY", "Telin", "SMB", "Quantum", "Toplink", "Redigame"],
  gateway: ["SMB", "Bima Sakti", "Indotel", "Toplink", "PlusLink", "Aviana Market"],
  provider: ["PDAM", "TELCO", "PLN", "Games", "Bank"],
  category: ["Air", "Pulsa", "Data", "Games", "E-Wallet"],
  serviceCode: ["S100", "S1000", "DANAKH", "GPYKH", "ATF100", "KABBANDUNG"],
  status: ["Pending", "Success", "Rejected", "Reversed"],
};

export const transactions = [
  ["02-06-2026 17:18:03", "BK PAY", "RX928812", "Success", "S100", "08123450001", "Rp96.300"],
  ["02-06-2026 17:17:41", "Telin", "RX928811", "Pending", "S1000", "08123450002", "Rp990.410"],
  ["02-06-2026 17:17:09", "SMB", "RX928810", "Rejected", "DANAKH", "08123450003", "-"],
  ["02-06-2026 17:16:22", "Quantum", "RX928809", "Success", "GPYKH", "08123450004", "Rp12.450"],
  ["02-06-2026 17:15:55", "Toplink", "RX928808", "Pending", "S100", "08123450005", "Rp98.525"],
  ["02-06-2026 17:15:02", "Redigame", "RX928807", "Success", "ATF100", "08123450006", "Rp75.000"],
];

export const moduleTables = {
  "rejected-transaction": {
    title: "Trash",
    screenshot: 1,
    columns: ["Time Stamp", "Username", "RefId", "Info", "Code", "Destination", "Status", "Value"],
    rows: [
      ["02-06-2026 17:11:05", "Telin", "0", "service code invalid", "-", "-", "Rejected", "-"],
      ["02-06-2026 17:10:48", "Telin", "0", "service code invalid", "-", "-", "Rejected", "-"],
      ["02-06-2026 17:07:16", "Telin", "0", "service code invalid", "-", "-", "Rejected", "-"],
    ],
  },
  "transaction-route": {
    title: "Transaction / Route",
    screenshot: 2,
    columns: ["Gateway", "Code", "Gateway Code", "Counts", "Success", "Reversed"],
    rows: [["SMB", "BIFASTOPEN", "BIFASTOPEN", "184", "165 / 89.67%", "19 / 10.33%"], ["SMB", "DANAKH", "DANAOPEN", "8728", "8424 / 96.52%", "304 / 3.48%"]],
  },
  "product-list": {
    title: "Service / List",
    screenshot: 4,
    columns: ["Category", "Code", "Description", "Denom", "Type", "Provider", "Active", "Last Update", "By"],
    rows: [["Air", "KABKUPANG", "NTT Kab Kupang", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025", "Iqbal"], ["Air", "KABKENDAL", "Jawa Tengah Kab Kendal", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025", "Iqbal"]],
  },
  "product-route": {
    title: "Service / Route List",
    screenshot: 5,
    columns: ["Account", "Code", "Gateway"],
    rows: [["Bumdes,esa,Telin", "AETRAJAKARTA", "Bima Sakti"], ["", "ATF10", "SMB"], ["", "ATF100", "SMB"]],
  },
  "check-price": {
    title: "Service / Check Price",
    screenshot: 6,
    columns: ["Name", "Code", "Gateway Code", "Price", "Last Update", "By", "Available", "Action"],
    rows: [["Telin", "S100", "7379", "Rp96.300", "13-Jan 2026", "Fahri", "FALSE", "Edit"], ["Indotel", "S100", "S100", "Rp96.890", "29-May 2026", "H2H", "TRUE", "Edit"]],
  },
  "gateway-list": {
    title: "Gateway / List",
    screenshot: 7,
    columns: ["Name", "Url", "Active", "Balance", "H2H Balance", "Last Update", "By"],
    rows: [["Teratai", "https://terataiapi.socx.app/reseller/api/v1/http/purchase", "TRUE", "60.659.586", "60.760.812", "05-05-2026", "Dito"], ["SMB", "http://49.0.203.84:8081/api/h2h", "TRUE", "1.651.644.186", "1.887.317.001", "15-05-2026", "Iky"]],
  },
  "process-list": {
    title: "Gateway / Process List",
    screenshot: 8,
    terminal: true,
  },
  "member-list": {
    title: "Account / List",
    screenshot: 9,
    columns: ["Customer Name", "Username", "ID", "IP Addresses", "Balance", "Last Update", "By"],
    rows: [["BK PAY", "bkpay", "44", "8.219.251.167, 47.237.143.194", "1.466.244.248", "30-05-2026", "Iky"], ["HIGO", "neoparty", "43", "110.239.84.200", "58.538.561", "25-05-2026", "Dito"]],
  },
  "member-virtual": {
    title: "Bank Virtual Accounts",
    screenshot: 10,
    columns: ["Created At", "Username", "ID", "PG Ref", "Bank", "VA Number", "Paid At", "Status", "Add Balance"],
    rows: [["01-06-2026 22:01:54", "quantum", "308", "019e83b4-a565", "Bank Central Asia", "111316394107285", "01-06-2026 22:03:56", "Success", "100.000.000"]],
  },
  "admin-administrators": {
    title: "Administrator / List",
    screenshot: 1,
    columns: ["Name", "Role", "Last Update", "Active", "By", "Action"],
    rows: [["dwi", "Super Admin", "08-Apr 2026 15:33:04", "TRUE", "Fahri", "Edit"], ["sarche", "Super Admin", "01-Oct 2025 22:57:24", "FALSE", "catherine", "Edit"]],
  },
  "admin-access-log": {
    title: "Administrator / Log",
    screenshot: 2,
    columns: ["Datetime", "Admin", "Path"],
    rows: [["02-06-2026 18:37:04", "Dito", "/admin/log/?date=2026-06-02"], ["02-06-2026 18:36:37", "Dito", "/admin/list?msg=&status=false"]],
  },
  "admin-list-pages": {
    title: "Page / List",
    screenshot: 4,
    columns: ["Name", "Last Update", "By", "Links"],
    rows: [["account/add", "13-Oct 2025 09:45:31", "Fahri", "Edit"], ["admin/log", "13-Oct 2025 10:18:46", "Fahri", "Edit"]],
  },
  "admin-list-role": {
    title: "Role / List",
    screenshot: 5,
    columns: ["Name", "Last Update", "By", "Action"],
    rows: [["Sales", "14-Oct 2025 11:04:39", "Fahri", "Edit"], ["Admin", "14-Oct 2025 10:58:29", "Fahri", "Edit"], ["Super Admin", "02-Jul 2025 17:42:45", "Fahri", "Edit"]],
  },
};

export const reportSeries = {
  monthly: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"].map((label, i) => ({
    label,
    success: [64196, 57096, 101330, 317588, 407501, 39768][i],
    reversed: [6004, 3798, 8263, 18361, 18119, 2236][i],
    revenue: [3935164663, 4139342252, 8410002930, 36510952753, 54458456890, 5690756214][i],
    margin: [10655966, 5731244, 15736472, 62131432, 102032083, 9963099][i],
  })),
  daily: ["2026-06-01", "2026-06-02"].map((label, i) => ({
    label,
    success: [27139, 12647][i],
    reversed: [1543, 693][i],
    revenue: [3877406723, 1814622546][i],
    margin: [6756832, 3210369][i],
  })),
  hourly: Array.from({ length: 19 }, (_, hour) => {
    const success = [1678, 1374, 670, 62, 51, 101, 214, 204, 270, 889, 1158, 742, 623, 485, 569, 780, 780, 1044, 983][hour];
    const reversed = [288, 50, 29, 4, 2, 5, 3, 2, 7, 35, 39, 6, 20, 12, 21, 32, 30, 51, 55][hour];
    return { label: String(hour).padStart(2, "0"), success, reversed, revenue: success * 275000, margin: success * 221 };
  }),
};
