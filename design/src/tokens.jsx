// Uddala design tokens — palette, type, spacing
// Screenshots lean moviy/toza/minimal — we keep that DNA but strengthen it.

const PALETTES = {
  moviy: {
    name: "Moviy",
    primary: "#1BA9F5",
    primaryDark: "#0B8BD1",
    primaryBg: "#E8F6FE",
    accent: "#0B8BD1",
  },
  yashil: {
    name: "Yashil",
    primary: "#16B378",
    primaryDark: "#0E8E5C",
    primaryBg: "#E7F7F0",
    accent: "#0E8E5C",
  },
  qora: {
    name: "Qora",
    primary: "#111827",
    primaryDark: "#000000",
    primaryBg: "#F3F4F6",
    accent: "#374151",
  },
};

const LANGS = {
  uz: "O‘zbek",
  uz_cyr: "Ўзбек",
  ru: "Русский",
};

// Translation strings
const T = {
  // Onboarding
  tagline: {
    uz: "Ishonchli xodimlar, oson buyurtma",
    uz_cyr: "Ишончли ходимлар, осон буюртма",
    ru: "Надёжные исполнители, простой заказ",
  },
  needService: {
    uz: "Men mijozman",
    uz_cyr: "Мен мижозман",
    ru: "Я клиент",
  },
  needServiceSub: {
    uz: "Ish buyurtma qilaman",
    uz_cyr: "Иш буюртма қиламан",
    ru: "Заказываю работу",
  },
  needJob: {
    uz: "Men ishchiman",
    uz_cyr: "Мен ишчиман",
    ru: "Я работник",
  },
  needJobSub: {
    uz: "Buyurtma qidiraman",
    uz_cyr: "Буюртма қидираман",
    ru: "Ищу заказы",
  },
  phoneTitle: {
    uz: "Telefon raqam",
    uz_cyr: "Телефон рақам",
    ru: "Номер телефона",
  },
  phoneSub: {
    uz: "Ilovadan foydalanish uchun raqamingizni kiriting",
    uz_cyr: "Иловадан фойдаланиш учун рақамингизни киритинг",
    ru: "Введите номер для использования приложения",
  },
  otpTitle: {
    uz: "Raqamni tasdiqlang",
    uz_cyr: "Рақамни тасдиқланг",
    ru: "Подтвердите номер",
  },
  otpSub: {
    uz: "raqamiga kod yubordik",
    uz_cyr: "рақамига код юбордик",
    ru: "мы отправили код",
  },
  next: { uz: "Keyingisi", uz_cyr: "Кейингиси", ru: "Далее" },
  confirm: { uz: "Tasdiqlash", uz_cyr: "Тасдиқлаш", ru: "Подтвердить" },
  resend: {
    uz: "Kodni qayta yuborish",
    uz_cyr: "Кодни қайта юбориш",
    ru: "Отправить код снова",
  },

  // Customer home
  cHomeGreet: {
    uz: "Salom!",
    uz_cyr: "Салом!",
    ru: "Здравствуйте!",
  },
  cHomeSub: {
    uz: "Bugun qanday yordam kerak?",
    uz_cyr: "Бугун қандай ёрдам керак?",
    ru: "Какая помощь нужна сегодня?",
  },
  searchPlaceholder: {
    uz: "Santexnik, elektrik, tozalash...",
    uz_cyr: "Сантехник, электрик, тозалаш...",
    ru: "Сантехник, электрик, уборка...",
  },
  postJob: {
    uz: "Ish e'lon qilish",
    uz_cyr: "Иш эълон қилиш",
    ru: "Опубликовать заказ",
  },
  categories: { uz: "Kategoriyalar", uz_cyr: "Категориялар", ru: "Категории" },
  topMasters: {
    uz: "Sizga yaqin xodimlar",
    uz_cyr: "Сизга яқин ходимлар",
    ru: "Исполнители рядом",
  },
  seeAll: { uz: "Barchasi", uz_cyr: "Барчаси", ru: "Все" },
  home: { uz: "Bosh sahifa", uz_cyr: "Бош саҳифа", ru: "Главная" },
  myJobs: { uz: "Ishlarim", uz_cyr: "Ишларим", ru: "Заказы" },
  messages: { uz: "Xabarlar", uz_cyr: "Хабарлар", ru: "Чаты" },
  profile: { uz: "Profil", uz_cyr: "Профил", ru: "Профиль" },

  // Post job wizard
  step: { uz: "Qadam", uz_cyr: "Қадам", ru: "Шаг" },
  of: { uz: "dan", uz_cyr: "дан", ru: "из" },
  chooseCategory: {
    uz: "Qaysi xizmat kerak?",
    uz_cyr: "Қайси хизмат керак?",
    ru: "Какая услуга нужна?",
  },
  describeJob: {
    uz: "Ishni tasvirlab bering",
    uz_cyr: "Ишни тасвирлаб беринг",
    ru: "Опишите работу",
  },
  jobTitle: {
    uz: "Qisqa sarlavha",
    uz_cyr: "Қисқа сарлавҳа",
    ru: "Короткое название",
  },
  jobDesc: {
    uz: "Batafsil tavsif (muammo nima?)",
    uz_cyr: "Батафсил тавсиф (муаммо нима?)",
    ru: "Подробное описание",
  },
  addPhotos: {
    uz: "Rasm qo‘shish (ixtiyoriy)",
    uz_cyr: "Расм қўшиш (ихтиёрий)",
    ru: "Добавить фото",
  },
  whereAddress: {
    uz: "Manzil va vaqt",
    uz_cyr: "Манзил ва вақт",
    ru: "Адрес и время",
  },
  address: { uz: "Manzil", uz_cyr: "Манзил", ru: "Адрес" },
  when: { uz: "Qachon?", uz_cyr: "Қачон?", ru: "Когда?" },
  today: { uz: "Bugun", uz_cyr: "Бугун", ru: "Сегодня" },
  tomorrow: { uz: "Ertaga", uz_cyr: "Эртага", ru: "Завтра" },
  flexible: { uz: "Tezkor emas", uz_cyr: "Тезкор эмас", ru: "Не срочно" },
  budgetStep: {
    uz: "Budjet",
    uz_cyr: "Бюджет",
    ru: "Бюджет",
  },
  budgetSub: {
    uz: "Taklif kutasizmi yoki aniq narx?",
    uz_cyr: "Таклиф кутасизми ёки аниқ нарх?",
    ru: "Ждёте предложений или фикс?",
  },
  negotiable: { uz: "Kelishiladi", uz_cyr: "Келишилади", ru: "Договорная" },
  fixed: {
    uz: "Aniq summa",
    uz_cyr: "Аниқ сумма",
    ru: "Фиксированная",
  },
  publish: {
    uz: "E'lon qilish",
    uz_cyr: "Эълон қилиш",
    ru: "Опубликовать",
  },
  back: { uz: "Orqaga", uz_cyr: "Орқага", ru: "Назад" },

  // Worker
  wHomeGreet: {
    uz: "Yangi ishlar",
    uz_cyr: "Янги ишлар",
    ru: "Новые заказы",
  },
  wHomeSub: {
    uz: "Sizga mos buyurtmalar",
    uz_cyr: "Сизга мос буюртмалар",
    ru: "Подходящие для вас",
  },
  coins: { uz: "Tanga", uz_cyr: "Танга", ru: "Танга" },
  balance: { uz: "Balans", uz_cyr: "Баланс", ru: "Баланс" },
  topUp: { uz: "To'ldirish", uz_cyr: "Тўлдириш", ru: "Пополнить" },
  bid: { uz: "Taklif yuborish", uz_cyr: "Таклиф юбориш", ru: "Откликнуться" },
  bidCost: {
    uz: "taklif narxi",
    uz_cyr: "таклиф нархи",
    ru: "стоимость отклика",
  },
  tangaShop: {
    uz: "Tanga do‘koni",
    uz_cyr: "Танга дўкони",
    ru: "Купить танга",
  },
  rating: { uz: "Reyting", uz_cyr: "Рейтинг", ru: "Рейтинг" },
  completedJobs: {
    uz: "Tugatilgan ishlar",
    uz_cyr: "Тугатилган ишлар",
    ru: "Выполнено",
  },
  portfolio: { uz: "Portfolio", uz_cyr: "Портфолио", ru: "Портфолио" },
  reviews: { uz: "Sharhlar", uz_cyr: "Шарҳлар", ru: "Отзывы" },
  priceRange: {
    uz: "Narx oralig‘i",
    uz_cyr: "Нарх оралиғи",
    ru: "Диапазон цен",
  },
  distance: { uz: "Masofa", uz_cyr: "Масофа", ru: "Расстояние" },
  km: { uz: "km", uz_cyr: "км", ru: "км" },
  sum: { uz: "so'm", uz_cyr: "сўм", ru: "сум" },
  min: { uz: "min", uz_cyr: "мин", ru: "мин" },

  // Bid sheet
  yourOffer: {
    uz: "Sizning taklifingiz",
    uz_cyr: "Сизнинг таклифингиз",
    ru: "Ваше предложение",
  },
  price: { uz: "Narx", uz_cyr: "Нарх", ru: "Цена" },
  leadtime: {
    uz: "Qachon bajarasiz?",
    uz_cyr: "Қачон бажарасиз?",
    ru: "Когда выполните?",
  },
  message: { uz: "Xabar", uz_cyr: "Хабар", ru: "Сообщение" },
  sendBid: {
    uz: "Taklifni yuborish",
    uz_cyr: "Таклифни юбориш",
    ru: "Отправить",
  },
  willCost: {
    uz: "Bu taklif sizga turadi",
    uz_cyr: "Бу таклиф сизга туради",
    ru: "Отклик будет стоить",
  },

  // Customer: my jobs
  myJobsTitle: {
    uz: "Mening ishlarim",
    uz_cyr: "Менинг ишларим",
    ru: "Мои заказы",
  },
  active: { uz: "Faol", uz_cyr: "Фаол", ru: "Активные" },
  done: { uz: "Bajarilgan", uz_cyr: "Бажарилган", ru: "Завершённые" },
  offersReceived: {
    uz: "ta taklif",
    uz_cyr: "та таклиф",
    ru: "откликов",
  },
  chooseMaster: {
    uz: "Xodimni tanlang",
    uz_cyr: "Ходимни танланг",
    ru: "Выберите исполнителя",
  },
  accept: { uz: "Qabul qilish", uz_cyr: "Қабул қилиш", ru: "Принять" },

  // Misc
  chat: { uz: "Chat", uz_cyr: "Чат", ru: "Чат" },
  send: { uz: "Yuborish", uz_cyr: "Юбориш", ru: "Отправить" },
  typeMessage: {
    uz: "Xabar yozing...",
    uz_cyr: "Хабар ёзинг...",
    ru: "Напишите сообщение...",
  },
  notifications: {
    uz: "Xabarnomalar",
    uz_cyr: "Хабарномалар",
    ru: "Уведомления",
  },
  tgNotif: {
    uz: "Telegramga xabar yuborish",
    uz_cyr: "Телеграмга хабар юбориш",
    ru: "Уведомления в Telegram",
  },
  tgConnected: {
    uz: "Ulangan",
    uz_cyr: "Уланган",
    ru: "Подключено",
  },
  connect: { uz: "Ulash", uz_cyr: "Улаш", ru: "Подключить" },
  verified: {
    uz: "Tasdiqlangan",
    uz_cyr: "Тасдиқланган",
    ru: "Проверен",
  },
  online: { uz: "Onlayn", uz_cyr: "Онлайн", ru: "Онлайн" },

  // Categories
  cat_plumber: { uz: "Santexnik", uz_cyr: "Сантехник", ru: "Сантехник" },
  cat_electric: { uz: "Elektrik", uz_cyr: "Электрик", ru: "Электрик" },
  cat_cleaner: { uz: "Tozalash", uz_cyr: "Тозалаш", ru: "Уборка" },
  cat_repair: { uz: "Ta'mirlash", uz_cyr: "Таъмирлаш", ru: "Ремонт" },
  cat_moving: {
    uz: "Ko‘chish",
    uz_cyr: "Кўчиш",
    ru: "Переезд",
  },
  cat_ac: {
    uz: "Konditsioner",
    uz_cyr: "Кондиционер",
    ru: "Кондиционер",
  },
  cat_furniture: {
    uz: "Mebel",
    uz_cyr: "Мебел",
    ru: "Мебель",
  },
  cat_beauty: {
    uz: "Go‘zallik",
    uz_cyr: "Гўзаллик",
    ru: "Красота",
  },
};

Object.assign(window, { PALETTES, LANGS, T });
