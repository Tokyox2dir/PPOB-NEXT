setTimeout(() => {
  const firstRow = document.querySelector("#trx-tbody tr");
  if (firstRow) {
    firstRow.classList.add("flash");
    setTimeout(() => firstRow.classList.remove("flash"), 800);
  }
}, 100);

// Data
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
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
    reason: "Transaction successful",
    status: "Success",
  },
];

// Traffic data
const TRAFFIC = [
  { client: "bkpay", today: 3820, yesterday: 3210, normal30mTraffic: 42, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Hotelmurah", today: 1840, yesterday: 1990, normal30mTraffic: 28, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Bukalapak", today: 980, yesterday: 870, normal30mTraffic: 17, lastTrafficAt: Date.now() - 36 * 60 * 1000, lastTick: 0 },
  { client: "Telin", today: 620, yesterday: 720, normal30mTraffic: 9, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "correct", today: 355, yesterday: 280, normal30mTraffic: 6, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "ShopeePay", today: 890, yesterday: 920, normal30mTraffic: 18, lastTrafficAt: Date.now() - 42 * 60 * 1000, lastTick: 0 },
  { client: "Tokopedia", today: 760, yesterday: 710, normal30mTraffic: 16, lastTrafficAt: Date.now() - 33 * 60 * 1000, lastTick: 0 },
  { client: "Dana", today: 690, yesterday: 640, normal30mTraffic: 15, lastTrafficAt: Date.now() - 31 * 60 * 1000, lastTick: 0 },
  { client: "Blibli", today: 410, yesterday: 455, normal30mTraffic: 11, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Traveloka", today: 385, yesterday: 360, normal30mTraffic: 10, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "MitraPay", today: 240, yesterday: 315, normal30mTraffic: 8, lastTrafficAt: Date.now(), lastTick: 0 },
  { client: "Fastpay", today: 215, yesterday: 190, normal30mTraffic: 7, lastTrafficAt: Date.now(), lastTick: 0 },
];

const TOTAL_TRANSACTION_COUNT = 7615;
let currentPage = 1;
let pageSize = 10;
let latestSuccessRate = "88.7%";
const DEFAULT_FILTERS = {
  start: "2026-05-15T00:00",
  end: "2026-05-15T23:59",
  client: "",
  clientId: "",
  supplier: "",
  supplierId: "",
  provider: "",
  product: "",
  status: "",
};
let filterState = { ...DEFAULT_FILTERS };

const CLIENT_STOP_NORMAL_MIN = 15;
const CLIENT_STOP_IDLE_MS = 30 * 60 * 1000;
const CLIENT_INFO_DROP_NORMAL_MIN = 10;
const CLIENT_INFO_DROP_IDLE_MS = 10 * 60 * 1000;
const CLIENT_STOP_DEMO_INTERVAL_MS = 10 * 1000;
const CLIENT_STOP_DEMO_VISIBLE_MS = 5 * 1000;
const CLIENT_STOP_DEMO_MAX_ROWS = 30;
const ALERT_DEMO_INTERVAL_MS = 10 * 1000;
const ALERT_DEMO_VISIBLE_MS = 5 * 1000;
const INCIDENT_DEMO_MAX_ROWS = 30;
const LOSS_TRX_DEMO_MAX_ROWS = 30;
const STATUS_INCIDENT_THRESHOLD = 5;
const STATUS_INCIDENT_HOLD_MS = 5 * 60 * 1000;
const DEMO_PENDING_INTERVAL_MS = 5000;
const DEMO_PENDING_RESOLVE_MS = 5000;
const LIVE_PENDING = new Map();
const STATUS_INCIDENT_STATE = {
  Failed: { since: null, alerted: false },
  Processing: { since: null, alerted: false },
};
const REVENUE_STEP = 1000000;
const MARGIN_STEP = 50000;
let cumulativeRevenue = 0;
let cumulativeMargin = 0;

// Alert: client stop
const ALERTS_STOP = [
  { client: "Bukalapak [H2H IRS]", product: "S50", detail: "No new traffic for 32 minutes, normally 18 trx / 30 minutes", since: "18:31" },
  { client: "Tokopedia [API]", product: "DANAKH", detail: "No new traffic for 35 minutes, normally 16 trx / 30 minutes", since: "18:28" },
  { client: "ShopeePay [H2H]", product: "PLN", detail: "No new traffic for 41 minutes, normally 22 trx / 30 minutes", since: "18:22" },
  { client: "Dana [API]", product: "TSEL50", detail: "Traffic stopped on prepaid route", since: "18:18" },
  { client: "Blibli [H2H]", product: "I10", detail: "No callback traffic after inquiry spike", since: "18:12" },
  { client: "Traveloka [H2H]", product: "iPLN", detail: "No payment request after normal inquiry traffic", since: "18:08" },
];

const CLIENT_STOP_DEMO_POOL = [
  { client: "Bukalapak [H2H IRS]", product: "S50", normal30mTraffic: 18 },
  { client: "ShopeePay [H2H]", product: "PLN", normal30mTraffic: 22 },
  { client: "Tokopedia [API]", product: "DANAKH", normal30mTraffic: 16 },
  { client: "Dana [API]", product: "TSEL50", normal30mTraffic: 19 },
  { client: "MitraPay [API]", product: "I10", normal30mTraffic: 21 },
  { client: "Fastpay [H2H]", product: "S25", normal30mTraffic: 24 },
  { client: "Traveloka [H2H]", product: "iPLN", normal30mTraffic: 17 },
  { client: "Blibli [H2H]", product: "PLN", normal30mTraffic: 20 },
  { client: "LinkAja [API]", product: "DANAKH", normal30mTraffic: 25 },
  { client: "OVO [H2H]", product: "TSEL50", normal30mTraffic: 18 },
  { client: "GoPay [API]", product: "PLN", normal30mTraffic: 23 },
  { client: "MitraBukalapak [H2H]", product: "iBPJSTK", normal30mTraffic: 16 },
  { client: "Astrapay [API]", product: "DANAKH", normal30mTraffic: 20 },
  { client: "Doku [H2H]", product: "S50", normal30mTraffic: 26 },
  { client: "Kiosbank [H2H]", product: "iPLN", normal30mTraffic: 19 },
  { client: "Paytren [API]", product: "I10", normal30mTraffic: 17 },
  { client: "KasPro [H2H]", product: "PLN", normal30mTraffic: 22 },
  { client: "Sepulsa [API]", product: "TSEL50", normal30mTraffic: 24 },
  { client: "Flip [API]", product: "DANAKH", normal30mTraffic: 18 },
  { client: "Nicepay [H2H]", product: "S25", normal30mTraffic: 21 },
  { client: "Finnet [H2H]", product: "iBPJSTK", normal30mTraffic: 27 },
  { client: "MitraKios [API]", product: "iPLN", normal30mTraffic: 16 },
  { client: "OttoPay [H2H]", product: "PLN", normal30mTraffic: 23 },
  { client: "BillerOne [API]", product: "DANAKH", normal30mTraffic: 20 },
  { client: "Klikoo [H2H]", product: "TSEL50", normal30mTraffic: 18 },
  { client: "Payfazz [API]", product: "S50", normal30mTraffic: 25 },
  { client: "MitraTopup [H2H]", product: "I10", normal30mTraffic: 17 },
  { client: "PulsaHub [API]", product: "S25", normal30mTraffic: 22 },
  { client: "BillPay [H2H]", product: "PLN", normal30mTraffic: 24 },
  { client: "Nusapay [API]", product: "iPLN", normal30mTraffic: 19 },
];

// Alert: product incidents
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
    desc: "RC 68 exceeded IT threshold filter",
    time: "11:18",
  },
  { level: "critical", product: "S50 / [Kisel ApiHub]", desc: "Supplier callback: product close", time: "18:57" },
  { level: "warn", product: "I10 / [Indotel]", desc: "RC 91 exceeded IT threshold filter", time: "18:49" },
  { level: "warn", product: "PLN / [VSI]", desc: "RC 96 repeated on inquiry route", time: "18:41" },
  { level: "critical", product: "iBPJSTK / [Bima Sakti]", desc: "Supplier maintenance callback received", time: "18:33" },
  { level: "warn", product: "TSEL50 / [Kisel ApiHub]", desc: "RC 99 crossed product anomaly threshold", time: "18:26" },
];

const INCIDENT_DEMO_POOL = [
  { level: "critical", product: "iPLN / [VSI]", desc: "Supplier callback: product close" },
  { level: "warn", product: "DANAKH / [SMB]", desc: "RC 68 exceeded IT threshold filter" },
  { level: "critical", product: "S50 / [Kisel ApiHub]", desc: "Supplier callback: product close" },
  { level: "warn", product: "I10 / [Indotel]", desc: "RC 91 exceeded IT threshold filter" },
  { level: "warn", product: "PLN / [VSI]", desc: "RC 96 repeated on inquiry route" },
  { level: "critical", product: "iBPJSTK / [Bima Sakti]", desc: "Supplier maintenance callback received" },
  { level: "warn", product: "TSEL50 / [Kisel ApiHub]", desc: "RC 99 crossed product anomaly threshold" },
  { level: "critical", product: "S25 / [Indotel]", desc: "Supplier callback: product close" },
  { level: "warn", product: "TSEL100 / [SMB]", desc: "RC 68 repeated above monitoring threshold" },
  { level: "critical", product: "DANA50 / [SMB]", desc: "Callback product unavailable" },
  { level: "warn", product: "OVO25 / [Bima Sakti]", desc: "RC 91 crossed route threshold" },
  { level: "critical", product: "PLNPOST / [VSI]", desc: "Inquiry route timeout spike" },
  { level: "warn", product: "BPJSKES / [Indotel]", desc: "RC 96 repeated in payment route" },
  { level: "critical", product: "GOPAY / [Kisel ApiHub]", desc: "Supplier maintenance callback received" },
  { level: "warn", product: "LINKAJA / [SMB]", desc: "RC 99 crossed product anomaly threshold" },
  { level: "critical", product: "SHOPEEPAY / [VSI]", desc: "Product close callback received" },
  { level: "warn", product: "TELKOM / [Indotel]", desc: "RC 68 exceeded IT threshold filter" },
  { level: "critical", product: "PDAM / [Bima Sakti]", desc: "Supplier response timeout cluster" },
];

// Alert: loss transactions
const ALERTS_RUGI = [
  {
    id: "2445881",
    client: "bkpay [H2H]",
    product: "DANAKH",
    rugi: "Rp1.200",
    time: "11:08",
  },
  { id: "2455529", client: "Bukalapak [H2H IRS]", product: "S50", rugi: "Rp350", time: "19:03" },
  { id: "2455518", client: "Hotelmurah [H2H]", product: "PLN", rugi: "Rp850", time: "19:03" },
  { id: "2455488", client: "Tokopedia [API]", product: "TSEL50", rugi: "Rp500", time: "18:59" },
  { id: "2455462", client: "ShopeePay [H2H]", product: "DANAKH", rugi: "Rp1.450", time: "18:54" },
  { id: "2455410", client: "Dana [API]", product: "I10", rugi: "Rp275", time: "18:48" },
];

