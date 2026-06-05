export interface Anime {
  id: number;
  title: string;
  rating: number;
  rank: number;
  img: string;
  type: 'Сериалы' | 'Фильмы' | 'ONA';
  plot: string;
  screenshots: string[];
  episodes: number;
  voiceovers: string[];
  videoSrc: string;
  shikimori_id: string;
}

const longPlot = (base: string, extra: string) =>
  `${base} ${extra} История раскрывается через выборы героев, цену силы и попытки сохранить себя в мире, где доверие дается тяжело.`;

export const animeData: Anime[] = [
  {
    id: 1, title: 'Атака титанов', rating: 9.1, rank: 1, type: 'Сериалы',
    shikimori_id: '16498',
    img: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    plot: longPlot('Люди живут за огромными стенами, спасаясь от титанов.', 'Эрен, Микаса и Армин оказываются внутри войны, где враг перестаёт быть простым чудовищем.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/10/47347.jpg','https://cdn.myanimelist.net/images/anime/10/47347.jpg','https://cdn.myanimelist.net/images/anime/10/47347.jpg'],
    episodes: 25, voiceovers: ['AniLibria', 'Студийная Банда', 'Субтитры'], videoSrc: ''
  },
  {
    id: 2, title: 'Тетрадь смерти', rating: 8.9, rank: 2, type: 'Сериалы',
    shikimori_id: '1535',
    img: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    plot: longPlot('Школьник Лайт находит тетрадь, способную убивать людей по имени.', 'Его противником становится детектив L — интеллектуальная дуэль без права на ошибку.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/9/9453.jpg','https://cdn.myanimelist.net/images/anime/9/9453.jpg','https://cdn.myanimelist.net/images/anime/9/9453.jpg'],
    episodes: 37, voiceovers: ['2x2', 'Любительская', 'Субтитры'], videoSrc: ''
  },
  {
    id: 3, title: 'Стальной алхимик: Братство', rating: 9.1, rank: 3, type: 'Сериалы',
    shikimori_id: '5114',
    img: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    plot: longPlot('Братья Элрики пытаются вернуть тела после запретной алхимии.', 'Путь за философским камнем приводит к тайнам государства и войне.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1223/96541.jpg','https://cdn.myanimelist.net/images/anime/1223/96541.jpg','https://cdn.myanimelist.net/images/anime/1223/96541.jpg'],
    episodes: 64, voiceovers: ['AniDub', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 4, title: 'Унесённые призраками', rating: 8.6, rank: 4, type: 'Фильмы',
    shikimori_id: '199',
    img: 'https://cdn.myanimelist.net/images/anime/6/79597.jpg',
    plot: longPlot('Тихиро попадает в мир духов, где её родители превращены.', 'Работая в бане ведьмы Юбабы, девочка учится не терять имя и чувство добра.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/6/79597.jpg','https://cdn.myanimelist.net/images/anime/6/79597.jpg','https://cdn.myanimelist.net/images/anime/6/79597.jpg'],
    episodes: 1, voiceovers: ['Дубляж', 'Субтитры'], videoSrc: ''
  },
  {
    id: 5, title: 'Твоё имя', rating: 8.4, rank: 5, type: 'Фильмы',
    shikimori_id: '32281',
    img: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg',
    plot: longPlot('Парень из Токио и девушка из провинции начинают просыпаться в телах друг друга.', 'Их связь становится ключом к событию, которое нельзя игнорировать.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/5/87048.jpg','https://cdn.myanimelist.net/images/anime/5/87048.jpg','https://cdn.myanimelist.net/images/anime/5/87048.jpg'],
    episodes: 1, voiceovers: ['Дубляж', 'Субтитры'], videoSrc: ''
  },
  {
    id: 6, title: 'Киберпанк: Бегущие по краю', rating: 8.3, rank: 6, type: 'ONA',
    shikimori_id: '42310',
    img: 'https://cdn.myanimelist.net/images/anime/1818/126435.jpg',
    plot: longPlot('В Найт-Сити подросток Дэвид входит в мир наемников и имплантов.', 'Команда Люси даёт ему шанс стать кем-то большим, но город жесток.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1818/126435.jpg','https://cdn.myanimelist.net/images/anime/1818/126435.jpg','https://cdn.myanimelist.net/images/anime/1818/126435.jpg'],
    episodes: 10, voiceovers: ['Red Head Sound', 'Субтитры'], videoSrc: ''
  },
  {
    id: 7, title: 'Ванпанчмен', rating: 8.7, rank: 7, type: 'Сериалы',
    shikimori_id: '30276',
    img: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
    plot: longPlot('Сайтама побеждает любого одним ударом и страдает от скуки.', 'За комедией — история о признании, одиночестве и поиске смысла.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/12/76049.jpg','https://cdn.myanimelist.net/images/anime/12/76049.jpg','https://cdn.myanimelist.net/images/anime/12/76049.jpg'],
    episodes: 12, voiceovers: ['JAM', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 8, title: 'Евангелион', rating: 8.5, rank: 8, type: 'Сериалы',
    shikimori_id: '30',
    img: 'https://cdn.myanimelist.net/images/anime/1314/108941.jpg',
    plot: longPlot('Подростки пилотируют роботов против загадочных Ангелов.', 'Страх, одиночество и ожидания взрослых давят сильнее любой брони.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1314/108941.jpg','https://cdn.myanimelist.net/images/anime/1314/108941.jpg','https://cdn.myanimelist.net/images/anime/1314/108941.jpg'],
    episodes: 26, voiceovers: ['Дубляж', 'Субтитры'], videoSrc: ''
  },
  {
    id: 9, title: 'Врата Штейна', rating: 8.8, rank: 9, type: 'Сериалы',
    shikimori_id: '9253',
    img: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    plot: longPlot('Группа друзей открывает способ отправлять сообщения в прошлое.', 'Игра с причиной и следствием ломает реальность, заставляя платить за каждое изменение.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/5/73199.jpg','https://cdn.myanimelist.net/images/anime/5/73199.jpg','https://cdn.myanimelist.net/images/anime/5/73199.jpg'],
    episodes: 24, voiceovers: ['AniDub', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 10, title: 'Ходячий замок', rating: 8.2, rank: 10, type: 'Фильмы',
    shikimori_id: '431',
    img: 'https://cdn.myanimelist.net/images/anime/5/75810.jpg',
    plot: longPlot('Софи превращают в старуху, и она отправляется в странствие с Хаулом.', 'Волшебный замок становится домом для людей, которые прячут раны за масками.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/5/75810.jpg','https://cdn.myanimelist.net/images/anime/5/75810.jpg','https://cdn.myanimelist.net/images/anime/5/75810.jpg'],
    episodes: 1, voiceovers: ['Дубляж', 'Субтитры'], videoSrc: ''
  },
  {
    id: 11, title: 'Человек-бензопила', rating: 8.4, rank: 11, type: 'Сериалы',
    shikimori_id: '44511',
    img: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
    plot: longPlot('Дэндзи живёт в долгах и охотится на демонов вместе с Почитой.', 'Попав в Бюро безопасности, он сталкивается с властью и людьми которым сложно доверять.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1806/126216.jpg','https://cdn.myanimelist.net/images/anime/1806/126216.jpg','https://cdn.myanimelist.net/images/anime/1806/126216.jpg'],
    episodes: 12, voiceovers: ['AniLibria', 'Студийная Банда', 'Субтитры'], videoSrc: ''
  },
  {
    id: 12, title: 'Магическая битва', rating: 8.6, rank: 12, type: 'Сериалы',
    shikimori_id: '40748',
    img: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    plot: longPlot('Юдзи Итадори проглатывает проклятый палец и становится сосудом Сукуны.', 'Школа магии открывает мир проклятий, где за каждый шанс приходится платить.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1171/109222.jpg','https://cdn.myanimelist.net/images/anime/1171/109222.jpg','https://cdn.myanimelist.net/images/anime/1171/109222.jpg'],
    episodes: 24, voiceovers: ['AniLibria', 'Crunchyroll', 'Субтитры'], videoSrc: ''
  },
  {
    id: 13, title: 'Клинок, рассекающий демонов', rating: 8.7, rank: 13, type: 'Сериалы',
    shikimori_id: '38000',
    img: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    plot: longPlot('Тандзиро теряет семью, а его сестра Нэдзуко становится демоном.', 'Он вступает в корпус охотников, чтобы найти лекарство для сестры.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1286/99889.jpg','https://cdn.myanimelist.net/images/anime/1286/99889.jpg','https://cdn.myanimelist.net/images/anime/1286/99889.jpg'],
    episodes: 26, voiceovers: ['AniDub', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 14, title: 'Волейбол!!', rating: 8.8, rank: 14, type: 'Сериалы',
    shikimori_id: '20583',
    img: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
    plot: longPlot('Хината мечтает стать звездой волейбола и попадает в команду Карасуно.', 'Соперничество с Кагэямой превращается в партнёрство.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/7/76014.jpg','https://cdn.myanimelist.net/images/anime/7/76014.jpg','https://cdn.myanimelist.net/images/anime/7/76014.jpg'],
    episodes: 25, voiceovers: ['AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 15, title: 'Моя геройская академия', rating: 8.0, rank: 15, type: 'Сериалы',
    shikimori_id: '31964',
    img: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
    plot: longPlot('Изуку рождается без способностей, но мечтает стать героем.', 'Получив шанс от Всемогущего, он учится: героизм — это ответственность.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/10/78745.jpg','https://cdn.myanimelist.net/images/anime/10/78745.jpg','https://cdn.myanimelist.net/images/anime/10/78745.jpg'],
    episodes: 13, voiceovers: ['AniDub', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 16, title: 'Ван-Пис', rating: 9.0, rank: 16, type: 'Сериалы',
    shikimori_id: '21',
    img: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    plot: longPlot('Луффи собирает команду пиратов и ищет легендарное сокровище One Piece.', 'Путешествие по морям — хроника дружбы, свободы и битв.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/6/73245.jpg','https://cdn.myanimelist.net/images/anime/6/73245.jpg','https://cdn.myanimelist.net/images/anime/6/73245.jpg'],
    episodes: 100, voiceovers: ['2x2', 'AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 17, title: 'Наруто', rating: 8.4, rank: 17, type: 'Сериалы',
    shikimori_id: '20',
    img: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    plot: longPlot('Наруто мечтает стать хокаге, хотя деревня видит в нём источник страха.', 'Тренировки и соперничество с Саске раскрывают силу связей.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/13/17405.jpg','https://cdn.myanimelist.net/images/anime/13/17405.jpg','https://cdn.myanimelist.net/images/anime/13/17405.jpg'],
    episodes: 100, voiceovers: ['Дубляж', 'AniDub', 'Субтитры'], videoSrc: ''
  },
  {
    id: 18, title: 'Блич', rating: 8.2, rank: 18, type: 'Сериалы',
    shikimori_id: '269',
    img: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg',
    plot: longPlot('Ичиго получает силы синигами и защищает людей от пустых.', 'Новая сила втягивает в конфликты Общества душ.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/3/40451.jpg','https://cdn.myanimelist.net/images/anime/3/40451.jpg','https://cdn.myanimelist.net/images/anime/3/40451.jpg'],
    episodes: 100, voiceovers: ['AniDub', 'Субтитры'], videoSrc: ''
  },
  {
    id: 19, title: 'Моб Психо 100', rating: 8.6, rank: 19, type: 'Сериалы',
    shikimori_id: '32182',
    img: 'https://cdn.myanimelist.net/images/anime/8/80356.jpg',
    plot: longPlot('Моб обладает невероятной силой, но хочет обычной жизни.', 'Рядом с наставником Рейгеном он узнаёт: сила не заменяет честность.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/8/80356.jpg','https://cdn.myanimelist.net/images/anime/8/80356.jpg','https://cdn.myanimelist.net/images/anime/8/80356.jpg'],
    episodes: 12, voiceovers: ['AniLibria', 'Субтитры'], videoSrc: ''
  },
  {
    id: 20, title: 'Монстр', rating: 8.7, rank: 20, type: 'Сериалы',
    shikimori_id: '19',
    img: 'https://cdn.myanimelist.net/images/anime/10/18297.jpg',
    plot: longPlot('Хирург Тэнма спасает мальчика, связанного с серией преступлений.', 'Погоня по Европе — расследование о вине, выборе и природе зла.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/10/18297.jpg','https://cdn.myanimelist.net/images/anime/10/18297.jpg','https://cdn.myanimelist.net/images/anime/10/18297.jpg'],
    episodes: 74, voiceovers: ['Субтитры', 'Любительская'], videoSrc: ''
  },
  {
    id: 21, title: 'Сад изящных слов', rating: 7.8, rank: 21, type: 'Фильмы',
    shikimori_id: '19755',
    img: 'https://cdn.myanimelist.net/images/anime/1595/107426.jpg',
    plot: longPlot('Юный ученик, мечтающий шить обувь, встречает женщину в дождливом саду.', 'Тихие встречи — способ пережить одиночество и шагнуть вперёд.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1595/107426.jpg','https://cdn.myanimelist.net/images/anime/1595/107426.jpg','https://cdn.myanimelist.net/images/anime/1595/107426.jpg'],
    episodes: 1, voiceovers: ['Дубляж', 'Субтитры'], videoSrc: ''
  },
  {
    id: 22, title: 'Вайолет Эвергарден', rating: 8.6, rank: 22, type: 'Сериалы',
    shikimori_id: '33352',
    img: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg',
    plot: longPlot('Вайолет становится автозапоминателем и пишет письма для людей.', 'Через чужие истории она понимает смысл слов самого дорогого человека.'),
    screenshots: ['https://cdn.myanimelist.net/images/anime/1795/95088.jpg','https://cdn.myanimelist.net/images/anime/1795/95088.jpg','https://cdn.myanimelist.net/images/anime/1795/95088.jpg'],
    episodes: 13, voiceovers: ['AniLibria', 'Netflix', 'Субтитры'], videoSrc: ''
  }
];
