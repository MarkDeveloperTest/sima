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

export const sima = {
  name: 'Сіма',
  age: 24,
  birthday: '',
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
    { id: 'featured', image: '', placeholder: 'SIMA_FEATURED', caption: 'Головний герой.', date: 'РІК', category: 'Звичайне', featured: true, alt: 'Головне фото Сіми' },
    { id: 'funny-01', image: '', placeholder: 'SIMA_FUNNY_01', caption: 'Контексту не буде.', date: 'РІК', funnyCaption: 'Рішення було прийнято.', category: 'Сумнівне', featured: false, alt: 'Веселе фото Сіми' },
    { id: 'church', image: '', placeholder: 'SIMA_CHURCH', caption: 'Режим лідера.', date: 'РІК', category: 'Церква', featured: false, alt: 'Фото Сіми в церкві або з групою' },
    { id: 'memory-01', image: '', placeholder: 'SIMA_MEMORY_01', caption: 'Один із тих моментів.', date: 'РІК', category: 'Спогади', featured: false, alt: 'Спільний спогад із Сімою' },
    { id: 'audi', image: '', placeholder: 'SIMA_AUDI', caption: 'Інша частина особистості.', date: 'РІК', category: 'Audi', featured: false, alt: 'Audi A3 Сіми' },
    { id: 'landscape', image: '', placeholder: 'SIMA_LANDSCAPING', caption: 'Трава, але професійно.', date: 'РІК', category: 'Ландшафт', featured: false, alt: 'Ландшафтна робота Сіми' },
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
    before: { image: '', placeholder: 'SIMA_LANDSCAPING_BEFORE', label: 'До Сіми' },
    after: { image: '', placeholder: 'SIMA_LANDSCAPING_AFTER', label: 'Після Сіми' },
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
    { title: 'Dai Dai', artist: 'Додайте виконавця', src: '' },
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