const LOSS_TRX_DEMO_POOL = [
  { client: "bkpay [H2H]", product: "DANAKH", rugi: 1200 },
  { client: "Bukalapak [H2H IRS]", product: "S50", rugi: 350 },
  { client: "Hotelmurah [H2H]", product: "PLN", rugi: 850 },
  { client: "Tokopedia [API]", product: "TSEL50", rugi: 500 },
  { client: "ShopeePay [H2H]", product: "DANAKH", rugi: 1450 },
  { client: "Dana [API]", product: "I10", rugi: 275 },
  { client: "Traveloka [H2H]", product: "iPLN", rugi: 650 },
  { client: "Fastpay [H2H]", product: "S25", rugi: 425 },
  { client: "MitraPay [API]", product: "PLN", rugi: 900 },
  { client: "Blibli [H2H]", product: "TSEL50", rugi: 700 },
  { client: "OVO [H2H]", product: "DANAKH", rugi: 1100 },
  { client: "GoPay [API]", product: "PLN", rugi: 575 },
  { client: "Astrapay [API]", product: "S50", rugi: 375 },
  { client: "Doku [H2H]", product: "I10", rugi: 250 },
  { client: "Finnet [H2H]", product: "iBPJSTK", rugi: 1600 },
  { client: "Payfazz [API]", product: "TSEL100", rugi: 800 },
  { client: "BillPay [H2H]", product: "PDAM", rugi: 950 },
  { client: "Nusapay [API]", product: "LINKAJA", rugi: 525 },
];

// Alert: low balance
const BALANCE_ACCOUNTS = [
  { name: "toplink", type: "Supplier", balance: 36870879, threshold: 50000000 },
  { name: "VSI", type: "Supplier", balance: 184500000, threshold: 100000000 },
  { name: "SMB", type: "Supplier", balance: 78200000, threshold: 100000000 },
  { name: "bkpay", type: "Client", balance: 126000000, threshold: 75000000 },
  { name: "Hotelmurah", type: "Client", balance: 42800000, threshold: 50000000 },
  { name: "Kisel ApiHub", type: "Supplier", balance: 21450000, threshold: 60000000 },
  { name: "Indotel", type: "Supplier", balance: 88500000, threshold: 100000000 },
  { name: "Bima Sakti", type: "Supplier", balance: 31750000, threshold: 75000000 },
  { name: "Bukalapak", type: "Client", balance: 58250000, threshold: 80000000 },
  { name: "ShopeePay", type: "Client", balance: 45500000, threshold: 65000000 },
  { name: "Tokopedia", type: "Client", balance: 93500000, threshold: 100000000 },
  { name: "Dana", type: "Client", balance: 27500000, threshold: 50000000 },
  { name: "Traveloka", type: "Client", balance: 120000000, threshold: 90000000 },
];

function createSeedTransactions() {
  return [
    { id: "2455541", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "081291997397", time: "19:04:20", dur: "0.083", price: "Rp30.400", margin: "Rp300", reason: "Transaction is being processed", status: "Pending" },
    { id: "2455538", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "142640042088", time: "19:04:15", dur: "0.530", price: "Rp0", margin: "Rp0", reason: "Bill already paid", status: "Reversed" },
    { id: "2455537", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "517300254552", time: "19:04:15", dur: "0.242", price: "Rp0", margin: "Rp0", reason: "Bill already paid", status: "Reversed" },
    { id: "2455536", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "082345716145", time: "19:04:14", dur: "0.079", price: "Rp100.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455535", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "083183330033", time: "19:04:11", dur: "0.083", price: "Rp20.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455534", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "08218001237", time: "19:04:10", dur: "0.094", price: "Rp20.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455533", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "546500150772", time: "19:04:10", dur: "0.358", price: "Rp0", margin: "Rp0", reason: "Transaction successful", status: "Success" },
    { id: "2455531", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "517300254806", time: "19:03:56", dur: "0.230", price: "Rp0", margin: "Rp0", reason: "Bill already paid", status: "Reversed" },
    { id: "2455530", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "089508142898", time: "19:03:56", dur: "0.095", price: "Rp44.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455529", client: "Bukalapak [H2H IRS]", supplier: "[Kisel ApiHub]", product: "S50", dest: "082217164845", time: "19:03:55", dur: "0.056", price: "Rp49.210", margin: "Rp40", reason: "Transaction successful", status: "Success" },
    { id: "2455528", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "143500017026", time: "19:03:51", dur: "0.338", price: "Rp0", margin: "Rp0", reason: "Transaction successful", status: "Success" },
    { id: "2455527", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "085361535743", time: "19:03:49", dur: "0.081", price: "Rp97.900", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455526", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "082247444304", time: "19:03:43", dur: "0.091", price: "Rp110.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455525", client: "Bukalapak [H2H IRS]", supplier: "[Kisel ApiHub]", product: "S50", dest: "081233067645", time: "19:03:39", dur: "0.065", price: "Rp49.210", margin: "Rp40", reason: "Transaction successful", status: "Success" },
    { id: "2455524", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "083155480725", time: "19:03:38", dur: "0.104", price: "Rp20.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455523", client: "Bukalapak [H2H IRS]", supplier: "[Kisel ApiHub]", product: "S50", dest: "08134861113", time: "19:03:38", dur: "0.054", price: "Rp49.210", margin: "Rp40", reason: "Transaction successful", status: "Success" },
    { id: "2455522", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "0881023353371", time: "19:03:37", dur: "0.089", price: "Rp70.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455521", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "082358795641", time: "19:03:34", dur: "0.100", price: "Rp20.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
    { id: "2455520", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "142600688983", time: "19:03:33", dur: "0.252", price: "Rp0", margin: "Rp0", reason: "Transaction successful", status: "Success" },
    { id: "2455519", client: "Bukalapak [H2H IRS]", supplier: "[Kisel ApiHub]", product: "S50", dest: "081278445607", time: "19:03:28", dur: "0.054", price: "Rp49.210", margin: "Rp40", reason: "Transaction successful", status: "Success" },
    { id: "2455518", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "PLN", dest: "517300254806", time: "19:03:27", dur: "0.398", price: "Rp12.813", margin: "Rp30", reason: "Transaction successful", status: "Success" },
    { id: "2455517", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "517300254806", time: "19:03:26", dur: "0.231", price: "Rp0", margin: "Rp0", reason: "Transaction successful", status: "Success" },
    { id: "2455514", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "45171476869", time: "19:03:24", dur: "0.118", price: "Rp0", margin: "Rp0", reason: "Invalid destination number", status: "Reversed" },
    { id: "2455513", client: "Hotelmurah [H2H]", supplier: "[VSI]", product: "iPLN", dest: "142200826901", time: "19:03:23", dur: "0.364", price: "Rp0", margin: "Rp0", reason: "Invalid destination number", status: "Reversed" },
    { id: "2455512", client: "bkpay [H2H]", supplier: "[SMB]", product: "DANAKH", dest: "083125832103", time: "19:03:22", dur: "0.089", price: "Rp350.400", margin: "Rp300", reason: "Transaction successful", status: "Success" },
  ];
}

function buildDemoTransactions() {
  const seed = createSeedTransactions();
  const clients = ["bkpay [H2H]", "Hotelmurah [H2H]", "Bukalapak [H2H IRS]", "Telin [H2H Sync]", "ShopeePay [H2H]", "Tokopedia [API]", "Dana [API]", "Traveloka [H2H]"];
  const suppliers = ["[SMB]", "[VSI]", "[Kisel ApiHub]", "[Indotel]", "[Bima Sakti]"];
  const products = ["DANAKH", "iPLN", "PLN", "S50", "I10", "TSEL50", "iBPJSTK"];
  const rows = [...seed];

  for (let i = seed.length; i < 130; i++) {
    const id = 2455512 - (i - seed.length + 1);
    const client = clients[i % clients.length];
    const supplier = suppliers[i % suppliers.length];
    const product = products[i % products.length];
    const status = i % 17 === 0 ? "Pending" : i % 7 === 0 ? "Reversed" : "Success";
    const minute = Math.max(0, 3 - Math.floor((i - seed.length) / 18));
    const second = String(21 - (i % 22)).padStart(2, "0");
    const isZeroProduct = product === "iPLN";
    const amount = isZeroProduct ? 0 : (i % 9 + 1) * 10000 + 400;
    rows.push({
      id: String(id),
      client,
      supplier,
      product,
      dest: "08" + String(1200000000 + i * 73921).slice(0, 10),
      time: `19:0${minute}:${second}`,
      dur: (0.05 + (i % 13) * 0.037).toFixed(3),
      price: formatMoney(amount),
      margin: status === "Success" && i % 23 === 0 ? formatMoney(-((i % 5 + 1) * 250)) : formatMoney(isZeroProduct ? 0 : product === "S50" ? 40 : 300),
      reason: status === "Pending" ? "Transaction is being processed" : status === "Reversed" ? (i % 2 ? "Bill already paid" : "Invalid destination number") : "Transaction successful",
      status,
    });
  }

  return rows;
}

RAW.splice(0, RAW.length, ...buildDemoTransactions());

function getClientName(row) {
  return row.client.split(" ")[0];
}

function getSupplierName(row) {
  return row.supplier.replace("[", "").replace("]", "");
}

function getClientTrxId(row) {
  return row.client.includes("bkpay")
    ? `D17789${row.id}${row.dest.slice(-6)}`
    : `${row.id}${row.dest.slice(-4)}`;
}

function getSupplierId(row) {
  const supplier = getSupplierName(row).toUpperCase().replace(/\s+/g, "-");
  return `${supplier}-${row.product}`;
}

function getProviderName(row) {
  const product = row.product.toUpperCase();
  if (product.includes("PLN")) return "PLN";
  if (product.includes("TSEL") || product.startsWith("S")) return "Telkomsel";
  if (product.includes("DANA")) return "Dana";
  if (product.includes("I10")) return "Indosat";
  if (product.includes("BPJS")) return "BPJS";
  return row.product;
}

function matchesSearch(value, query) {
  if (!query) return true;
  return String(value).toLowerCase().includes(String(query).toLowerCase());
}

function getClientPrimaryProduct(clientName) {
  const row = RAW.find((trx) => getClientName(trx).toLowerCase() === clientName.toLowerCase());
  return row?.product || "All Products";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getRowDate(row) {
  return new Date(`2026-05-15T${row.time}`);
}

function hasActiveFilters() {
  return Object.keys(DEFAULT_FILTERS).some((key) => filterState[key] !== DEFAULT_FILTERS[key]);
}

function getFilteredRows() {
  const start = filterState.start ? new Date(filterState.start) : null;
  const end = filterState.end ? new Date(filterState.end) : null;

  return RAW.filter((row) => {
    const rowDate = getRowDate(row);
    if (start && rowDate < start) return false;
    if (end && rowDate > end) return false;
    if (!matchesSearch(getClientName(row), filterState.client)) return false;
    if (!matchesSearch(getClientTrxId(row), filterState.clientId)) return false;
    if (!matchesSearch(getSupplierName(row), filterState.supplier)) return false;
    if (!matchesSearch(getSupplierId(row), filterState.supplierId)) return false;
    if (!matchesSearch(getProviderName(row), filterState.provider)) return false;
    if (!matchesSearch(row.product, filterState.product)) return false;
    if (!matchesSearch(row.status, filterState.status)) return false;
    return true;
  });
}

function getDashboardRows() {
  const rows = getFilteredRows();
  return rows.length ? rows : [];
}

function getFilteredTotalCount(rows = getFilteredRows()) {
  return hasActiveFilters() ? rows.length : TOTAL_TRANSACTION_COUNT;
}

function populateFilterOptions() {
  fillComboOptions("client-options", [...new Set(RAW.map(getClientName))]);
  fillComboOptions("supplier-options", [...new Set(RAW.map(getSupplierName))]);
  fillComboOptions("provider-options", [...new Set(RAW.map(getProviderName))]);
  fillComboOptions("status-options", [...new Set(RAW.map((row) => row.status))]);
  syncFilterInputs();
}

function fillComboOptions(id, values) {
  const options = document.getElementById(id);
  if (!options) return;
  const sorted = values.filter(Boolean).sort();
  options.dataset.values = JSON.stringify(sorted);
  renderComboOptions(options, sorted);
}

function getComboValues(options) {
  try {
    return JSON.parse(options.dataset.values || "[]");
  } catch {
    return [];
  }
}

function renderComboOptions(options, values, query = "") {
  const combo = options.closest(".filter-combo");
  const selected = combo?.querySelector("input[type='hidden']")?.value || "";
  const placeholder = combo?.dataset.placeholder || "All";
  const filtered = values.filter((value) => matchesSearch(value, query));
  const rows = [`<button type="button" class="filter-combo-option${selected ? "" : " active"}" data-value="" onclick="selectFilterOption(this)">${escapeHtml(placeholder)}</button>`];

  if (filtered.length) {
    rows.push(...filtered.map((value) => {
      const active = value === selected ? " active" : "";
      return `<button type="button" class="filter-combo-option${active}" data-value="${escapeHtml(value)}" onclick="selectFilterOption(this)">${escapeHtml(value)}</button>`;
    }));
  } else {
    rows.push(`<div class="filter-combo-empty">No results</div>`);
  }

  options.innerHTML = rows.join("");
}

function toggleFilterCombo(toggle) {
  const combo = toggle.closest(".filter-combo");
  const willOpen = !combo.classList.contains("open");
  closeFilterCombos();
  if (!willOpen) return;

  combo.classList.add("open");
  const search = combo.querySelector(".filter-combo-search");
  const options = combo.querySelector(".filter-combo-options");
  if (search) {
    search.value = "";
    setTimeout(() => search.focus(), 0);
  }
  if (options) renderComboOptions(options, getComboValues(options));
}

function filterComboOptions(search) {
  const combo = search.closest(".filter-combo");
  const options = combo?.querySelector(".filter-combo-options");
  if (!options) return;
  renderComboOptions(options, getComboValues(options), search.value);
}

function selectFilterOption(option) {
  const combo = option.closest(".filter-combo");
  const field = combo?.querySelector("input[type='hidden']");
  if (!combo || !field) return;
  field.value = option.dataset.value || "";
  updateComboLabel(combo);
  closeFilterCombos();
}

function updateComboLabel(combo) {
  const field = combo.querySelector("input[type='hidden']");
  const label = combo.querySelector(".filter-combo-toggle span");
  if (!field || !label) return;
  label.textContent = field.value || combo.dataset.placeholder || "All";
}

function closeFilterCombos() {
  document.querySelectorAll(".filter-combo.open").forEach((combo) => combo.classList.remove("open"));
}

function syncFilterInputs() {
  const fields = {
    "filter-start": filterState.start,
    "filter-end": filterState.end,
    "filter-client": filterState.client,
    "filter-client-id": filterState.clientId,
    "filter-supplier": filterState.supplier,
    "filter-supplier-id": filterState.supplierId,
    "filter-provider": filterState.provider,
    "filter-product": filterState.product,
    "filter-status": filterState.status,
  };

  Object.entries(fields).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field) field.value = value;
  });
  document.querySelectorAll(".filter-combo").forEach(updateComboLabel);
}

