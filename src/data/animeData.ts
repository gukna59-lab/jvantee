export interface Anime {
  id: number;
  title: string;
  rating: number;
  rank: number;
  img: string;
  type: 'РЎРµСЂРёР°Р»С‹' | 'Р¤РёР»СЊРјС‹' | 'ONA';
  plot: string;
  screenshots: string[];
  episodes: number;
  voiceovers: string[];
  videoSrc: string;
}

const demoVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
];

const img = (seed: string) => `https://picsum.photos/seed/jvante-${seed}/600/840`;
const shot = (seed: string, index: number) => `https://picsum.photos/seed/jvante-${seed}-shot-${index}/1280/720`;

const makeShots = (seed: string) => [shot(seed, 1), shot(seed, 2), shot(seed, 3)];

const longPlot = (base: string, extra: string) =>
  `${base} ${extra} История раскрывается через выборы героев, цену силы и попытки сохранить себя в мире, где доверие дается тяжело. В каждой арке есть место драме, напряжению, дружбе и моментам, которые меняют взгляд персонажей на цель, ради которой они продолжают идти вперед.`;

export const animeData: Anime[] = [
  {
    id: 1,
    title: 'Атака титанов',
    rating: 9.1,
    rank: 1,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('attack-titan'),
    plot: longPlot('Люди живут за огромными стенами, спасаясь от титанов, но внезапное нападение разрушает привычный порядок.', 'Эрен, Микаса и Армин оказываются внутри войны, где враг постепенно перестает быть простым чудовищем.'),
    screenshots: makeShots('attack-titan'),
    episodes: 25,
    voiceovers: ['AniLibria', 'Студийная Банда', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 2,
    title: 'Тетрадь смерти',
    rating: 8.9,
    rank: 2,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('death-note'),
    plot: longPlot('Школьник Лайт находит тетрадь, способную убивать людей по имени, и решает построить идеальный мир.', 'Его противником становится детектив L, а их интеллектуальная дуэль быстро превращается в опасную игру без права на ошибку.'),
    screenshots: makeShots('death-note'),
    episodes: 37,
    voiceovers: ['2x2', 'Любительская', 'Субтитры'],
    videoSrc: demoVideos[1]
  },
  {
    id: 3,
    title: 'Стальной алхимик: Братство',
    rating: 9.1,
    rank: 3,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('fullmetal'),
    plot: longPlot('Братья Элрики пытаются вернуть тела после запретной алхимии, которая забрала у них слишком многое.', 'Путь за философским камнем приводит их к тайнам государства, войне, вине взрослых и собственному взрослению.'),
    screenshots: makeShots('fullmetal'),
    episodes: 64,
    voiceovers: ['AniDub', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[2]
  },
  {
    id: 4,
    title: 'Унесенные призраками',
    rating: 8.6,
    rank: 4,
    type: 'Р¤РёР»СЊРјС‹',
    img: img('spirited-away'),
    plot: longPlot('Тихиро попадает в мир духов, где ее родители превращены, а каждый шаг требует смелости и внимательности.', 'Работая в бане ведьмы Юбабы, девочка учится не терять имя, память и чувство добра.'),
    screenshots: makeShots('spirited-away'),
    episodes: 1,
    voiceovers: ['Дубляж', 'Субтитры'],
    videoSrc: demoVideos[3]
  },
  {
    id: 5,
    title: 'Твое имя',
    rating: 8.4,
    rank: 5,
    type: 'Р¤РёР»СЊРјС‹',
    img: img('your-name'),
    plot: longPlot('Парень из Токио и девушка из провинциального города начинают просыпаться в телах друг друга.', 'Сначала это похоже на странную шутку судьбы, но вскоре их связь становится ключом к событию, которое нельзя игнорировать.'),
    screenshots: makeShots('your-name'),
    episodes: 1,
    voiceovers: ['Дубляж', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 6,
    title: 'Киберпанк: Бегущие по краю',
    rating: 8.3,
    rank: 6,
    type: 'ONA',
    img: img('edgerunners'),
    plot: longPlot('В Найт-Сити подросток Дэвид теряет опору и входит в мир наемников, имплантов и быстрых денег.', 'Команда Люси дает ему шанс стать кем-то большим, но город безжалостно забирает долги у каждого мечтателя.'),
    screenshots: makeShots('edgerunners'),
    episodes: 10,
    voiceovers: ['Red Head Sound', 'Субтитры'],
    videoSrc: demoVideos[1]
  },
  {
    id: 7,
    title: 'Ванпанчмен',
    rating: 8.7,
    rank: 7,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('one-punch'),
    plot: longPlot('Сайтама настолько силен, что побеждает любого противника одним ударом и страдает от скуки.', 'За комедией о непобедимом герое скрывается история о признании, одиночестве и поиске смысла в собственном таланте.'),
    screenshots: makeShots('one-punch'),
    episodes: 12,
    voiceovers: ['JAM', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[2]
  },
  {
    id: 8,
    title: 'Евангелион',
    rating: 8.5,
    rank: 8,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('eva'),
    plot: longPlot('Подростки пилотируют гигантских роботов, чтобы защитить Землю от загадочных Ангелов.', 'Но главная битва идет не только снаружи: страх, одиночество и ожидания взрослых давят сильнее любой брони.'),
    screenshots: makeShots('eva'),
    episodes: 26,
    voiceovers: ['Dub', 'Субтитры'],
    videoSrc: demoVideos[3]
  },
  {
    id: 9,
    title: 'Врата Штейна',
    rating: 8.8,
    rank: 9,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('steins-gate'),
    plot: longPlot('Группа друзей случайно открывает способ отправлять сообщения в прошлое.', 'Игра с причиной и следствием быстро ломает привычную реальность, заставляя героев платить за каждое изменение.'),
    screenshots: makeShots('steins-gate'),
    episodes: 24,
    voiceovers: ['AniDub', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 10,
    title: 'Ходячий замок',
    rating: 8.2,
    rank: 10,
    type: 'Р¤РёР»СЊРјС‹',
    img: img('howl'),
    plot: longPlot('Софи превращают в старуху, и она отправляется в странствие вместе с загадочным волшебником Хаулом.', 'Волшебный замок становится домом для людей, которые прячут раны за масками, но постепенно учатся выбирать любовь вместо страха.'),
    screenshots: makeShots('howl'),
    episodes: 1,
    voiceovers: ['Дубляж', 'Субтитры'],
    videoSrc: demoVideos[1]
  },
  {
    id: 11,
    title: 'Человек-бензопила',
    rating: 8.4,
    rank: 11,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('chainsaw'),
    plot: longPlot('Дэндзи живет в долгах и охотится на демонов вместе с Почитой, пока трагедия не меняет его тело и судьбу.', 'Попав в Бюро общественной безопасности, он сталкивается с властью, желанием нормальной жизни и людьми, которым сложно доверять.'),
    screenshots: makeShots('chainsaw'),
    episodes: 12,
    voiceovers: ['AniLibria', 'Студийная Банда', 'Субтитры'],
    videoSrc: demoVideos[2]
  },
  {
    id: 12,
    title: 'Магическая битва',
    rating: 8.6,
    rank: 12,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('jujutsu'),
    plot: longPlot('Юдзи Итадори проглатывает проклятый палец и становится сосудом для опасного Сукуны.', 'Школа магии открывает ему мир проклятий, где смелость помогает выжить, но за каждый спасенный шанс приходится платить.'),
    screenshots: makeShots('jujutsu'),
    episodes: 24,
    voiceovers: ['AniLibria', 'Crunchyroll', 'Субтитры'],
    videoSrc: demoVideos[3]
  },
  {
    id: 13,
    title: 'Клинок, рассекающий демонов',
    rating: 8.7,
    rank: 13,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('demon-slayer'),
    plot: longPlot('Тандзиро теряет семью, а его сестра Нэдзуко становится демоном, сохранив человеческое сердце.', 'Он вступает в корпус охотников, чтобы найти лекарство и остановить тех, кто превращает горе людей в оружие.'),
    screenshots: makeShots('demon-slayer'),
    episodes: 26,
    voiceovers: ['AniDub', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 14,
    title: 'Волейбол!!',
    rating: 8.8,
    rank: 14,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('haikyuu'),
    plot: longPlot('Невысокий Хината мечтает стать звездой волейбола и попадает в команду Карасуно.', 'Соперничество с Кагэямой превращается в партнерство, а каждое очко становится проверкой характера всей команды.'),
    screenshots: makeShots('haikyuu'),
    episodes: 25,
    voiceovers: ['AniLibria', 'Субтитры'],
    videoSrc: demoVideos[1]
  },
  {
    id: 15,
    title: 'Моя геройская академия',
    rating: 8.0,
    rank: 15,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('hero-academia'),
    plot: longPlot('В мире, где почти у всех есть сверхспособности, Изуку рождается без причуды, но мечтает стать героем.', 'Получив шанс от Всемогущего, он учится понимать, что героизм измеряется не только силой, но и ответственностью.'),
    screenshots: makeShots('hero-academia'),
    episodes: 13,
    voiceovers: ['AniDub', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[2]
  },
  {
    id: 16,
    title: 'Ван-Пис',
    rating: 9.0,
    rank: 16,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('one-piece'),
    plot: longPlot('Луффи собирает команду пиратов и отправляется искать легендарное сокровище One Piece.', 'Путешествие по морям превращается в хронику дружбы, свободы, странных островов и битв с теми, кто держит мир в цепях.'),
    screenshots: makeShots('one-piece'),
    episodes: 100,
    voiceovers: ['2x2', 'AniLibria', 'Субтитры'],
    videoSrc: demoVideos[3]
  },
  {
    id: 17,
    title: 'Наруто',
    rating: 8.4,
    rank: 17,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('naruto'),
    plot: longPlot('Наруто Узумаки мечтает стать хокаге, хотя деревня видит в нем источник старого страха.', 'Тренировки, миссии и соперничество с Саске постепенно раскрывают цену признания и силу связей между людьми.'),
    screenshots: makeShots('naruto'),
    episodes: 100,
    voiceovers: ['Дубляж', 'AniDub', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 18,
    title: 'Блич',
    rating: 8.2,
    rank: 18,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('bleach'),
    plot: longPlot('Ичиго получает силы синигами и начинает защищать людей от пустых.', 'Новая сила втягивает его в конфликты Общества душ, где долг, честь и прошлые ошибки сталкиваются в каждой дуэли.'),
    screenshots: makeShots('bleach'),
    episodes: 100,
    voiceovers: ['AniDub', 'Субтитры'],
    videoSrc: demoVideos[1]
  },
  {
    id: 19,
    title: 'Моб Психо 100',
    rating: 8.6,
    rank: 19,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('mob'),
    plot: longPlot('Моб обладает невероятной психической силой, но хочет обычной жизни и настоящего роста.', 'Рядом с мошенником-наставником Рейгеном он узнает, что эмоции нельзя просто запереть, а сила не заменяет честность.'),
    screenshots: makeShots('mob'),
    episodes: 12,
    voiceovers: ['AniLibria', 'Субтитры'],
    videoSrc: demoVideos[2]
  },
  {
    id: 20,
    title: 'Монстр',
    rating: 8.7,
    rank: 20,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('monster'),
    plot: longPlot('Хирург Кэндзо Тэнма спасает мальчика, который годы спустя оказывается связан с серией жестоких преступлений.', 'Погоня по Европе становится моральным расследованием о вине, выборе врача и природе зла.'),
    screenshots: makeShots('monster'),
    episodes: 74,
    voiceovers: ['Субтитры', 'Любительская'],
    videoSrc: demoVideos[3]
  },
  {
    id: 21,
    title: 'Сад изящных слов',
    rating: 7.8,
    rank: 21,
    type: 'Р¤РёР»СЊРјС‹',
    img: img('garden-words'),
    plot: longPlot('Юный ученик, мечтающий шить обувь, встречает женщину в дождливом саду.', 'Их тихие встречи становятся способом пережить одиночество, нерешительность и шагнуть туда, где каждый продолжит свой путь.'),
    screenshots: makeShots('garden-words'),
    episodes: 1,
    voiceovers: ['Дубляж', 'Субтитры'],
    videoSrc: demoVideos[0]
  },
  {
    id: 22,
    title: 'Вайолет Эвергарден',
    rating: 8.6,
    rank: 22,
    type: 'РЎРµСЂРёР°Р»С‹',
    img: img('violet'),
    plot: longPlot('Бывшая солдатка Вайолет становится автозапоминателем и пишет письма для людей, которым трудно выразить чувства.', 'Через чужие истории она постепенно понимает смысл слов, которые когда-то были сказаны ей самым дорогим человеком.'),
    screenshots: makeShots('violet'),
    episodes: 13,
    voiceovers: ['AniLibria', 'Netflix', 'Субтитры'],
    videoSrc: demoVideos[1]
  }
];
