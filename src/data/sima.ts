export type PhotoCategory =
  | 'Звичайне'
  | 'Легендарне'
  | 'Сумнівне'
  | 'Церква'
  | 'Audi'
  | 'Ландшафт'
  | 'Спогади'

export interface SimaPhoto {
  id: string
  image: string
  placeholder: string
  caption: string
  date: string
  funnyCaption?: string
  category: PhotoCategory
  featured: boolean
  alt: string
  objectPosition?: string
}

export interface InsideJoke {
  id: string
  title: string
  description: string
  image: string
  hidden: boolean
  trigger: 'audi' | 'age' | 'photo'
}

export interface Song {
  title: string
  artist: string
  src: string
}

const assetUrl = (path: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}` : ''

export const sima = {
  name: 'Сіма',
  age: 24,
  birthday: '14.08.2002',
  birthdayFallback: '[ДАТА НАРОДЖЕННЯ]',
  theme: { primary: 'matcha' },

  traits: ['Гумор', 'Впевненість', 'Відповідальність', 'Лідерство', 'Режим наставника'],
  roles: ['Друг', 'Наставник', 'Церковний лідер', 'Ландшафтник', 'Водій Audi A3'],

  intro: {
    introducing: 'Представляємо',
    generation: '24-те покоління',
    tagline: 'Найдосконаліший Сіма на сьогодні.',
    traitSequence: ['Веселий.', 'Впевнений.', 'Відповідальний.', 'І якимось чином відповідальний за всіх нас.'],
    availabilityLabel: 'Доступний',
    scrollCue: 'Гортай вниз, щоб почати',
    cta: 'Зустрічайте Сіму',
  },

  hero: {
    title: 'Створений інакше.',
    description: '24 роки оновлень. І жодних ознак сповільнення.',
    placeholder: 'SIMA_HERO',
  },

  stats: [
    { value: '24', label: 'Роки Сіми.', note: '' },
    { value: '∞', label: 'Спонтанні запрошення.', note: '' },
    { value: '1', label: 'Audi A3.', note: 'Якимось чином — частина особистості.' },
    { value: 'БАГАТО', label: 'Підлітків, за яких він відповідає.', note: '' },
    { value: 'MAX', label: 'Впевненість.', note: '' },
    { value: 'БІЛЬШЕ, НІЖ ВІН ДУМАЄ', label: 'Вплив.', note: '' },
  ],

  photos: [
    { id: 'featured', image: assetUrl('photos/sima-hero.webp'), placeholder: 'SIMA_FEATURED', caption: 'Головний герой.', date: '2026', category: 'Звичайне', featured: true, alt: 'Портрет Сіми серед дерев', objectPosition: '50% 43%' },
    { id: 'terrace-portrait', image: assetUrl('photos/sima-terrace-portrait.webp'), placeholder: 'SIMA_PORTRAIT', caption: 'Режим: спокій.', date: 'СПОГАД', funnyCaption: 'Статус: усе під контролем.', category: 'Звичайне', featured: false, alt: 'Портрет Сіми на терасі', objectPosition: '67% 43%' },
    { id: 'funny-ground', image: assetUrl('photos/sima-ground-portrait.webp'), placeholder: 'SIMA_FUNNY_01', caption: 'Контексту не буде.', date: '2026', funnyCaption: 'Рішення було прийнято.', category: 'Сумнівне', featured: false, alt: 'Кумедний портрет Сіми з ракурсу згори', objectPosition: '50% 54%' },
    { id: 'group-evening', image: assetUrl('photos/sima-group-evening.webp'), placeholder: 'SIMA_MEMORY_01', caption: 'Невелика компанія.', date: 'СПОГАД', funnyCaption: 'Принаймні так було сказано.', category: 'Спогади', featured: false, alt: 'Сіма робить вечірнє групове селфі', objectPosition: '50% 50%' },
    { id: 'cat', image: assetUrl('photos/sima-with-cat.webp'), placeholder: 'SIMA_LEGENDARY_CAT', caption: 'Два абсолютні авторитети.', date: '2026', funnyCaption: 'Один із них явно не в захваті.', category: 'Легендарне', featured: false, alt: 'Сіма тримає великого сірого кота', objectPosition: '53% 53%' },
    { id: 'dinner-group', image: assetUrl('photos/sima-dinner-group.webp'), placeholder: 'SIMA_MEMORY_02', caption: 'Командний брейншторм.', date: 'СПОГАД', funnyCaption: 'Починався як звичайна вечеря.', category: 'Спогади', featured: false, alt: 'Сіма з компанією друзів за столом', objectPosition: '50% 63%' },
    { id: 'church', image: assetUrl('photos/sima-leadership-stage.webp'), placeholder: 'SIMA_CHURCH', caption: 'Режим лідера.', date: 'СПОГАД', funnyCaption: 'Коли ведеш — люди відповідають.', category: 'Церква', featured: false, alt: 'Сіма веде молодіжну зустріч зі сцени', objectPosition: '51% 45%' },
    { id: 'restaurant', image: assetUrl('photos/sima-restaurant.webp'), placeholder: 'SIMA_RESTAURANT', caption: 'Важливі рішення приймаються за столом.', date: '2026', funnyCaption: 'Навіть якщо це просто замовлення.', category: 'Спогади', featured: false, alt: 'Сіма за столом у ресторані', objectPosition: '32% 48%' },
    { id: 'golden-age', image: assetUrl('photos/sima-golden-age.webp'), placeholder: 'SIMA_CAMPAIGN', caption: 'Sima × Золотий Вік.', date: 'СПОГАД', funnyCaption: 'Колаборація року.', category: 'Легендарне', featured: false, alt: 'Жартівливий рекламний портрет Сіми з коробкою прикрас', objectPosition: '45% 40%' },
    { id: 'group-night', image: assetUrl('photos/sima-group-night.webp'), placeholder: 'SIMA_MEMORY_03', caption: 'Він якось знову зібрав усіх.', date: '2024', funnyCaption: 'Режим наставника: завжди ввімкнено.', category: 'Спогади', featured: false, alt: 'Сіма з великою групою ввечері', objectPosition: '50% 50%' },
    { id: 'audi', image: assetUrl('photos/sima-audi-memory.webp'), placeholder: 'SIMA_AUDI', caption: 'Технічна нарада.', date: 'СПОГАД', funnyCaption: 'Пройшла просто на місці.', category: 'Audi', featured: false, alt: 'Сіма з другом біля автомобіля серед дерев', objectPosition: '58% 45%' },
    { id: 'chips', image: assetUrl('photos/sima-chips.webp'), placeholder: 'SIMA_FUNNY_02', caption: 'Вибір, від якого залежить майбутнє.', date: '2026', funnyCaption: 'Обидва варіанти пройшли перевірку Сімою.', category: 'Сумнівне', featured: false, alt: 'Сіма з другом обирають чипси', objectPosition: '52% 45%' },
    { id: 'simaos-loading', image: assetUrl('photos/sima-loading.webp'), placeholder: 'SIMA_LOADING', caption: 'SimaOS ще завантажується.', date: '2024', funnyCaption: 'Фото зроблено на 73%.', category: 'Сумнівне', featured: false, alt: 'Кумедний кадр Сіми з компанією в кімнаті', objectPosition: '52% 46%' },
    { id: 'mirror', image: assetUrl('photos/sima-mirror.webp'), placeholder: 'SIMA_MIRROR', caption: 'Перевірка образу.', date: 'СПОГАД', funnyCaption: 'Дзеркало схвалило.', category: 'Звичайне', featured: false, alt: 'Сіма з другом фотографуються у дзеркалі', objectPosition: '50% 46%' },
    { id: 'playground', image: assetUrl('photos/sima-playground.webp'), placeholder: 'SIMA_LEGENDARY_01', caption: 'Впевненість — MAX.', date: '2026', funnyCaption: 'Техніка безпеки вийшла з чату.', category: 'Легендарне', featured: false, alt: 'Сіма стоїть на конструкції спортивного майданчика', objectPosition: '62% 39%' },
    { id: 'gold-outfit', image: assetUrl('photos/sima-gold-outfit.webp'), placeholder: 'SIMA_GOLD_MODE', caption: 'Дрескод: із характером.', date: 'СПОГАД', funnyCaption: 'Скромність була в іншому образі.', category: 'Легендарне', featured: false, alt: 'Сіма з другом у чорно-золотих сценічних образах', objectPosition: '50% 47%' },
    { id: 'trio', image: assetUrl('photos/sima-trio.webp'), placeholder: 'SIMA_MEMORY_04', caption: 'Команда зібрана.', date: '2026', funnyCaption: 'План з’явиться дорогою.', category: 'Спогади', featured: false, alt: 'Сіма з двома друзями після спільного вечора', objectPosition: '50% 45%' },
    { id: 'closeup', image: assetUrl('photos/sima-closeup.webp'), placeholder: 'SIMA_FUNNY_03', caption: 'Фронталка без попередження.', date: 'СПОГАД', funnyCaption: 'Mentor Mode бачить усе.', category: 'Сумнівне', featured: false, alt: 'Дуже крупний кумедний портрет Сіми в автомобілі', objectPosition: '50% 50%' },
    { id: 'church-costume', image: assetUrl('photos/sima-church-costume.webp'), placeholder: 'SIMA_CHURCH_MODE', caption: 'Церковний режим: активний.', date: '2024', funnyCaption: 'Костюмний пакет встановлено.', category: 'Церква', featured: false, alt: 'Сіма у біблійному сценічному костюмі', objectPosition: '50% 43%' },
  ] satisfies SimaPhoto[],

  specifications: [
    ['Чип', 'Sima 24 Pro'],
    ['Основна функція', 'Лідер'],
    ['Додаткова функція', 'Ландшафтник'],
    ['Транспорт', 'Audi A3'],
    ['Впевненість', 'MAX'],
    ['Відповідальність', 'Невиправдано висока'],
    ['Гумор', 'Залежить від контексту.'],
    ['Нагляд за підлітками', 'Завжди ввімкнено'],
    ['Церковний режим', 'Активний ✝'],
    ['Підтримка ПЗ', '24 роки й далі'],
  ],
  specificationsFootnote: 'Показники відповідальності можуть знижуватися в оточенні підлітків.',

  audi: {
    title: 'Audi A3.',
    designed: 'Створено Audi.',
    operated: 'Керує Сіма.',
    placeholder: 'SIMA_AUDI',
    image: assetUrl('photos/sima-audi-memory.webp'),
    alt: 'Сіма з другом біля автомобіля серед дерев',
    objectPosition: '58% 45%',
    facts: [
      ['Водій', 'Сіма'],
      ['Пасажири', 'Зазвичай хтось, кого він кудись запросив.'],
      ['Пункт призначення', 'Розберемося по дорозі.'],
      ['Режим відповідальності', 'Увімкнено'],
    ],
  },

  landscaping: {
    title: 'Він торкається трави професійно.',
    punchline: 'Буквально.',
    brand: 'Ландшафти від Сіми™',
    before: { image: assetUrl('photos/sima-landscape-before.webp'), placeholder: 'SIMA_LANDSCAPING_BEFORE', label: 'До Сіми' },
    after: { image: assetUrl('photos/sima-landscape-after.webp'), placeholder: 'SIMA_LANDSCAPING_AFTER', label: 'Після Сіми' },
  },

  leadership: {
    label: 'РЕЖИМ ЛІДЕРА',
    title: 'Хтось має тримати нас при житті.',
    punchline: 'Схоже, це Сіма.',
    serious: 'А якщо серйозно.',
    lines: [
      'Ти — людина, на яку можна покластися.',
      'Ти береш відповідальність.',
      'Ти піклуєшся про нас.',
      'Ти ведеш за собою.',
      'І робиш це навіть тоді, коли ніхто особливо не помічає.',
    ],
  },

  mentor: {
    title: 'Більше, ніж друг.',
    lines: [
      'Ти став людиною, на яку я можу рівнятися.',
      'Ти запрошуєш мене з собою.',
      'Ти залучаєш мене.',
      'Ти береш відповідальність за мене й решту з нас, навіть коли не мусиш.',
    ],
    notice: 'Я помічаю це.',
    respect: 'І поважаю тебе за це.',
  },

  impact: {
    title: 'Більше, ніж ти, мабуть, думаєш.',
    intro: ['Ти вплинув на моє життя.', 'Не через один величезний момент.', 'А через всі ті маленькі.'],
    items: [
      { title: 'Ти залучаєш мене.', body: 'Ти запрошуєш мене й даєш відчути, що я справді є частиною всього.' },
      { title: 'Ти піклуєшся про мене.', body: 'Ти брав за мене відповідальність, хоча не був зобов’язаний.' },
      { title: 'Ти ведеш власним прикладом.', body: 'Бачити, як старший бере відповідальність, веде людей і залишається поруч, — це теж мене вчить.' },
    ],
    thanks: 'Дякую, бро.',
  },

  faith: {
    title: 'Залізо гострить залізо.',
    quote: 'Як залізо гострить залізо, так людина гострить ближнього свого.',
    reference: 'Приповісті 27:17',
    gratitude: 'Я вдячний Богові за людей, які впливають на мене, кидають мені виклик і допомагають рости.',
    personal: 'Ти — один із них.',
    blessingTitle: 'Нехай Бог благословить твій наступний рік.',
    blessing: 'Нехай Бог дає тобі мудрість у кожному рішенні, силу для кожної відповідальності, правильних людей поруч і можливості, більші за твої очікування.',
    blessingMore: 'І нехай Він далі використовує тебе, щоб впливати на людей — навіть на тих, хто нечасто каже, що ти змінив щось у їхньому житті.',
  },

  level24: {
    title: 'РІВЕНЬ ВІДКРИТО',
    system: 'SimaOS 24',
    status: 'Успішно встановлено.',
    features: ['+1 рік досвіду', 'Покращене лідерство', 'Посилена ландшафтна продуктивність', 'Той самий Audi', 'Більше відповідальності', 'Впевненість — покращувати вже нікуди'],
    cta: 'Що нового',
  },

  insideJokes: [
    { id: 'audi-secret', title: 'Жарт про Audi', description: 'Тут буде ваш внутрішній жарт про Audi.', image: '', hidden: true, trigger: 'audi' },
    { id: 'level-secret', title: 'Секретний рівень', description: 'Тут буде жарт, який відкривається п’ятьма натисканнями на 24.', image: '', hidden: true, trigger: 'age' },
    { id: 'photo-secret', title: 'За кадром', description: 'Тут буде історія, прихована за фотографією.', image: '', hidden: true, trigger: 'photo' },
  ] satisfies InsideJoke[],

  songs: [
    { title: 'Dai Dai', artist: 'Shakira & Burna Boy', src: assetUrl('audio/dai-dai-shakira-burna-boy.mp3') },
    { title: 'Shakira & Burna Boy', artist: 'Додайте точну назву', src: '' },
    { title: 'GIRL LIKE ME', artist: 'Black Eyed Peas & Shakira', src: '' },
  ] satisfies Song[],

  finale: {
    oneMoreThing: 'І ще дещо.',
    lines: [
      'Я, мабуть, нечасто це кажу.',
      'Але я щиро вдячний, що ти є в моєму житті.',
      'Я поважаю тебе як друга, як лідера і як людину, на яку можу рівнятися.',
      'Дякую, що залучаєш мене.',
      'Дякую, що піклуєшся про мене.',
      'Дякую, що є людиною, в якої я можу вчитися.',
    ],
    gratitude: 'Я вдячний Богові за тебе, бро.',
    birthday: 'З 24-м днем народження, Сіма. ❤️',
    keepBeing: 'Продовжуй бути Сімою.',
    working: 'Це поки працює доволі добре. 😂',
    cta: 'Остання річ',
    reveal: 'ПОЇХАЛИ, БРО 🎉',
    revealSub: '24 тобі пасує.',
    madeFor: 'Зроблено для Сіми.',
    madeBecause: 'Бо деякі люди заслуговують на більше, ніж повідомлення.',
  },
}

export type SimaConfig = typeof sima