function readFilterInputs() {
  filterState = {
    start: document.getElementById("filter-start")?.value || "",
    end: document.getElementById("filter-end")?.value || "",
    client: document.getElementById("filter-client")?.value.trim() || "",
    clientId: document.getElementById("filter-client-id")?.value.trim() || "",
    supplier: document.getElementById("filter-supplier")?.value.trim() || "",
    supplierId: document.getElementById("filter-supplier-id")?.value.trim() || "",
    provider: document.getElementById("filter-provider")?.value.trim() || "",
    product: document.getElementById("filter-product")?.value.trim() || "",
    status: document.getElementById("filter-status")?.value.trim() || "",
  };
}

function refreshDashboard() {
  renderTrx();
  renderTraffic();
  updateHourlyChartFromFilters();
  updateSummaryStats();
  renderPagination();
  syncPendingFilterCardState();
}

function applyDashboardFilters() {
  readFilterInputs();
  currentPage = 1;
  refreshDashboard();
}

function resetDashboardFilters() {
  filterState = { ...DEFAULT_FILTERS };
  currentPage = 1;
  syncFilterInputs();
  refreshDashboard();
}

function syncPendingFilterCardState() {
  const pendingCard = document.querySelector(".stat-card.pending");
  if (!pendingCard) return;
  pendingCard.classList.toggle("pending-filter-active", filterState.status === "Pending");
}

