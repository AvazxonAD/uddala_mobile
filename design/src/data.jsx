// Seed data — categories, workers, jobs, reviews, messages

const CATEGORIES = [
  { id: "plumber", key: "cat_plumber", emoji: null, color: "#1BA9F5", icon: "💧" },
  { id: "electric", key: "cat_electric", color: "#F5B700", icon: "⚡" },
  { id: "cleaner", key: "cat_cleaner", color: "#16B378", icon: "🧼" },
  { id: "repair", key: "cat_repair", color: "#B23CE0", icon: "🔧" },
  { id: "moving", key: "cat_moving", color: "#F57C1B", icon: "📦" },
  { id: "ac", key: "cat_ac", color: "#06B6D4", icon: "❄️" },
  { id: "furniture", key: "cat_furniture", color: "#8B5CF6", icon: "🪑" },
  { id: "beauty", key: "cat_beauty", color: "#EC4899", icon: "✂️" },
];

const WORKERS = [
  {
    id: "w1",
    name: "Akmal Usmonov",
    initials: "AU",
    color: "#1BA9F5",
    category: "plumber",
    rating: 4.9,
    reviewCount: 127,
    completed: 342,
    priceFrom: 80000,
    priceTo: 450000,
    distanceKm: 1.2,
    verified: true,
    online: true,
    portfolio: [
      { label: "Oshxona santexnika\nKelvinator, Yunusobod", tone: "primary" },
      { label: "Vanna almashtirish\n3 xonali uy", tone: "neutral" },
      { label: "Kran montaj\nMirzo Ulug‘bek", tone: "warm" },
    ],
    bio: "10 yillik tajriba. Sertifikat bor. Kafolat beraman.",
  },
  {
    id: "w2",
    name: "Bekzod Rahmatov",
    initials: "BR",
    color: "#16B378",
    category: "electric",
    rating: 4.8,
    reviewCount: 89,
    completed: 210,
    priceFrom: 60000,
    priceTo: 380000,
    distanceKm: 2.4,
    verified: true,
    online: false,
    portfolio: [
      { label: "Elektr montaj\nYangi uy", tone: "primary" },
      { label: "LED shiftlar\nChilonzor tumani", tone: "neutral" },
    ],
    bio: "Yangi ob’ektlar, ta'mirlash, avariya chaqiruvlari 24/7.",
  },
  {
    id: "w3",
    name: "Malika Karimova",
    initials: "MK",
    color: "#EC4899",
    category: "cleaner",
    rating: 5.0,
    reviewCount: 203,
    completed: 512,
    priceFrom: 120000,
    priceTo: 600000,
    distanceKm: 3.1,
    verified: true,
    online: true,
    portfolio: [
      { label: "General tozalash\n3 xonali kvartira", tone: "primary" },
      { label: "Ofis tozalash\nTashkent City", tone: "neutral" },
      { label: "Ko‘chish keyin\nOqsaroy", tone: "warm" },
    ],
    bio: "Jamoa bilan tozalash xizmati. Eko vositalardan foydalanamiz.",
  },
  {
    id: "w4",
    name: "Sardor Tursunov",
    initials: "ST",
    color: "#F5B700",
    category: "ac",
    rating: 4.7,
    reviewCount: 54,
    completed: 143,
    priceFrom: 150000,
    priceTo: 900000,
    distanceKm: 4.8,
    verified: false,
    online: true,
    portfolio: [
      { label: "Konditsioner o‘rnatish\nSplit tizim", tone: "primary" },
      { label: "Freon zaryad\nYunusobod", tone: "neutral" },
    ],
    bio: "Konditsioner o‘rnatish, tozalash, ta'mirlash. Barcha brendlar.",
  },
];

const JOBS = [
  {
    id: "j1",
    title: "Kranni almashtirish kerak",
    desc: "Oshxonada kran oqmoqda, yangisiga almashtirish kerak. Kran o‘zim olaman.",
    category: "plumber",
    budget: 200000,
    budgetType: "negotiable",
    address: "Mirzo Ulug‘bek, Tashkent",
    distanceKm: 1.8,
    postedAt: "15 min",
    photos: 2,
    bidsCount: 4,
    urgency: "today",
    authorName: "Dilshod A.",
    authorInitials: "DA",
  },
  {
    id: "j2",
    title: "Kvartirani general tozalash",
    desc: "3 xonali, 95m². Ko‘chib kelganman, hamma joy tozalash kerak.",
    category: "cleaner",
    budget: 450000,
    budgetType: "fixed",
    address: "Yunusobod 12-kvartal",
    distanceKm: 3.4,
    postedAt: "1 soat",
    photos: 0,
    bidsCount: 7,
    urgency: "tomorrow",
    authorName: "Gulnora S.",
    authorInitials: "GS",
  },
  {
    id: "j3",
    title: "Rozetkalar ishlamay qoldi",
    desc: "Zalda 3 ta rozetka ishlamayapti. Tekshirib, tuzatish kerak.",
    category: "electric",
    budget: 150000,
    budgetType: "negotiable",
    address: "Chilonzor 9",
    distanceKm: 5.2,
    postedAt: "2 soat",
    photos: 1,
    bidsCount: 3,
    urgency: "today",
    authorName: "Rustam K.",
    authorInitials: "RK",
  },
  {
    id: "j4",
    title: "Konditsioner o‘rnatish — 2 dona",
    desc: "2 ta split konditsioner o‘rnatish. Konditsionerlar yetkazib berildi.",
    category: "ac",
    budget: 800000,
    budgetType: "fixed",
    address: "Tashkent City Gardens",
    distanceKm: 6.1,
    postedAt: "4 soat",
    photos: 3,
    bidsCount: 2,
    urgency: "flexible",
    authorName: "Laziz H.",
    authorInitials: "LH",
  },
  {
    id: "j5",
    title: "Mebel yig‘ish — shkaf + stol",
    desc: "IKEA shkafi (3 qismli) va yozuv stoli yig‘ilishi kerak.",
    category: "furniture",
    budget: 250000,
    budgetType: "negotiable",
    address: "Sergeli, Tashkent",
    distanceKm: 8.2,
    postedAt: "Kecha",
    photos: 2,
    bidsCount: 5,
    urgency: "tomorrow",
    authorName: "Nilufar J.",
    authorInitials: "NJ",
  },
];

