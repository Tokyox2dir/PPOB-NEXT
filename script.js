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

const CLIENT_STOP_NORMAL_MIN = 15;
const CLIENT_STOP_IDLE_MS = 30 * 60 * 1000;
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
const DEMO_PENDING_RESOLVE_MS = 2000;
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

// Render traffic
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
  const failed = countRowsByStatus("Failed");
  const processing = countRowsByStatus("Processing");
  const success = Math.max(0, total - reversed - pending - failed - processing);
  const successPct = total ? ((success / total) * 100).toFixed(1) : "0.0";
  const marginPct = cumulativeRevenue ? ((cumulativeMargin / cumulativeRevenue) * 100).toFixed(2) : "0.00";
  latestSuccessRate = `${successPct}%`;

  document.getElementById("s-total").textContent = total.toLocaleString("id");
  document.getElementById("s-success").textContent = success.toLocaleString("id");
  document.getElementById("s-success-pct").textContent = latestSuccessRate;
  document.getElementById("s-pending").textContent = pending.toLocaleString("id");
  document.getElementById("s-rev").textContent = reversed.toLocaleString("id");
  document.getElementById("s-revenue").textContent = formatMoney(cumulativeRevenue);
  document.getElementById("s-margin").textContent = formatMoney(cumulativeMargin);
  document.getElementById("s-revenue-pct").textContent = "Today";
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

function countRowsByStatus(status) {
  return RAW.filter((row) => row.status === status).length;
}

function calculateRevenue() {
  return RAW.reduce((sum, row) => {
    if (row.status !== "Success") return sum;
    return sum + parseMoney(row.price);
  }, 0);
}

function calculateMargin() {
  return RAW.reduce((sum, row) => {
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
  const tbody = document.getElementById("alert-stop-tbody");
  if (!ALERTS_STOP.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text3); padding:20px 0; font-size:12px;">No client stop detected</td></tr>`;
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
  renderAlertStop();
  renderAlertProduct();
  renderAlertRugi();
  renderAlertBalance();
  updateAlertBadges();
}

function updateAlertBadges() {
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

// Render transaction table
function renderTrx() {
  const tbody = document.getElementById("trx-tbody");
  const start = (currentPage - 1) * pageSize;
  const rowsThisPage = Math.max(0, Math.min(pageSize, TOTAL_TRANSACTION_COUNT - start));
  const visibleRows = Array.from({ length: rowsThisPage }, (_, i) => RAW[(start + i) % RAW.length]);
  tbody.innerHTML = visibleRows
    .map((r, i) => {
      const stcls = r.status.toLowerCase();
      const clientShort = r.client.split(" ")[0];
      const marginClass = parseSignedMoney(r.margin) < 0 ? "loss" : "";
      const rowClass = stcls === "pending" ? "trx-row-pending" : "";
      return `<tr class="${rowClass}">
      <td style="color:var(--text3);font-size:11px;">${start + i + 1}</td>
      <td><span class="trx-id">${r.id}</span></td>
      <td><span class="client-tag">${clientShort}</span></td>
      <td><span class="sup-badge">${r.supplier.replace("[", "").replace("]", "")}</span></td>
      <td><span class="mono-sm" style="color:var(--accent2);">${r.product}</span></td>
      <td><span class="mono-sm">${r.dest}</span></td>
      <td><span class="mono-sm" style="color:var(--text3);">15-05 ${r.time}</span></td>
      <td><span class="mono-sm" style="color:${parseFloat(r.dur) > 0.5 ? "var(--warn)" : "var(--text3)"};">${r.dur}s</span></td>
      <td><span class="price-text">${r.price}</span></td>
      <td><span class="margin-text ${marginClass}">${r.margin}</span></td>
      <td style="color:var(--text3);max-width:120px;overflow:hidden;text-overflow:ellipsis;">${r.reason}</td>
      <td><span class="status-pill ${stcls}">${r.status}</span></td>
    </tr>`;
    })
    .join("");
}

// Pagination
function renderPagination() {
  const wrap = document.getElementById("page-btns");
  const totalPages = Math.ceil(TOTAL_TRANSACTION_COUNT / pageSize);
  const end = Math.min(currentPage * pageSize, TOTAL_TRANSACTION_COUNT);
  const start = (currentPage - 1) * pageSize + 1;
  const pageInfo = document.getElementById("trx-page-info");
  const cardSummary = document.getElementById("trx-card-summary");
  const pageSizeSelect = document.getElementById("page-size");
  if (pageInfo) pageInfo.innerHTML = `Showing <b>${start.toLocaleString("id")}-${end.toLocaleString("id")}</b> of <b>${TOTAL_TRANSACTION_COUNT.toLocaleString("id")}</b> transactions`;
  if (cardSummary) cardSummary.innerHTML = `${TOTAL_TRANSACTION_COUNT.toLocaleString("id")} rows - Page <b style="color:var(--text2);">${currentPage}</b> of ${totalPages.toLocaleString("id")}`;
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
  const totalPages = Math.ceil(TOTAL_TRANSACTION_COUNT / pageSize);
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
    ctx.font = "700 22px 'Space Mono', monospace";
    ctx.fillText(latestSuccessRate, centerX, centerY - 6);
    ctx.fillStyle = styles.getPropertyValue("--text3").trim();
    ctx.font = "600 10px 'DM Sans', sans-serif";
    ctx.fillText("Success Rate", centerX, centerY + 16);
    ctx.restore();
  },
};

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

  const ctxD = document.getElementById("chartDonut").getContext("2d");

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
  seedCumulativeFinance();
  renderTrx();
  renderTraffic();
  renderAllAlerts();
  renderPagination();
  initCharts();
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
  };
}

function ingestTransaction(newTrx) {
  RAW.unshift(newTrx);
  RAW.pop();
  addTransactionToFinance(newTrx);
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
    trx.reason = resolvedAsReversed ? "Supplier timeout" : "Transaction successful";
    addTransactionToFinance(trx);
  }

  renderTrx();
  updateSummaryStats();
}

// Live traffic simulator timing
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