function showPendingTransactions() {
  filterState = { ...filterState, status: "Pending" };
  currentPage = 1;
  syncFilterInputs();
  refreshDashboard();
  document.querySelector(".trx-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Render traffic
function renderTraffic() {
  const tbody = document.getElementById("traffic-tbody");
  if (!tbody) return;
  const rows = getDashboardRows();
  const trafficRows = hasActiveFilters()
    ? buildFilteredTrafficRows(rows)
    : TRAFFIC;

  if (!trafficRows.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-row">No client traffic matches current filters</td></tr>`;
    return;
  }

  tbody.innerHTML = trafficRows.map((t) => {
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

  if (!hasActiveFilters()) TRAFFIC.forEach((t) => (t.lastTick = 0));
}

function buildFilteredTrafficRows(rows) {
  const grouped = new Map();

  rows.forEach((row) => {
    const client = getClientName(row);
    if (!grouped.has(client)) {
      const baseline = TRAFFIC.find((item) => item.client === client);
      grouped.set(client, {
        client,
        today: 0,
        yesterday: baseline?.yesterday || 0,
        lastTick: 0,
      });
    }
    grouped.get(client).today += 1;
  });

  return [...grouped.values()]
    .map((row) => ({
      ...row,
      yesterday: row.yesterday || Math.max(1, Math.round(row.today * 0.86)),
    }))
    .sort((a, b) => b.today - a.today);
}

function updateSummaryStats() {
  if (!document.getElementById("s-total")) return;
  const rows = getDashboardRows();
  const total = hasActiveFilters() ? rows.length : TRAFFIC.reduce((sum, t) => sum + t.today, 0);
  const reversed = hasActiveFilters() ? countRowsByStatus("Reversed", rows) : Math.max(0, Math.round(total * 0.112 + Math.random() * 8));
  const pending = hasActiveFilters() ? countRowsByStatus("Pending", rows) : LIVE_PENDING.size;
  const failed = countRowsByStatus("Failed", rows);
  const processing = countRowsByStatus("Processing", rows);
  const success = Math.max(0, total - reversed - pending - failed - processing);
  const revenue = hasActiveFilters() ? calculateRevenue(rows) : cumulativeRevenue;
  const margin = hasActiveFilters() ? calculateMargin(rows) : cumulativeMargin;
  const successPct = total ? ((success / total) * 100).toFixed(1) : "0.0";
  const marginPct = revenue ? ((margin / revenue) * 100).toFixed(2) : "0.00";
  latestSuccessRate = `${successPct}%`;

  document.getElementById("s-total").textContent = total.toLocaleString("id");
  document.getElementById("s-success").textContent = success.toLocaleString("id");
  document.getElementById("s-success-pct").textContent = latestSuccessRate;
  document.getElementById("s-pending").textContent = pending.toLocaleString("id");
  document.getElementById("s-rev").textContent = reversed.toLocaleString("id");
  document.getElementById("s-revenue").textContent = formatMoney(revenue);
  document.getElementById("s-margin").textContent = formatMoney(margin);
  document.getElementById("s-revenue-pct").textContent = hasActiveFilters() ? "Filtered" : "Today";
  document.getElementById("s-margin-pct").textContent = `${marginPct}% revenue`;
  updatePendingVisualState(pending);
  evaluateStatusIncident("Failed", failed);
  evaluateStatusIncident("Processing", processing);

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

function countRowsByStatus(status, rows = getDashboardRows()) {
  return rows.filter((row) => row.status === status).length;
}

function calculateRevenue(rows = RAW) {
  return rows.reduce((sum, row) => {
    if (row.status !== "Success") return sum;
    return sum + parseMoney(row.price);
  }, 0);
}

function calculateMargin(rows = RAW) {
  return rows.reduce((sum, row) => {
    if (row.status !== "Success") return sum;
    const margin = parseSignedMoney(row.margin);
    return margin > 0 ? sum + margin : sum;
  }, 0);
}

function seedCumulativeFinance() {
  const successCount = RAW.filter((row) => row.status === "Success").length;
  cumulativeRevenue = Math.max(calculateRevenue(), successCount * REVENUE_STEP);
  cumulativeMargin = Math.max(calculateMargin(), successCount * MARGIN_STEP);
}

function addTransactionToFinance(trx) {
  if (!trx || trx.status !== "Success" || trx.financeBooked) return;
  cumulativeRevenue += REVENUE_STEP;
  cumulativeMargin += MARGIN_STEP;
  trx.financeBooked = true;
}

function evaluateStatusIncident(status, count) {
  const state = STATUS_INCIDENT_STATE[status];
  if (!state) return;

  if (count < STATUS_INCIDENT_THRESHOLD) {
    state.since = null;
    state.alerted = false;
    removeStatusIncident(status);
    return;
  }

  if (!state.since) state.since = Date.now();
  const hasHeldLongEnough = Date.now() - state.since >= STATUS_INCIDENT_HOLD_MS;

  if (hasHeldLongEnough && !state.alerted) {
    upsertStatusIncident(status, count);
    state.alerted = true;
  }
}

function upsertStatusIncident(status, count) {
  const product = `Transaction ${status} / Dashboard`;
  upsertProductAlert({
    level: "critical",
    product,
    desc: `${count} transactions ${status.toLowerCase()} for 5 minutes`,
    time: shortTime(),
    systemKey: `status-${status.toLowerCase()}`,
  });
}

function removeStatusIncident(status) {
  const key = `status-${status.toLowerCase()}`;
  const index = ALERTS_PRODUCT.findIndex((alert) => alert.systemKey === key);
  if (index >= 0) ALERTS_PRODUCT.splice(index, 1);
}

// Render alert: client stop
function renderAlertStop() {
  syncClientInfoTrafficDropAlerts();
  const tbody = document.getElementById("alert-stop-tbody");
  if (!ALERTS_STOP.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">No client info detected</td></tr>`;
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

// Render alert: product incidents
function renderAlertProduct() {
  const tbody = document.getElementById("alert-product-tbody");
  if (!ALERTS_PRODUCT.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">No product incident detected</td></tr>`;
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

// Render alert: loss transactions
function renderAlertRugi() {
  const tbody = document.getElementById("alert-rugi-tbody");
  if (!ALERTS_RUGI.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">No loss transaction today</td></tr>`;
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

function getLowBalanceAlerts() {
  return BALANCE_ACCOUNTS
    .map((account) => {
      const pct = account.threshold ? (account.balance / account.threshold) * 100 : 100;
      const level = pct <= 50 ? "critical" : pct < 100 ? "warn" : "ok";
      return { ...account, pct, level };
    })
    .filter((account) => account.level !== "ok")
    .sort((a, b) => a.pct - b.pct);
}

function renderAlertBalance() {
  const tbody = document.getElementById("alert-balance-tbody");
  const lowBalances = getLowBalanceAlerts();

  if (!lowBalances.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">No low balance detected</td></tr>`;
    return;
  }

  tbody.innerHTML = lowBalances.map((a) => {
    const cls = a.level === "critical" ? "critical" : "warn";
    return `<tr>
      <td>
        <span class="alert-badge ${cls}">
          <span class="alert-dot ${cls === "critical" ? "blink" : ""}" style="background:${cls === "critical" ? "var(--danger)" : "var(--warn)"};"></span>
          ${cls.toUpperCase()}
        </span>
      </td>
      <td><span class="balance-account">${a.name}</span></td>
      <td><span class="client-tag">${a.type}</span></td>
      <td><span class="balance-val ${cls}">${formatRupiah(a.balance)}</span></td>
      <td>
        <span class="mono-sm" style="color:var(--text3);">${formatRupiah(a.threshold)}</span>
        <div class="balance-meter" title="Threshold ${formatRupiah(a.threshold)}"><div class="balance-meter-fill ${cls}" style="width:${Math.max(4, Math.min(100, a.pct))}%;"></div></div>
      </td>
    </tr>`;
  }).join("");
}

function renderAllAlerts() {
  if (!document.getElementById("alert-stop-tbody")) return;
  renderAlertStop();
  renderAlertProduct();
  renderAlertRugi();
  renderAlertBalance();
  updateAlertBadges();
}

function updateAlertBadges() {
  syncClientInfoTrafficDropAlerts();
  const balanceAlerts = getLowBalanceAlerts();
  const criticalCount = ALERTS_PRODUCT.filter((a) => a.level === "critical").length + ALERTS_STOP.length + balanceAlerts.filter((a) => a.level === "critical").length;
  const warnCount = ALERTS_PRODUCT.filter((a) => a.level === "warn").length + ALERTS_RUGI.length + balanceAlerts.filter((a) => a.level === "warn").length;
  const headerBadges = document.querySelectorAll(".alert-count-badge");
  if (headerBadges[0]) headerBadges[0].textContent = `${criticalCount} critical`;
  if (headerBadges[1]) headerBadges[1].textContent = `${warnCount} warn`;
  const balanceCount = document.getElementById("balance-count");
  if (balanceCount) {
    balanceCount.textContent = `${balanceAlerts.length} low`;
    balanceCount.classList.toggle("is-alerting", balanceAlerts.length > 0);
  }

  const tabBadges = document.querySelectorAll(".alert-tab .tab-badge");
  updateTabBadge(tabBadges[0], ALERTS_STOP.length);
  updateTabBadge(tabBadges[1], ALERTS_PRODUCT.length);
  updateTabBadge(tabBadges[2], ALERTS_RUGI.length);
}

function updateTabBadge(badge, count) {
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle("is-alerting", count > 0);
}

function upsertProductAlert(alert) {
  const sameKey = alert.systemKey || `${alert.product}|${alert.level}`;
  const exists = ALERTS_PRODUCT.findIndex((a) => (a.systemKey || `${a.product}|${a.level}`) === sameKey);
  if (exists >= 0) ALERTS_PRODUCT.splice(exists, 1);
  ALERTS_PRODUCT.unshift(alert);
  limitAlertRows(ALERTS_PRODUCT);
}

function upsertClientStopAlert(alert) {
  const clientKey = alert.client.split(" ")[0];
  const exists = ALERTS_STOP.findIndex((a) => a.client.split(" ")[0] === clientKey);
  if (exists >= 0) ALERTS_STOP.splice(exists, 1);
  ALERTS_STOP.unshift(alert);
  limitAlertRows(ALERTS_STOP, CLIENT_STOP_DEMO_MAX_ROWS);
}

function syncClientInfoTrafficDropAlerts() {
  for (let index = ALERTS_STOP.length - 1; index >= 0; index--) {
    if (ALERTS_STOP[index].systemKey?.startsWith("traffic-drop-")) ALERTS_STOP.splice(index, 1);
  }

  const nowMs = Date.now();
  const dropAlerts = TRAFFIC
    .filter((row) => row.normal30mTraffic > CLIENT_INFO_DROP_NORMAL_MIN)
    .map((row) => {
      const idleMs = nowMs - row.lastTrafficAt;
      const idleMinutes = Math.floor(idleMs / 60000);
      const isDropped = idleMs >= CLIENT_INFO_DROP_IDLE_MS;
      if (!isDropped) return null;

      return {
        client: `${row.client} [Auto]`,
        product: getClientPrimaryProduct(row.client),
        detail: `Traffic dropped to 0 for ${Math.max(idleMinutes, 1)} minutes, normally ${row.normal30mTraffic} trx / 30 minutes`,
        since: shortTime(new Date(row.lastTrafficAt)),
        systemKey: `traffic-drop-${row.client.toLowerCase()}`,
      };
    })
    .filter(Boolean);

  ALERTS_STOP.unshift(...dropAlerts);
  limitAlertRows(ALERTS_STOP, CLIENT_STOP_DEMO_MAX_ROWS);
}

function processAlertRules(trx, trafficRow) {
  const now = shortTime();
  const margin = parseSignedMoney(trx.margin);
  simulateBalanceUsage(trx);

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

function simulateBalanceUsage(trx) {
  const price = parseMoney(trx.price);
  if (!price) return;

  const supplierName = trx.supplier.replace("[", "").replace("]", "");
  const supplier = BALANCE_ACCOUNTS.find((a) => a.type === "Supplier" && a.name.toLowerCase() === supplierName.toLowerCase());
  const client = BALANCE_ACCOUNTS.find((a) => a.type === "Client" && trx.client.toLowerCase().startsWith(a.name.toLowerCase()));

  if (supplier) supplier.balance = Math.max(0, supplier.balance - price);
  if (client) client.balance = Math.max(0, client.balance - Math.round(price * 0.08));
}

function updateClientStopAlerts() {
  return ALERTS_STOP;
}

function buildDemoClientStopBatch() {
  const shuffled = [...CLIENT_STOP_DEMO_POOL].sort(() => Math.random() - 0.5);
  const count = Math.min(
    CLIENT_STOP_DEMO_MAX_ROWS,
    Math.floor(Math.random() * 23) + 8,
    shuffled.length,
  );
  const nowMs = Date.now();

  return shuffled.slice(0, count).map((row, index) => {
    const idleMinutes = Math.floor(Math.random() * 54) + 31;
    const stoppedAt = new Date(nowMs - idleMinutes * 60 * 1000);
    const reasons = [
      `No new traffic for ${idleMinutes} minutes, normally ${row.normal30mTraffic} trx / 30 minutes`,
      `Traffic dropped to 0 for ${idleMinutes} minutes on normally busy route`,
      `No request received after regular ${row.normal30mTraffic} trx / 30 minutes pattern`,
      `Monitoring detected idle route for ${idleMinutes} minutes`,
    ];

    return {
      client: row.client,
      product: row.product,
      detail: reasons[index % reasons.length],
      since: shortTime(stoppedAt),
    };
  });
}

function showDemoClientStopBatch() {
  ALERTS_STOP.splice(0, ALERTS_STOP.length, ...buildDemoClientStopBatch());
  renderAllAlerts();

  setTimeout(() => {
    ALERTS_STOP.splice(0, ALERTS_STOP.length);
    renderAllAlerts();
  }, CLIENT_STOP_DEMO_VISIBLE_MS);
}

function startClientStopDemoFeed() {
  showDemoClientStopBatch();
  setInterval(showDemoClientStopBatch, CLIENT_STOP_DEMO_INTERVAL_MS + CLIENT_STOP_DEMO_VISIBLE_MS);
}

function buildDemoIncidentBatch() {
  const shuffled = [...INCIDENT_DEMO_POOL].sort(() => Math.random() - 0.5);
  const count = Math.min(
    INCIDENT_DEMO_MAX_ROWS,
    Math.floor(Math.random() * 11) + 5,
    shuffled.length,
  );

  return shuffled.slice(0, count).map((row, index) => ({
    ...row,
    demo: true,
    time: shortTime(new Date(Date.now() - (index * 3 + Math.floor(Math.random() * 8)) * 60 * 1000)),
  }));
}

function buildDemoLossTrxBatch() {
  const shuffled = [...LOSS_TRX_DEMO_POOL].sort(() => Math.random() - 0.5);
  const count = Math.min(
    LOSS_TRX_DEMO_MAX_ROWS,
    Math.floor(Math.random() * 11) + 5,
    shuffled.length,
  );
  const baseId = 2455600 + Math.floor(Math.random() * 200);

  return shuffled.slice(0, count).map((row, index) => ({
    id: String(baseId - index),
    client: row.client,
    product: row.product,
    rugi: formatMoney(row.rugi + Math.floor(Math.random() * 6) * 100),
    time: shortTime(new Date(Date.now() - (index * 2 + Math.floor(Math.random() * 6)) * 60 * 1000)),
    demo: true,
  }));
}

function showDemoIncidentAndLossBatch() {
  const persistentIncidents = ALERTS_PRODUCT.filter((alert) => !alert.demo);
  const persistentLosses = ALERTS_RUGI.filter((alert) => !alert.demo);
  ALERTS_PRODUCT.splice(0, ALERTS_PRODUCT.length, ...persistentIncidents, ...buildDemoIncidentBatch());
  ALERTS_RUGI.splice(0, ALERTS_RUGI.length, ...persistentLosses, ...buildDemoLossTrxBatch());
  renderAllAlerts();

  setTimeout(() => {
    const keepIncidents = ALERTS_PRODUCT.filter((alert) => !alert.demo);
    const keepLosses = ALERTS_RUGI.filter((alert) => !alert.demo);
    ALERTS_PRODUCT.splice(0, ALERTS_PRODUCT.length, ...keepIncidents);
    ALERTS_RUGI.splice(0, ALERTS_RUGI.length, ...keepLosses);
    renderAllAlerts();
  }, ALERT_DEMO_VISIBLE_MS);
}

function startIncidentAndLossDemoFeed() {
  showDemoIncidentAndLossBatch();
  setInterval(showDemoIncidentAndLossBatch, ALERT_DEMO_INTERVAL_MS + ALERT_DEMO_VISIBLE_MS);
}

// Switch alert tab
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

function getTransactionDetail(row) {
  const account = getClientName(row);
  const supplier = getSupplierName(row);
  const requestMs = 120 + (parseInt(row.id.slice(-2), 10) % 80);
  const responseMs = requestMs + Math.round(parseFloat(row.dur || "0") * 1000);
  const callbackMs = responseMs + (row.status === "Pending" ? 0 : 3800 + (parseInt(row.id.slice(-3), 10) % 700));
  const baseDate = `16-05-2026 ${row.time}`;
  const rcMap = { Success: "0", Reversed: "5", Pending: "68", Failed: "91", Processing: "2" };
  const statusCodeMap = { Success: "0", Reversed: "5", Pending: "68", Failed: "91", Processing: "2" };
  const gatewayCode = row.product === "DANAKH" ? "DANAOPEN" : row.product;
  const clientTrxId = getClientTrxId(row);
  const serial = row.status === "Success" ? `${row.id}${row.dest.slice(-8)}${row.product}` : "";
  const statusCode = statusCodeMap[row.status] || "2";
  const gatewayMessage = row.status === "Success"
    ? `REF#${row.id} ${gatewayCode} ${row.dest} BERHASIL, SN:${serial || "-"}`
    : row.status === "Reversed"
      ? `REF#${row.id} ${gatewayCode} ${row.dest} GAGAL, KET: ${row.reason.toUpperCase()}`
      : `REF#${row.id} ${gatewayCode} ${row.dest} ${row.reason.toUpperCase()}`;

  return {
    account,
    dateTime: `${baseDate}.${String(requestMs).padStart(3, "0")}`,
    responseTime: `${baseDate}.${String(responseMs % 1000).padStart(3, "0")}`,
    callbackTime: row.status === "Pending" ? "-" : `${baseDate}.${String(callbackMs % 1000).padStart(3, "0")}`,
    timeTaken: Number(row.dur || 0).toFixed(3),
    sysId: row.id,
    clientTrxId,
    status: row.status,
    rcNum: rcMap[row.status] || "2",
    destination: row.dest,
    code: row.product,
    gateway: supplier,
    gatewayCode,
    serial,
    responseGateway: `Query(${supplier}Query { serverid: "${row.id}", clientid: ${row.id}, statuscode: "${statusCode}", tujuan: Some("${row.dest}"), harga: Some("${row.price}"), saldo: None, kp: Some("${gatewayCode}"), msisdn: Some("${row.dest}"), sn: Some("${serial}"), msg: "${gatewayMessage}" })`,
    reversalNote: row.status === "Reversed" ? row.reason : "",
    reversedBy: row.status === "Reversed" ? "H2H" : "",
    reversalDateTime: row.status === "Reversed" ? `${baseDate}.${String((callbackMs + 120) % 1000).padStart(3, "0")}` : "",
  };
}

function detailRow(label, value, extraClass = "") {
  return `<tr><th>${escapeHtml(label)} :</th><td class="${extraClass}">${escapeHtml(value || "-")}</td></tr>`;
}

function openTransactionDetail(id) {
  const row = RAW.find((trx) => trx.id === id);
  if (!row) return;

  const detail = getTransactionDetail(row);
  const modal = document.getElementById("trx-modal");
  const title = document.getElementById("trx-modal-title");
  const body = document.getElementById("trx-modal-body");
  if (!modal || !title || !body) return;

  title.textContent = `Sys TRX ID ${detail.sysId}`;
  body.innerHTML = `
    <table class="trx-detail-table">
      <tbody>
        ${detailRow("Account", detail.account)}
        ${detailRow("Date Time", detail.dateTime)}
        ${detailRow("Response Time", detail.responseTime)}
        ${detailRow("Callback / Status Time", detail.callbackTime)}
        ${detailRow("Time Taken (s)", detail.timeTaken)}
        ${detailRow("Sys_Trx ID", detail.sysId)}
        ${detailRow("Client_Trx ID", detail.clientTrxId)}
        ${detailRow("Status", detail.status)}
        ${detailRow("RC Num", detail.rcNum)}
        ${detailRow("Destination", detail.destination)}
        ${detailRow("Code", detail.code)}
        ${detailRow("Gateway", detail.gateway)}
        ${detailRow("Gateway Code", detail.gatewayCode)}
        ${detailRow("Serial Number", detail.serial)}
        ${detailRow("Response / Callback Gateway", detail.responseGateway, "detail-long")}
        ${detailRow("Reversal Note", detail.reversalNote)}
        ${detailRow("Reversed By", detail.reversedBy)}
        ${detailRow("Reversal DateTime", detail.reversalDateTime)}
      </tbody>
    </table>
    <div class="trx-detail-actions">
      <h3>Update Transaction Status to Success</h3>
      <div class="trx-detail-form">
        <label for="detail-sn">Serial Number (SN) :</label>
        <input id="detail-sn" type="text" placeholder="Isi Serial Number" value="${escapeHtml(detail.serial)}">
        <button class="trx-detail-success" type="button">Success</button>
      </div>
    </div>
  `;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeTransactionDetail(event) {
  if (event && event.target.id !== "trx-modal") return;
  const modal = document.getElementById("trx-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeTransactionDetail();
  if (event.key === "Escape") closeFilterCombos();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".filter-combo")) closeFilterCombos();
});

// Render transaction table
function renderTrx() {
  const tbody = document.getElementById("trx-tbody");
  if (!tbody) return;
  const rows = getFilteredRows();
  const totalRows = getFilteredTotalCount(rows);
  const start = (currentPage - 1) * pageSize;
  const rowsThisPage = Math.max(0, Math.min(pageSize, totalRows - start));
  const visibleRows = rows.length
    ? Array.from({ length: rowsThisPage }, (_, i) => rows[(start + i) % rows.length])
    : [];

  if (!visibleRows.length) {
    tbody.innerHTML = `<tr><td colspan="12" class="empty-row">No transactions match current filters</td></tr>`;
    return;
  }

  tbody.innerHTML = visibleRows
    .map((r, i) => {
      const stcls = r.status.toLowerCase();
      const clientShort = r.client.split(" ")[0];
      const marginClass = parseSignedMoney(r.margin) < 0 ? "loss" : "";
      const rowClass = stcls === "pending" ? "trx-row-pending" : "";
      return `<tr class="${rowClass}">
      <td><span class="row-number">${start + i + 1}</span></td>
      <td><button class="trx-id trx-id-btn" type="button" onclick="openTransactionDetail('${r.id}')">${r.id}</button></td>
      <td><span class="client-tag">${clientShort}</span></td>
      <td><span class="sup-badge">${r.supplier.replace("[", "").replace("]", "")}</span></td>
      <td><span class="mono-sm" style="color:var(--accent2);">${r.product}</span></td>
      <td><span class="mono-sm">${r.dest}</span></td>
      <td><span class="mono-sm request-time">15-05 ${r.time}</span></td>
      <td><span class="mono-sm duration-time ${parseFloat(r.dur) > 0.5 ? "slow" : ""}">${r.dur}s</span></td>
      <td><span class="price-text">${r.price}</span></td>
      <td><span class="margin-text ${marginClass}">${r.margin}</span></td>
      <td><span class="reason-text">${r.reason}</span></td>
      <td><span class="status-pill ${stcls}">${r.status}</span></td>
    </tr>`;
    })
    .join("");
}

// Pagination
function renderPagination() {
  const wrap = document.getElementById("page-btns");
  if (!wrap) return;
  const totalRows = getFilteredTotalCount();
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const end = totalRows ? Math.min(currentPage * pageSize, totalRows) : 0;
  const start = totalRows ? (currentPage - 1) * pageSize + 1 : 0;
  const pageInfo = document.getElementById("trx-page-info");
  const cardSummary = document.getElementById("trx-card-summary");
  const pageSizeSelect = document.getElementById("page-size");
  if (pageInfo) pageInfo.innerHTML = `Showing <b>${start.toLocaleString("id")}-${end.toLocaleString("id")}</b> of <b>${totalRows.toLocaleString("id")}</b> transactions`;
  if (cardSummary) cardSummary.innerHTML = `${totalRows.toLocaleString("id")} rows - Page <b>${currentPage}</b> of ${totalPages.toLocaleString("id")}`;
  if (pageSizeSelect) pageSizeSelect.value = String(pageSize);

  const pages = getPaginationPages(totalPages, currentPage);
  wrap.innerHTML = pages
    .map((p) => {
      if (p === "...")
        return `<div class="page-btn" style="cursor:default;border-color:transparent;color:var(--text3);">...</div>`;
      return `<div class="page-btn ${p === currentPage ? "active" : ""}" onclick="goPage(${p})">${p}</div>`;
    })
    .join("");
}

function getPaginationPages(totalPages, activePage) {
  const pages = [1];
  const start = Math.max(2, activePage - 1);
  const end = Math.min(totalPages - 1, activePage + 1);

  if (start > 2) pages.push("...");
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

function goPage(n) {
  const totalPages = Math.max(1, Math.ceil(getFilteredTotalCount() / pageSize));
  currentPage = Math.max(1, Math.min(n, totalPages));
  renderTrx();
  renderPagination();
}

function setPageSize(size) {
  pageSize = parseInt(size, 10) || 10;
  currentPage = 1;
  renderTrx();
  renderPagination();
}

function updateHourlyChartFromFilters() {
  if (!chartHourly) return;

  if (!hasActiveFilters()) {
    chartHourly.data.labels = ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "11:19"];
    chartHourly.data.datasets[0].data = [420, 510, 780, 690, 980, 1200, 1100, 1350];
    chartHourly.data.datasets[1].data = [380, 450, 600, 880, 740, 990, 1050, 970];
    chartHourly.update("none");
    return;
  }

  const buckets = new Map();
  getFilteredRows().forEach((row) => {
    const hour = row.time.slice(0, 2);
    const label = `${hour}:00`;
    buckets.set(label, (buckets.get(label) || 0) + 1);
  });

  const labels = [...buckets.keys()].sort();
  const today = labels.map((label) => buckets.get(label));
  const yesterday = today.map((value, index) => Math.max(0, Math.round(value * (0.72 + (index % 3) * 0.12))));

  chartHourly.data.labels = labels.length ? labels : ["No Data"];
  chartHourly.data.datasets[0].data = labels.length ? today : [0];
  chartHourly.data.datasets[1].data = labels.length ? yesterday : [0];
  chartHourly.update("none");
}

// Charts
let chartHourly, chartDonut;

function getChartColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    grid: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
    tick: dark ? "#555e78" : "#9aa0b8",
    tooltip: dark ? "#13161e" : "#ffffff",
  };
}

const donutCenterTextPlugin = {
  id: "donutCenterText",
  afterDraw(chart) {
    if (chart.config.type !== "doughnut") return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const styles = getComputedStyle(document.documentElement);

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = styles.getPropertyValue("--success").trim();
    ctx.font = "800 22px 'Space Mono', monospace";
    ctx.fillText(latestSuccessRate, centerX, centerY - 6);
    ctx.fillStyle = styles.getPropertyValue("--text2").trim();
    ctx.font = "800 10px 'DM Sans', sans-serif";
    ctx.fillText("Success Rate", centerX, centerY + 16);
    ctx.restore();
  },
};

function initCharts() {
  const hourlyCanvas = document.getElementById("chartHourly");
  const donutCanvas = document.getElementById("chartDonut");
  if (!hourlyCanvas || !donutCanvas) return;
  if (chartHourly) chartHourly.destroy();
  if (chartDonut) chartDonut.destroy();

  const c = getChartColors();
  Chart.defaults.font.family = "'DM Sans', sans-serif";

  const ctxH = hourlyCanvas.getContext("2d");

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
          label: "Today",
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
          label: "Yesterday",
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

  const ctxD = donutCanvas.getContext("2d");

  chartDonut = new Chart(ctxD, {
    type: "doughnut",
    data: {
      labels: ["Success", "Reversed", "Pending", "Failed"],
      datasets: [
        {
          data: [6755, 858, 2, 0],
          backgroundColor: ["#22c55e", "#f97316", "#f59e0b", "#ef4444"],
        },
      ],
    },
    options: {
      cutout: "72%",
      layout: { padding: 6 },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: c.tooltip },
      },
    },
    plugins: [donutCenterTextPlugin],
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

function toggleSidebar() {
  document.body.classList.toggle("sidebar-hidden");
  const hidden = document.body.classList.contains("sidebar-hidden");
  const button = document.querySelector(".sidebar-toggle");
  if (button) {
    button.title = hidden ? "Show sidebar" : "Hide sidebar";
    button.setAttribute("aria-label", hidden ? "Show sidebar" : "Hide sidebar");
  }
  setTimeout(() => {
    if (chartHourly) chartHourly.resize();
    if (chartDonut) chartDonut.resize();
  }, 220);
}

function initSidebarGroups() {
  document.querySelectorAll(".nav-section-title").forEach((title) => {
    const section = title.closest(".nav-section");
    if (!section) return;

    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.setAttribute("aria-expanded", String(!section.classList.contains("collapsed")));

    const toggleGroup = () => {
      section.classList.toggle("collapsed");
      title.setAttribute("aria-expanded", String(!section.classList.contains("collapsed")));
    };

    title.addEventListener("click", toggleGroup);
    title.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleGroup();
    });
  });
}

let dashboardContentHtml = "";
let dashboardTopbarTitleHtml = "";
let reportRevenueChart = null;
let reportStatusChart = null;

const moduleRows = {
  rejected: [
    ["02-06-2026 17:11:05", "Telin", "0", "service code invalid", "S100", "081234567890", "Rejected", "-"],
    ["02-06-2026 17:10:48", "Telin", "0", "service code invalid", "S50", "085645231900", "Rejected", "-"],
    ["02-06-2026 17:07:16", "Telin", "0", "destination blocked by route", "PLN", "538413202094", "Rejected", "-"],
    ["02-06-2026 17:06:22", "bkpay", "0", "service code invalid", "DANAKH", "087714351850", "Rejected", "-"],
    ["02-06-2026 16:57:50", "Bukalapak", "0", "invalid inquiry payload", "I10", "085775032576", "Rejected", "-"],
  ],
  transactionRoute: [
    ["SMB", "BIFASTOPEN", "BIFASTOPEN", "184", "165", "89.67%", "19", "10.33%"],
    ["SMB", "DANAKH", "DANAOPEN", "8,728", "8,424", "96.52%", "304", "3.48%"],
    ["SMB", "GPYKH", "GPYOPEN", "362", "353", "97.51%", "9", "2.49%"],
    ["SMB", "SHPKH", "SHPOPEN", "1", "1", "100.00%", "0", "0.00%"],
  ],
  productList: [
    ["Air", "KABKUPANG", "NTT Kab Kupang", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025 10:53:42", "Iqbal"],
    ["Air", "KABKENDAL", "Jawa Tengah Kab Kendal", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025 10:54:24", "Iqbal"],
    ["Air", "KOTAKEDIRI", "Jawa Timur Kota Kediri", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025 10:51:09", "Agiel"],
    ["Air", "KOTABANJAR", "Jawa Barat Kota Banjar", "0", "Postpaid", "PDAM", "TRUE", "12-Aug 2025 10:54:02", "Iqbal"],
    ["Pulsa", "S100", "Telkomsel 100K", "100000", "Prepaid", "Telco", "TRUE", "30-May 2026 14:31:38", "Iky"],
  ],
  productRoute: [
    ["Bumdes,esa,Telin", "AETRAJAKARTA", "Bima Sakti"],
    ["Bumdes,esa,Telin", "AETRATANGERANG", "Bima Sakti"],
    ["", "ATBKEPRI", ""],
    ["", "ATF10", "SMB"],
    ["", "ATF100", "SMB"],
    ["", "ATF105", "SMB"],
  ],
  checkPrice: [
    ["Telin", "S100", "7379", "Rp96.300", "13-Jan 2026 17:42:10", "Fahri", "FALSE"],
    ["Kisel ApiHub", "S100", "SP100", "Rp96.850", "30-May 2026 14:31:38", "Iky", "FALSE"],
    ["Indotel", "S100", "S100", "Rp96.890", "29-May 2026 19:36:01", "H2H", "TRUE"],
    ["MetroReload", "S100", "BSP100", "Rp96.900", "19-May 2026 17:31:00", "fryan", "TRUE"],
    ["SMB", "S100", "TSEL100K", "Rp97.075", "19-May 2026 11:44:56", "H2H", "TRUE"],
  ],
  gatewayList: [
    ["Teratai", "https://terataiapi.socx.app/reseller/api/v1/http/purchase", "TRUE", "60.659.586", "60.760.812", "05-05-2026 20:57:33", "Dito"],
    ["Mobile Pulsa", "https://mobilepulsa.net/api/v1/bill/check", "TRUE", "9.718.000", "9.718.000", "24-04-2026 16:13:59", "Fahri"],
    ["Kisel ApiHub", "https://apihub.kiselindonesia.net/transaction/", "TRUE", "55.909.185", "55.995.025", "11-05-2026 13:03:13", "Fahri"],
    ["Odin", "-", "FALSE", "-", "-", "05-03-2026 09:10:31", "Fahri"],
    ["SMB", "http://49.0.203.84:8081/api/h2h", "TRUE", "1.651.644.186", "1.887.317.001", "15-05-2026 07:54:43", "Iky"],
  ],
  memberList: [
    ["Leisurelink", "leisurelink", "49", "52.74.114.188, 52.77.203.226", "0", "0", "19-05-2026 17:27:54", "vio"],
    ["PT. Teratai Cipta Inovasi", "Teratai", "47", "128.199.190.119", "300.000", "0", "22-04-2026 15:47:09", "Fahri"],
    ["BK PAY", "bkpay", "44", "8.219.251.167, 47.237.143.194", "1.466.244.248", "0", "30-05-2026 13:54:15", "Iky"],
    ["HIGO", "neoparty", "43", "110.239.84.200, 110.239.70.52", "58.538.561", "0", "25-05-2026 09:38:21", "Dito"],
    ["TOPLINK INDONESIA", "toplink", "36", "103.182.189.202, 103.118.108.13", "23.120.464", "0", "06-05-2026 11:03:40", "Dito"],
  ],
  memberVirtual: [
    ["01-06-2026 22:01:54", "quantum", "308", "019e83b4-a565-7e91-81a6-92c558f61a77", "Bank Central Asia", "111316394107285", "01-06-2026 22:03:56", "Success", "100.000.000", "true"],
    ["01-06-2026 21:53:52", "quantum", "307", "019e83ad-485b-7c6b-a7c9-5e05b90cf2db", "Bank Central Asia", "111316394107285", "01-06-2026 22:01:41", "Success", "100.000.000", "true"],
  ],
  administrators: [
    ["dwi", "Super Admin", "08-Apr 2026 15:33:04", "TRUE", "Fahri", "Edit"],
    ["sarche", "Super Admin", "01-Oct 2025 22:57:24", "FALSE", "catherine", "Edit"],
    ["fryan", "Sales", "14-Oct 2025 11:07:36", "TRUE", "Fahri", "Edit"],
    ["Eko", "Super Admin", "30-Sep 2025 11:42:05", "TRUE", "Fahri", "Edit"],
    ["Lee", "Super Admin", "01-Oct 2025 15:32:39", "FALSE", "Fahri", "Edit"],
    ["Iqbal", "Super Admin", "14-Apr 2026 09:55:18", "TRUE", "Iqbal", "Edit"],
  ],
  accessLog: [
    ["02-06-2026 18:37:04", "Dito", "/admin/log/?date=2026-06-02"],
    ["02-06-2026 18:36:37", "Dito", "/admin/list?msg=&status=false"],
    ["02-06-2026 18:36:20", "Iky", "/account/mutation/44/1"],
    ["02-06-2026 18:36:17", "Iky", "/account/list?msg=Sukses+menambah+deposit"],
    ["02-06-2026 18:36:07", "Dito", "/page/edit/9"],
    ["02-06-2026 18:21:53", "Iky", "/transaction/list/1?date=2026-06-02"],
  ],
  pages: [
    ["account/add", "13-Oct 2025 09:45:31", "Fahri", "Edit"],
    ["account/add-service", "13-Oct 2025 10:15:37", "Fahri", "Edit"],
    ["account/deposit", "13-Oct 2025 10:13:31", "Fahri", "Edit"],
    ["account/list", "13-Oct 2025 09:45:15", "Fahri", "Edit"],
    ["admin/add", "13-Oct 2025 10:19:44", "Fahri", "Edit"],
    ["admin/change-password", "13-Oct 2025 10:21:20", "Fahri", "Edit"],
    ["admin/list", "13-Oct 2025 10:18:25", "Fahri", "Edit"],
    ["admin/log", "13-Oct 2025 10:18:46", "Fahri", "Edit"],
    ["gateway/add", "13-Oct 2025 10:35:50", "Fahri", "Edit"],
  ],
  roles: [
    ["Sales", "14-Oct 2025 11:04:39", "Fahri", "Edit"],
    ["Admin", "14-Oct 2025 10:58:29", "Fahri", "Edit"],
    ["Super Admin", "02-Jul 2025 17:42:45", "Fahri", "Edit"],
  ],
  reportMonthly: [
    ["2026-06", "39,768", "94.68%", "2,236", "Rp5.690.756.214", "Rp5.680.793.115", "Rp9.963.099"],
    ["2026-05", "407,501", "95.74%", "18,119", "Rp54.458.546.890", "Rp54.356.514.807", "Rp102.032.083"],
    ["2026-04", "317,588", "94.53%", "18,361", "Rp36.510.952.753", "Rp36.448.821.321", "Rp62.131.432"],
    ["2026-03", "101,330", "92.46%", "8,263", "Rp8.410.002.930", "Rp8.394.266.458", "Rp15.736.472"],
    ["2026-02", "57,096", "93.76%", "3,798", "Rp4.139.342.252", "Rp4.133.611.008", "Rp5.731.244"],
    ["2026-01", "64,196", "91.45%", "6,004", "Rp3.935.164.663", "Rp3.924.508.697", "Rp10.655.966"],
  ],
  reportDaily: [
    ["2026-06-02", "12,647", "94.81%", "693", "Rp1.814.622.546", "Rp1.811.412.177", "Rp3.210.369"],
    ["2026-06-01", "27,139", "94.62%", "1,543", "Rp3.877.406.723", "Rp3.870.649.891", "Rp6.756.832"],
  ],
  reportHourly: [
    ["18", "983", "94.70%", "55", "Rp273.328.360", "Rp273.110.611", "Rp217.749"],
    ["17", "1,044", "95.34%", "51", "Rp118.770.549", "Rp118.525.134", "Rp245.415"],
    ["16", "780", "96.30%", "30", "Rp97.583.897", "Rp97.364.155", "Rp219.742"],
    ["15", "780", "96.06%", "32", "Rp106.767.662", "Rp106.560.121", "Rp207.541"],
    ["14", "569", "96.44%", "21", "Rp65.875.002", "Rp65.719.911", "Rp155.091"],
    ["13", "486", "97.39%", "13", "Rp60.366.497", "Rp60.249.598", "Rp116.899"],
  ],
};

function moduleStatusBadge(value) {
  const cls = value === "TRUE" || value === "Success" ? "success" : value === "FALSE" || value === "Rejected" ? "danger" : "warn";
  return `<span class="module-badge ${cls}">${escapeHtml(value)}</span>`;
}

function moduleTable(headers, rows, options = {}) {
  const body = rows.map((row, index) => {
    const rowClass = options.alertFirst && index === 0 ? "module-row-alert" : options.goodFirst && index === 0 ? "module-row-good" : "";
    return `<tr class="${rowClass}"><td>${index + 1}</td>${row.map((cell, cellIndex) => {
      const isStatus = /^(TRUE|FALSE|Rejected|Success)$/i.test(String(cell));
      const isLink = options.linkColumns?.includes(cellIndex);
      return `<td>${isStatus ? moduleStatusBadge(cell) : isLink ? `<span class="module-link">${escapeHtml(cell)}</span>` : escapeHtml(cell)}</td>`;
    }).join("")}</tr>`;
  }).join("");

  return `<div class="module-table-card"><div class="module-table-wrap"><table class="module-table"><thead><tr><th>#</th>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div></div>`;
}

function moduleHero(pageNumber, title, subtitle, actions = "") {
  return `<div class="module-hero"><div><div class="module-kicker">Screenshot ${pageNumber}</div><div class="module-title">${escapeHtml(title)}</div><div class="module-subtitle">${escapeHtml(subtitle)}</div></div><div class="module-actions">${actions}</div></div>`;
}

function moduleFilters(fields, button = "OK") {
  return `<div class="module-filter">${fields.map((field) => `<div class="module-field"><label>${escapeHtml(field[0])}</label><input type="${field[2] || "text"}" value="${escapeHtml(field[1] || "")}" placeholder="${escapeHtml(field[3] || "")}"></div>`).join("")}<div class="module-filter-actions"><button class="btn btn-primary">${escapeHtml(button)}</button><button class="btn btn-ghost">Reset</button></div></div>`;
}

function moduleMetrics(items) {
  return `<div class="module-grid">${items.map(([label, value]) => `<div class="module-metric"><div class="module-metric-label">${escapeHtml(label)}</div><div class="module-metric-value">${escapeHtml(value)}</div></div>`).join("")}</div>`;
}

function renderTransactionPerMinutePage() {
  const bars = [28, 42, 35, 64, 22, 51, 44, 38, 73, 46, 59, 40, 66, 52, 71, 48, 63, 55, 78, 60, 69, 74, 58, 82];
  const rows = ["17:18", "17:17", "17:16", "17:15", "17:14", "17:13"].map((time, index) => [time, String([18, 18, 12, 15, 12, 16][index]), String([16, 17, 12, 13, 12, 16][index]), String([1, 0, 0, 0, 0, 0][index]), String([1, 1, 0, 2, 0, 0][index]), ["88.89%", "94.44%", "100%", "86.67%", "100%", "100%"][index], `Rp${[3230, 4015, 2750, 3110, 2845, 3915][index]}`]);
  return `
    ${moduleHero(3, "Transaction / Per Minute", "Minute-level traffic, success rate, pending, reversed, and profit.")}
    ${moduleMetrics([["Success Rate", "94.81%"], ["Peak Minute", "18 trx"], ["Pending Rate", "0.8%"], ["Profit", "Rp22.470"]])}
    ${moduleFilters([["Date", "02/06/2026", "date"], ["Start Time", "00:00", "time"], ["End Time", "23:59", "time"], ["Gateway", ""], ["Account", ""], ["Service Code", "", "text", "Contoh: S5"], ["Destination", "", "text", "No. Tujuan"]])}
    <div class="module-chart-card"><div class="module-chart-title">Transaction per Minute - 2026-06-02</div><div class="module-chart">${bars.map((h) => `<div class="module-chart-bar" style="height:${h}%"></div>`).join("")}</div></div>
    ${moduleTable(["Time (HH:MM)", "Total", "Success", "Pending", "Reversed", "Success Rate", "Profit"], rows, { linkColumns: [0] })}
  `;
}

function getReportConfig(type) {
  return {
    monthly: {
      shot: 1,
      title: "Monthly Report",
      subtitle: "Revenue, cost, margin, and status distribution across months.",
      filters: [["Year", "2026"], ["Account", ""], ["Gateway (Supplier)", ""], ["Service Code", ""]],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      traffic: [70100, 60894, 109593, 335949, 425620, 42004],
      revenue: [3.9, 4.1, 8.4, 36.5, 54.5, 5.7],
      cost: [3.92, 4.13, 8.39, 36.45, 54.36, 5.68],
      margin: [0.010, 0.006, 0.016, 0.062, 0.102, 0.010],
      reversed: [6004, 3798, 8263, 18361, 18119, 2236],
      pending: [160, 90, 120, 310, 430, 52],
      rows: moduleRows.reportMonthly,
      peak: "May 2026",
      peakValue: "425,620 traffic",
    },
    daily: {
      shot: 2,
      title: "Daily Report",
      subtitle: "Daily settlement view for selected month and gateway.",
      filters: [["Month", "Jun"], ["Year", "2026"], ["Account", ""], ["Gateway (Supplier)", ""], ["Service Code", ""]],
      labels: ["Jun 01", "Jun 02"],
      traffic: [28682, 13340],
      revenue: [3.87, 1.81],
      cost: [3.87, 1.81],
      margin: [0.0068, 0.0032],
      reversed: [1543, 693],
      pending: [38, 17],
      rows: moduleRows.reportDaily,
      peak: "2026-06-01",
      peakValue: "28,682 traffic",
    },
    hourly: {
      shot: 3,
      title: "Hourly Report",
      subtitle: "Hourly traffic profile and peak transaction window.",
      filters: [["Date", "02/06/2026", "date"], ["Account", ""], ["Gateway (Supplier)", ""], ["Service Code", ""]],
      labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      traffic: [1956, 1424, 702, 66, 51, 104, 218, 207, 274, 923, 1195, 751, 640, 499, 590, 812, 809, 1095, 1038],
      revenue: [220, 204, 132, 14, 18, 21, 43, 40, 52, 103, 166, 96, 71, 60, 66, 106, 98, 119, 273],
      cost: [219, 203, 131, 14, 18, 21, 43, 40, 52, 102, 165, 95, 70, 60, 65, 106, 97, 118, 273],
      margin: [0.19, 0.17, 0.12, 0.02, 0.02, 0.04, 0.08, 0.07, 0.09, 0.18, 0.26, 0.15, 0.12, 0.12, 0.15, 0.21, 0.22, 0.25, 0.22],
      reversed: [288, 57, 31, 2, 1, 3, 8, 6, 10, 34, 39, 19, 16, 13, 21, 32, 30, 51, 55],
      pending: [2, 0, 1, 0, 0, 0, 1, 0, 2, 1, 2, 1, 1, 0, 1, 1, 0, 2, 3],
      rows: moduleRows.reportHourly,
      peak: "00:00",
      peakValue: "1,956 traffic",
    },
  }[type];
}

function reportVisual() {
  return `
    <div class="report-layout">
      <div class="report-card">
        <div class="report-card-header">
          <div class="report-card-title">Revenue / Cost / Margin</div>
          <div class="report-card-note">Revenue trend</div>
        </div>
        <div class="report-canvas-wrap">
          <canvas id="reportRevenueChart"></canvas>
        </div>
      </div>
      <div class="report-card">
        <div class="report-card-header">
          <div class="report-card-title">Counts by Status</div>
          <div class="report-card-note">Success, reversed, pending</div>
        </div>
        <div class="report-canvas-wrap">
          <canvas id="reportStatusChart"></canvas>
        </div>
      </div>
    </div>
  `;
}

function renderReportPage(type) {
  const config = getReportConfig(type);

  return `
    ${moduleHero(config.shot, config.title, config.subtitle, `<button class="btn btn-primary">Export CSV</button><button class="btn btn-ghost">Download PDF</button>`)}
    ${moduleMetrics([["Peak", config.peak], ["Peak Value", config.peakValue], ["Success Rate", "94.81%"], ["Margin", "0.18%"]])}
    ${moduleFilters(config.filters)}
    <div class="report-insight"><strong>Peak transaksi:</strong><span>${escapeHtml(config.peak)} menjadi titik tertinggi pada laporan ini, dengan tren success yang masih stabil.</span></div>
    ${reportVisual()}
    ${moduleTable([type === "hourly" ? "Hour" : type === "daily" ? "Date" : "Month", "Success", "Success Rate", "Reversed", "Revenue", "Cost", "Margin"], config.rows)}
  `;
}

function initReportCharts(type) {
  const config = getReportConfig(type);
  const revenueCanvas = document.getElementById("reportRevenueChart");
  const statusCanvas = document.getElementById("reportStatusChart");
  if (!config || !revenueCanvas || !statusCanvas || typeof Chart === "undefined") return;

  if (reportRevenueChart) reportRevenueChart.destroy();
  if (reportStatusChart) reportStatusChart.destroy();

  const c = getChartColors();
  const success = config.traffic.map((total, index) => Math.max(0, total - config.reversed[index] - config.pending[index]));
  const tooltip = {
    backgroundColor: "#111827",
    titleColor: "#f8fafc",
    bodyColor: "#e5e7eb",
    borderColor: "rgba(148,163,184,0.35)",
    borderWidth: 1,
    padding: 10,
    displayColors: true,
  };

  reportRevenueChart = new Chart(revenueCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: config.labels,
      datasets: [
        {
          label: "Traffic",
          data: config.traffic,
          borderColor: "#4f8cff",
          backgroundColor: "rgba(79,140,255,0.14)",
          borderWidth: 3,
          tension: 0.38,
          fill: true,
          yAxisID: "y",
        },
        {
          label: "Revenue",
          data: config.revenue,
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.08)",
          borderWidth: 2,
          tension: 0.35,
          yAxisID: "y1",
        },
        {
          label: "Margin",
          data: config.margin,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245,158,11,0.08)",
          borderWidth: 2,
          tension: 0.35,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: c.tick, font: { weight: 800 } } },
        tooltip,
      },
      scales: {
        x: { grid: { color: c.grid }, ticks: { color: c.tick } },
        y: { grid: { color: c.grid }, ticks: { color: c.tick }, title: { display: true, text: "Traffic", color: c.tick } },
        y1: { position: "right", grid: { display: false }, ticks: { color: c.tick }, title: { display: true, text: "Rp / Margin", color: c.tick } },
      },
    },
  });

  reportStatusChart = new Chart(statusCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: config.labels,
      datasets: [
        { label: "Success", data: success, backgroundColor: "rgba(34,197,94,0.82)", borderRadius: 6, maxBarThickness: 48, categoryPercentage: 0.58, barPercentage: 0.72 },
        { label: "Reversed", data: config.reversed, backgroundColor: "rgba(249,115,22,0.88)", borderRadius: 6, maxBarThickness: 48, categoryPercentage: 0.58, barPercentage: 0.72 },
        { label: "Pending", data: config.pending, backgroundColor: "rgba(245,158,11,0.9)", borderRadius: 6, maxBarThickness: 48, categoryPercentage: 0.58, barPercentage: 0.72 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: c.tick, font: { weight: 800 } } },
        tooltip,
      },
      scales: {
        x: { stacked: true, grid: { color: c.grid }, ticks: { color: c.tick } },
        y: { stacked: true, grid: { color: c.grid }, ticks: { color: c.tick }, title: { display: true, text: "Traffic Count", color: c.tick } },
      },
    },
  });
}

const modulePages = {
  "rejected-transaction": () => `
    ${moduleHero(1, "Rejected Transaction", "Rejected transaction audit with account, destination, status, and value filters.")}
    ${moduleMetrics([["Rejected Today", "858"], ["Top Reason", "service code invalid"], ["Main Account", "Telin"], ["Last Update", "17:11:05"]])}
    ${moduleFilters([["Date", "02/06/2026", "date"], ["Account", ""], ["RefId", ""], ["Destination", ""]])}
    ${moduleTable(["Time Stamp", "Username", "RefId", "Info", "Code", "Destination", "Status", "Value"], moduleRows.rejected, { alertFirst: true })}
  `,
  "transaction-route": () => `
    ${moduleHero(2, "Transaction / Route", "Gateway route performance with success and reversed distribution.")}
    ${moduleFilters([["Date", "02/06/2026", "date"], ["Account", "bkpay"]])}
    ${moduleTable(["Gateway", "Code", "Gateway Code", "Counts", "Success", "Success Rate", "Reversed", "Reversed Rate"], moduleRows.transactionRoute, { alertFirst: true, linkColumns: [1, 2] })}
  `,
  "transaction-per-minute": renderTransactionPerMinutePage,
  "product-list": () => `
    ${moduleHero(4, "Service / List", "Product catalog with provider, category, active state, and last updater.", `<button class="btn btn-primary">Upload CSV</button><button class="btn btn-ghost">Template CSV</button><a class="module-action-link" href="#">Add New Service</a>`)}
    ${moduleFilters([["Service Code", ""], ["Provider", ""], ["Category", ""]])}
    ${moduleTable(["Category", "Code", "Description", "Denom", "Type", "Provider", "Active", "Last Update", "By"], moduleRows.productList, { linkColumns: [1] })}
  `,
  "product-route": () => `
    ${moduleHero(5, "Service / Route List", "Route mapping by service code, account, and gateway.")}
    ${moduleFilters([["Service Code", ""], ["Account", ""], ["Gateway", ""]])}
    ${moduleTable(["Account", "Code", "Gateway"], moduleRows.productRoute, { linkColumns: [1] })}
  `,
  "check-price": () => `
    ${moduleHero(6, "Service / Check Price", "Compare service price and availability across gateways.")}
    ${moduleFilters([["Source", "Gateway"], ["Service Code", "S100"]])}
    ${moduleTable(["Name", "Code", "Gateway Code", "Price", "Last Update", "By", "Available"], moduleRows.checkPrice, { goodFirst: true, linkColumns: [0] })}
  `,
  "gateway-list": () => `
    ${moduleHero(7, "Gateway / List", "Gateway balance, H2H balance, activity, and update owner.", `<a class="module-action-link" href="#">Add New Gateway</a>`)}
    ${moduleTable(["Name", "Url", "Active", "Balance", "H2H Balance", "Last Update", "By"], moduleRows.gatewayList, { linkColumns: [0] })}
  `,
  "process-list": () => `
    ${moduleHero(8, "Gateway / Process List", "Server and gateway process health in a cleaner monitoring panel.")}
    <pre class="module-terminal">17:21:01 up 113 days, 53 min, 0 users, load average: 0.03, 0.06, 0.02

Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        24G   16G  8.3G  66% /
/dev/sda        100G   35G   60G  38% /data

PID     CPU  MEM  COMMAND
224662  0.0  0.2  target/release/gw-bukalapak-token
224724  0.0  0.1  target/release/gw-bukalapak-trx-pulsa
224729  0.0  0.0  target/release/gw-telin
224739  0.0  0.1  target/release/gw-mba
325104  0.0  0.1  target/release/gw-smb
326223  0.0  0.4  target/release/gw-kisel-apihub</pre>
  `,
  "member-list": () => `
    ${moduleHero(9, "Account / List", "Member account list with IP addresses, balances, and update owner.", `<a class="module-action-link" href="#">Add New Account</a>`)}
    ${moduleTable(["Customer Name", "Username", "ID", "IP Addresses", "Balance", "Min. Balance", "Last Update", "By"], moduleRows.memberList, { linkColumns: [1] })}
  `,
  "member-virtual": () => `
    ${moduleHero(10, "Bank Virtual Accounts", "Virtual account payments with payment status and add-balance flag.")}
    ${moduleFilters([["Date", "01/06/2026", "date"], ["VA Number", ""], ["Account", ""], ["Payment Status", ""], ["External Ref", ""]], "OK")}
    ${moduleTable(["Created At", "Username", "ID", "PG Ref", "Bank", "VA Number", "Paid At", "Status", "Add Balance", "Synced"], moduleRows.memberVirtual)}
  `,
  "admin-administrators": () => `
    ${moduleHero(1, "Administrator / List", "Manage admin users, roles, active status, and ownership.", `<a class="module-action-link" href="#">Add New Administrator</a>`)}
    ${moduleMetrics([["Total Admins", "21"], ["Active", "19"], ["Inactive", "2"], ["Top Role", "Super Admin"]])}
    ${moduleTable(["Name", "Role", "Last Update", "Active", "By", "Action"], moduleRows.administrators, { linkColumns: [0, 5] })}
  `,
  "admin-access-log": () => `
    ${moduleHero(2, "Administrator / Log", "Trace admin activity by date, admin user, and accessed path.")}
    ${moduleFilters([["Date", "02/06/2026", "date"], ["Admin", ""], ["Path", ""]])}
    ${moduleTable(["Datetime", "Admin", "Path"], moduleRows.accessLog, { linkColumns: [2] })}
  `,
  "admin-change-password": () => `
    ${moduleHero(3, "Administrator / Change My Password", "Update the current admin password with confirmation.")}
    <div class="module-filter">
      <div class="module-field"><label>Username</label><input type="text" value="Dito"></div>
      <div class="module-field"><label>Password</label><input type="password" value=""></div>
      <div class="module-field"><label>Confirm Password</label><input type="password" value=""></div>
      <div class="module-filter-actions"><button class="btn btn-primary">Update</button></div>
    </div>
  `,
  "admin-list-pages": () => `
    ${moduleHero(4, "Page / List", "Registered admin pages and permission targets.", `<a class="module-action-link" href="#">Add New Page</a>`)}
    ${moduleTable(["Name", "Last Update", "By", "Links"], moduleRows.pages, { linkColumns: [0, 3] })}
  `,
  "admin-list-role": () => `
    ${moduleHero(5, "Role / List", "Role catalog for administrator permission groups.", `<a class="module-action-link" href="#">Add New Role</a>`)}
    ${moduleTable(["Name", "Last Update", "By", "Action"], moduleRows.roles, { linkColumns: [0, 3] })}
  `,
  "report-monthly": () => renderReportPage("monthly"),
  "report-daily": () => renderReportPage("daily"),
  "report-hourly": () => renderReportPage("hourly"),
};

function renderModulePage(view) {
  const content = document.querySelector(".content");
  if (!content) return;

  if (view === "current-transaction") {
    content.innerHTML = dashboardContentHtml;
    const title = document.querySelector(".topbar-title");
    if (title && dashboardTopbarTitleHtml) title.innerHTML = dashboardTopbarTitleHtml;
    refreshDashboard();
    renderAllAlerts();
    renderPagination();
    initCharts();
    updateHourlyChartFromFilters();
    updateSummaryStats();
    return;
  }

  const render = modulePages[view];
  if (!render) return;
  content.innerHTML = `<div class="module-page fade-in">${render()}</div>`;
  const title = document.querySelector(".topbar-title");
  if (title) title.innerHTML = `${document.querySelector(`[data-view="${view}"] span`)?.textContent || "Module"} <span>02 Jun 2026</span>`;
  if (view.startsWith("report-")) initReportCharts(view.replace("report-", ""));
}

function initModuleNavigation() {
  const content = document.querySelector(".content");
  if (content) dashboardContentHtml = content.innerHTML;
  const title = document.querySelector(".topbar-title");
  if (title) dashboardTopbarTitleHtml = title.innerHTML;

  document.querySelectorAll("[data-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const view = link.dataset.view;
      document.querySelectorAll(".nav-subitem").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      renderModulePage(view);
    });
  });
}