// Customer's own jobs (for "Mening ishlarim")
const MY_JOBS = [
  {
    ...JOBS[0],
    id: "my1",
    title: "Vanna oqishini to‘xtatish",
    desc: "Vannada kran oqmoqda, uzoq vaqt ishlamayapti.",
    category: "plumber",
    budget: 180000,
    budgetType: "negotiable",
    address: "Mirzo Ulug‘bek, Tashkent",
    postedAt: "10 min",
    bidsCount: 5,
    status: "active",
    bids: [
      { workerId: "w1", price: 150000, message: "Bugun 16:00 da kelaman. Materiallar bilan.", etaText: "Bugun 16:00" },
      { workerId: "w2", price: 180000, message: "Ertalab 10:00 gacha hal qilaman.", etaText: "Ertaga 10:00" },
    ],
  },
  {
    id: "my2",
    title: "Kvartirani tozalash",
    category: "cleaner",
    budget: 400000,
    budgetType: "fixed",
    address: "Yunusobod",
    postedAt: "2 kun",
    bidsCount: 0,
    status: "done",
    acceptedWorker: "w3",
  },
];

const MESSAGES = [
  {
    id: "m1",
    workerId: "w1",
    lastMessage: "Bugun 16:00 da kelaman, ko‘rishguncha!",
    unread: 2,
    time: "14:32",
  },
  {
    id: "m2",
    workerId: "w2",
    lastMessage: "Xarid ro‘yxati tayyorlab bering iltimos",
    unread: 0,
    time: "Kecha",
  },
  {
    id: "m3",
    workerId: "w3",
    lastMessage: "Rahmat! 5 yulduz qoldirdim",
    unread: 0,
    time: "28 may",
  },
];

const CHAT_THREAD = [
  {
    who: "worker",
    text: "Assalomu alaykum! Taklifingizni oldim. Bugun kelaman mi?",
    time: "14:12",
  },
  {
    who: "me",
    text: "Valeykum assalom. Ha, soat 16:00 da bo‘lsangiz bo‘ladi.",
    time: "14:15",
  },
  {
    who: "worker",
    text: "Yaxshi. Kran o‘zingizda bormi yoki men olib kelaymi?",
    time: "14:20",
  },
  {
    who: "me",
    text: "Kran bor. Boshqa material kerak bo‘lsa ayting.",
    time: "14:25",
  },
  {
    who: "worker",
    text: "Bugun 16:00 da kelaman, ko‘rishguncha!",
    time: "14:32",
  },
];

const REVIEWS = [
  {
    by: "Dilshod A.",
    initials: "DA",
    rating: 5,
    text: "Juda tez va sifatli bajardi. Albatta yana chaqiraman.",
    time: "2 kun oldin",
  },
  {
    by: "Gulnora S.",
    initials: "GS",
    rating: 5,
    text: "Vaqtida keldi, hamma narsani aniq tushuntirdi. Rahmat!",
    time: "1 hafta oldin",
  },
  {
    by: "Rustam K.",
    initials: "RK",
    rating: 4,
    text: "Ish yaxshi, lekin biroz kechikdi.",
    time: "2 hafta oldin",
  },
];

// Tanga packages
const TANGA_PACKS = [
  { coins: 10, price: 15000, badge: null },
  { coins: 30, price: 40000, badge: "+3" },
  { coins: 70, price: 85000, badge: "Ommabop" },
  { coins: 150, price: 170000, badge: "+25" },
];

function formatSum(n, lang = "uz") {
  const suffix = lang === "ru" ? "сум" : "so'm";
  return n.toLocaleString("ru-RU").replace(/,/g, " ") + " " + suffix;
}

Object.assign(window, {
  CATEGORIES,
  WORKERS,
  JOBS,
  MY_JOBS,
  MESSAGES,
  CHAT_THREAD,
  REVIEWS,
  TANGA_PACKS,
  formatSum,
});
