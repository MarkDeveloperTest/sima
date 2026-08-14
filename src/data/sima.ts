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
  birthdayFallback: '14.08.2002',
  theme: { primary: 'matcha' },

  roles: ['Друг', 'Наставник', 'Лідер молодіжки', 'Майстер ландшафтів', 'Той, хто підвезе'],

  intro: {
    generation: '24-те покоління',
    tagline: 'Версія 24.0. Збирає людей швидше, ніж з’являється план.',
    traitSequence: ['Уміє розсмішити.', 'Не губиться без плану.', 'Бере відповідальність.', 'І пам’ятає, кого ще треба покликати.'],
    availabilityLabel: 'Доступний',
    scrollCue: 'Гортай вниз, щоб почати',
    cta: 'Зустрічайте Сіму',
  },

  hero: {
    title: 'Людина, яка збирає людей.',
    description: 'Від молодіжки до спонтанної поїздки — поруч із ним ніхто не залишається осторонь.',
    placeholder: 'SIMA_HERO',
  },

  stats: [
    { value: '24', label: 'Роки Сіми.', note: '' },
    { value: '∞', label: 'Спонтанні запрошення.', note: '' },
    { value: '1', label: 'Audi, у якій план народжується дорогою.', note: '' },
    { value: 'БАГАТО', label: 'Підлітків, за яких він відповідає.', note: '' },
    { value: 'MAX', label: 'Впевненість.', note: '' },
    { value: 'БІЛЬШЕ, НІЖ ВІН ДУМАЄ', label: 'Життів, у яких він уже залишив добрий слід.', note: '' },
  ],

  photos: [
    { id: 'featured', image: assetUrl('photos/sima-hero.webp'), placeholder: 'SIMA_FEATURED', caption: 'Головний герой.', category: 'Звичайне', featured: true, alt: 'Портрет Сіми серед дерев', objectPosition: '50% 43%' },
    { id: 'terrace-portrait', image: assetUrl('photos/sima-terrace-portrait.webp'), placeholder: 'SIMA_PORTRAIT', caption: 'Режим: спокій.', funnyCaption: 'Статус: усе під контролем.', category: 'Звичайне', featured: false, alt: 'Портрет Сіми на терасі', objectPosition: '67% 43%' },
    { id: 'funny-ground', image: assetUrl('photos/sima-ground-portrait.webp'), placeholder: 'SIMA_FUNNY_01', caption: 'Камера знайшла Сіму раніше, ніж він був готовий.', funnyCaption: 'Ракурс обрано дружбою, не естетикою.', category: 'Сумнівне', featured: false, alt: 'Кумедний портрет Сіми з ракурсу згори', objectPosition: '50% 54%' },
    { id: 'group-evening', image: assetUrl('photos/sima-group-evening.webp'), placeholder: 'SIMA_MEMORY_01', caption: 'Звичайна прогулянка знову стала зустріччю всіх.', funnyCaption: 'У Сіми «кілька людей» має власну математику.', category: 'Спогади', featured: false, alt: 'Сіма робить вечірнє групове селфі', objectPosition: '50% 50%' },
    { id: 'cat', image: assetUrl('photos/sima-with-cat.webp'), placeholder: 'SIMA_LEGENDARY_CAT', caption: 'Два абсолютні авторитети.', funnyCaption: 'Один із них явно не в захваті.', category: 'Легендарне', featured: false, alt: 'Сіма тримає великого сірого кота', objectPosition: '53% 53%' },
    { id: 'dinner-group', image: assetUrl('photos/sima-dinner-group.webp'), placeholder: 'SIMA_MEMORY_02', caption: 'Стіл, за яким команда стає ближчою.', funnyCaption: 'Ідеї закінчилися пізніше, ніж їжа.', category: 'Спогади', featured: false, alt: 'Сіма з компанією друзів за столом', objectPosition: '50% 63%' },
    { id: 'church', image: assetUrl('photos/sima-leadership-stage.webp'), placeholder: 'SIMA_CHURCH', caption: 'Режим лідера.', funnyCaption: 'Коли ведеш — люди відповідають.', category: 'Церква', featured: false, alt: 'Сіма веде молодіжну зустріч зі сцени', objectPosition: '51% 45%' },
    { id: 'restaurant', image: assetUrl('photos/sima-restaurant.webp'), placeholder: 'SIMA_RESTAURANT', caption: 'Навіть замовлення стає спільною справою.', funnyCaption: 'Ніхто не залишився голодним — план спрацював.', category: 'Спогади', featured: false, alt: 'Сіма за столом у ресторані', objectPosition: '32% 48%' },
    { id: 'golden-age', image: assetUrl('photos/sima-golden-age.webp'), placeholder: 'SIMA_CAMPAIGN', caption: 'Sima × Золотий Вік.', funnyCaption: 'Колаборація року.', category: 'Легендарне', featured: false, alt: 'Жартівливий рекламний портрет Сіми з коробкою прикрас', objectPosition: '45% 40%' },
    { id: 'group-night', image: assetUrl('photos/sima-group-night.webp'), placeholder: 'SIMA_MEMORY_03', caption: 'Він якось знову зібрав усіх.', funnyCaption: 'Режим наставника: завжди ввімкнено.', category: 'Спогади', featured: false, alt: 'Сіма з великою групою ввечері', objectPosition: '50% 50%' },
    { id: 'audi', image: assetUrl('photos/sima-audi-memory.webp'), placeholder: 'SIMA_AUDI', caption: 'Технічна нарада.', funnyCaption: 'Пройшла просто на місці.', category: 'Audi', featured: false, alt: 'Сіма з другом біля автомобіля серед дерев', objectPosition: '58% 45%' },
    { id: 'chips', image: assetUrl('photos/sima-chips.webp'), placeholder: 'SIMA_FUNNY_02', caption: 'Чипсовий консиліум.', funnyCaption: 'Два смаки. Нуль поспішних рішень.', category: 'Сумнівне', featured: false, alt: 'Сіма з другом обирають чипси', objectPosition: '52% 45%' },
    { id: 'simaos-loading', image: assetUrl('photos/sima-loading.webp'), placeholder: 'SIMA_LOADING', caption: 'SimaOS ще завантажується.', funnyCaption: 'Фото зроблено на 73%.', category: 'Сумнівне', featured: false, alt: 'Кумедний кадр Сіми з компанією в кімнаті', objectPosition: '52% 46%' },
    { id: 'mirror', image: assetUrl('photos/sima-mirror.webp'), placeholder: 'SIMA_MIRROR', caption: 'Фінальна перевірка перед виходом.', funnyCaption: 'До весільного костюма готовий. До нареченої — ще ні.', category: 'Звичайне', featured: false, alt: 'Сіма з другом фотографуються у дзеркалі', objectPosition: '50% 46%' },
    { id: 'playground', image: assetUrl('photos/sima-playground.webp'), placeholder: 'SIMA_LEGENDARY_01', caption: 'Впевненість — MAX.', funnyCaption: 'Техніка безпеки вийшла з чату.', category: 'Легендарне', featured: false, alt: 'Сіма стоїть на конструкції спортивного майданчика', objectPosition: '62% 39%' },
    { id: 'gold-outfit', image: assetUrl('photos/sima-gold-outfit.webp'), placeholder: 'SIMA_GOLD_MODE', caption: 'Дрескод: із характером.', funnyCaption: 'Скромність була в іншому образі.', category: 'Легендарне', featured: false, alt: 'Сіма з другом у чорно-золотих сценічних образах', objectPosition: '50% 47%' },
    { id: 'trio', image: assetUrl('photos/sima-trio.webp'), placeholder: 'SIMA_MEMORY_04', caption: 'Команда зібрана.', funnyCaption: 'План з’явиться дорогою.', category: 'Спогади', featured: false, alt: 'Сіма з двома друзями після спільного вечора', objectPosition: '50% 45%' },
    { id: 'closeup', image: assetUrl('photos/sima-closeup.webp'), placeholder: 'SIMA_FUNNY_03', caption: 'Фронталка без попередження.', funnyCaption: 'Mentor Mode бачить усе.', category: 'Сумнівне', featured: false, alt: 'Дуже крупний кумедний портрет Сіми в автомобілі', objectPosition: '50% 50%' },
    { id: 'church-costume', image: assetUrl('photos/sima-church-costume.webp'), placeholder: 'SIMA_CHURCH_MODE', caption: 'Церковний режим: активний.', funnyCaption: 'Костюмний пакет встановлено.', category: 'Церква', featured: false, alt: 'Сіма у біблійному сценічному костюмі', objectPosition: '50% 43%' },
  ] satisfies SimaPhoto[],

  specifications: [
    ['Чип', 'Sima 24 Pro'],
    ['Основна функція', 'Лідер'],
    ['Професійна суперсила', 'Перетворювати подвір’я'],
    ['Транспорт', 'Audi A3'],
    ['Впевненість', 'MAX'],
    ['Відповідальність', 'Вмикається автоматично'],
    ['Гумор', 'З’являється раніше за план'],
    ['Координація молодіжки', 'Навіть коли план змінюється'],
    ['Церковний режим', 'Активний ✝'],
    ['Романтичний статус', 'Неодружений. Дівчини немає. Поради іншим — є.'],
    ['Весільний план', 'Друзі готові. Наречена ще не знайдена.'],
    ['Підтримка друзів', 'Безстрокова'],
  ],
  specificationsFootnote: 'У присутності друзів серйозний режим може несподівано поступитися гумору.',

  audi: {
    title: 'Audi A3.',
    designed: 'Завод дав Audi чотири колеса.',
    operated: 'Сіма додав команду, історії й маршрути без чіткого фіналу.',
    placeholder: 'SIMA_AUDI',
    image: assetUrl('photos/sima-audi-memory.webp'),
    alt: 'Сіма з другом біля автомобіля серед дерев',
    objectPosition: '58% 45%',
    facts: [
      ['Старт маршруту', '«Зараз заїду»'],
      ['Пасажири', 'Друзі, яких не залишають добиратися самих.'],
      ['Пункт призначення', 'Уточнюється після старту.'],
      ['Що завжди в салоні', 'Розмови, плани й чиясь важлива історія.'],
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
    serious: 'За жартами про «режим лідера» є те, що я справді ціную.',
    lines: [
      'На тебе можна спертися, навіть коли готового плану ще немає.',
      'Ти береш відповідальність не заради статусу, а заради людей.',
      'Ти пам’ятаєш про тих, кого інші легко можуть не помітити.',
      'Ти збираєш команду й допомагаєш кожному знайти своє місце.',
      'І залишаєшся поруч після того, як увага всіх уже перемкнулася.',
    ],
  },

  mentor: {
    title: 'Друг, у якого вчишся.',
    lines: [
      'Ти показуєш, що сильний характер видно не в гучності, а в послідовності.',
      'У твоїх звичайних рішеннях віра не відділена від відповідальності.',
      'Поруч із тобою дорослішання не звучить як лекція — воно має живий приклад.',
    ],
    notice: 'Я бачу це в тому, як ти ставишся до людей.',
    respect: 'Саме тому твоя дружба для мене — ще й орієнтир.',
  },

  impact: {
    title: 'Твій вплив складається з малих речей.',
    intro: ['Не з одного великого вчинку.', 'Із вільного місця в машині, запрошення в компанію й розмови в потрібний момент.', 'Саме такі речі змінюють людину.'],
    items: [
      { title: 'Ти залишаєш місце поруч.', body: 'Ти запрошуєш так, що люди поруч швидко перестають почуватися гостями.' },
      { title: 'Ти помічаєш раніше, ніж тебе просять.', body: 'Коли комусь потрібна опора, ти береш частину тягаря на себе — без гучних слів і без обов’язку.' },
      { title: 'Твої слова збігаються з учинками.', body: 'Це видно в тому, як ти ведеш молодіжку, тримаєш слово й залишаєшся поруч, коли відповідальність стає незручною.' },
      { title: 'Ти даєш чесні поради про стосунки.', body: 'Ти вмієш вислухати, помітити деталі й сказати правду без зайвого пафосу. У чужих любовних історіях у тебе завжди є мудра порада. Залишилося головне: нарешті почати власну.' },
    ],
    thanks: 'Це не дрібниці. Дякую, бро.',
  },

  faith: {
    title: 'Друг, який став братом.',
    quote: 'Правдивий друг любить за всякого часу, в недолі ж він робиться братом.',
    reference: 'Приповісті 17:17 · переклад Івана Огієнка',
    gratitude: 'Я вдячний Богові за людей, поруч із якими віра стає практичною: у рішенні підвезти, вислухати, зібрати й не залишити людину саму.',
    personal: 'Для мене ти — саме такий друг.',
    blessingTitle: 'Моя молитва за твій 24-й рік.',
    blessing: 'Нехай Бог дає тобі мудрість для людей, яких ти ведеш, силу нести відповідальність, яку береш на себе, і спокій у рішеннях, які приймаєш наодинці.',
    blessingMore: 'Нехай поруч будуть друзі, які підтримають уже тебе, а нові можливості допоможуть розкрити твої дари ще повніше.',
  },

  level24: {
    title: 'РІВЕНЬ ВІДКРИТО',
    system: 'SimaOS 24',
    status: '24-й рік активовано.',
    features: ['Досвід: +1 рік реальних рішень', 'Команда: збирається навіть без готового плану', 'Наставник Mode: працює без перезавантаження', 'Ландшафти: акуратність підвищено', 'Audi: маршрути все ще народжуються дорогою', 'Романтичний квест: запросити дівчину раніше, ніж друзі зроблять це за нього', 'Головне: друзі залишаються в пріоритеті'],
    cta: 'Що нового?',
  },

  insideJokes: [
    { id: 'audi-secret', title: 'Мобільний штаб.', description: 'Audi створила A3. Сіма перетворив її на місце, де можна підвезти друга, зібрати команду й придумати план уже дорогою.', hidden: true, trigger: 'audi' },
    { id: 'level-secret', title: 'SimaOS: Romantic Mode', description: 'Поради для чужих стосунків: рівень експерт. Власні стосунки: користувача «дівчина» ще не знайдено. Статус «неодружений» працює стабільно — але друзі вже чекають оновлення.', hidden: true, trigger: 'age' },
    { id: 'photo-secret', title: 'Архів без контексту.', description: 'Що довше дивишся на ці фото, то ясніше одне: найкращі історії з Сімою починаються без плану.', hidden: true, trigger: 'photo' },
  ] satisfies InsideJoke[],

  songs: [
    { title: 'Dai Dai', artist: 'Shakira & Burna Boy', src: assetUrl('audio/dai-dai-shakira-burna-boy.mp3') },
  ] satisfies Song[],

  finale: {
    oneMoreThing: 'Тепер — без жартів.',
    lines: [
      'За жартами про Audi, SimaOS і режим MAX є дещо важливіше.',
      'Ти створюєш поруч із собою місце, де люди не почуваються зайвими.',
      'Ти показуєш віру не лише словами, а тим, як ставишся до людей.',
      'Ти вмієш повести за собою й водночас залишитися другом.',
      'І я радий бути одним із людей, яких ти колись просто покликав із собою.',
    ],
    gratitude: 'Дякую Богові, що наші дороги перетнулися, бро.',
    birthday: 'З 24-м днем народження, Сімо. ❤️',
    keepBeing: 'Залишайся тим, хто збирає людей і не проходить повз.',
    working: 'Саме такого Сіму я ціную найбільше.',
    cta: 'Святкувати 24',
    reveal: 'З ДНЕМ НАРОДЖЕННЯ, БРО 🎉',
    revealSub: 'Нехай цей рік поверне тобі все добро, яке ти віддаєш іншим.',
    madeFor: 'Зроблено для Сіми — 14.08.2026.',
    madeBecause: 'Одного повідомлення для цього було б замало.',
  },
}

export type SimaConfig = typeof sima