function refreshData() {
  const btn = document.querySelector(".btn-ghost");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.7s linear infinite;"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg> Refreshing...`;
  setTimeout(() => {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg> Refresh`;
  }, 1200);
}

const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);

document.addEventListener("DOMContentLoaded", () => {
  initSidebarGroups();
  initModuleNavigation();
  seedCumulativeFinance();
  populateFilterOptions();
  renderTrx();
  renderTraffic();
  renderAllAlerts();
  renderPagination();
  initCharts();
  updateHourlyChartFromFilters();
  updateSummaryStats();
  simulateLiveTraffic();
  startPendingDemoFeed();
  startClientStopDemoFeed();
  startIncidentAndLossDemoFeed();
});

// Live traffic simulator
let lastTrxId = 2455541;

// Formatting helpers
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

function formatRupiah(amount) {
  return `Rp${Math.round(amount).toLocaleString("id")}`;
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
      desc: `RC ${rc} exceeded IT threshold filter`,
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
    "ShopeePay [H2H]",
    "Tokopedia [API]",
    "Dana [API]",
    "Blibli [H2H]",
    "Traveloka [H2H]",
    "MitraPay [API]",
    "Fastpay [H2H]",
  ];

  const suppliers = [
    "[VSI]",
    "[SMB]",
    "[Indotel]",
    "[Bima Sakti]",
    "[Kisel ApiHub]",
  ];

  const products = ["iPLN", "DANAKH", "TSEL50", "I10", "S25", "iBPJSTK"];
  const statuses = ["Success", "Success", "Success", "Success", "Success", "Reversed", "Failed", "Processing"];
  const status = statusOverride || rand(statuses);
  const resolveStatus = status === "Pending" ? (Math.random() > 0.82 ? "Reversed" : "Success") : null;
  const product = rand(products);
  const supplier = rand(suppliers);
  const client = rand(clients);
  const isBillProduct = product === "iPLN";
  const isLoss = !isBillProduct && status === "Success" && Math.random() > 0.78;
  const marginValue = isBillProduct ? 0 : isLoss ? -(Math.floor(Math.random() * 1600) + 250) : Math.floor(Math.random() * 5) * 100;
  const now = new Date();

  let dur = (Math.random() * 0.5).toFixed(3);
  let reason = "Transaction successful";

  if (status === "Reversed") {
    dur = (Math.random() * 2 + 1).toFixed(3);
    reason = "Supplier timeout";
  }

  if (status === "Failed") {
    dur = (Math.random() * 1.2 + 0.35).toFixed(3);
    reason = "Transaction failed";
  }

  if (status === "Processing") {
    dur = "0.000";
    reason = "Transaction processing";
  }

  if (status === "Pending") {
    dur = "0.000";
    reason = "Waiting for supplier response";
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
    resolveStatus,
  };
}

function ingestTransaction(newTrx) {
  RAW.unshift(newTrx);
  RAW.pop();
  addTransactionToFinance(newTrx);
  trackPendingTransaction(newTrx);
  renderTrx();
  renderPagination();

  const clientName = newTrx.client.split(" ")[0];
  const t = TRAFFIC.find((row) => row.client === clientName) || rand(TRAFFIC);
  const burst = Math.floor(Math.random() * 41) + 10;
  t.lastTrafficAt = Date.now();

  if (newTrx.status === "Success") {
    t.today += burst;
    t.lastTick = burst;
  } else if (newTrx.status === "Reversed") {
    const drop = Math.floor(Math.random() * 8) + 3;
    t.today = Math.max(0, t.today - drop);
    t.lastTick = -drop;
  } else {
    const pendingBump = Math.floor(Math.random() * 26) + 5;
    t.today += pendingBump;
    t.lastTick = pendingBump;
  }

  TRAFFIC.forEach((row) => {
    if (row !== t && Math.random() > 0.72) row.today += Math.floor(Math.random() * 12) + 1;
  });

  renderTraffic();
  updateSummaryStats();
  processAlertRules(newTrx, t);
  if (hasActiveFilters()) updateHourlyChartFromFilters();
  else updateHourlyChart(newTrx.status);
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
    const resolvedAsReversed = (trx.resolveStatus || "Success") === "Reversed";
    trx.status = resolvedAsReversed ? "Reversed" : "Success";
    trx.dur = resolvedAsReversed ? (Math.random() * 2 + 1).toFixed(3) : (Math.random() * 0.45 + 0.08).toFixed(3);
    trx.reason = resolvedAsReversed ? "Supplier timeout" : "Transaction successful";
    delete trx.resolveStatus;
    addTransactionToFinance(trx);
  }

  renderTrx();
  renderPagination();
  updateSummaryStats();
}

// Live traffic simulator timing
function simulateLiveTraffic() {
  function pushIncomingTraffic() {
    if (document.hidden) {
      scheduleNextTraffic();
      return;
    }

    ingestTransaction(buildFakeTransaction("Pending"));
    scheduleNextTraffic();
  }

  function scheduleNextTraffic() {
    const nextDelay = Math.floor(Math.random() * 6500) + 3500; // 3.5s - 10s
    setTimeout(pushIncomingTraffic, nextDelay);
  }

  scheduleNextTraffic();
}
