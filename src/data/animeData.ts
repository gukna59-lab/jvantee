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
    id: 2, title: 'Тетрадь смерти', rating: 8.9, rank: 2, type: 'Сериалы',
    shikimori_id: '1535',
    img: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    plot: longPlot('Школьник Лайт находит тетрадь, способную убивать людей по имени.', 'Его противником становится детектив L — интеллектуальная дуэль без права на ошибку.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/50f24d6cdd6cbaaccbb89cca9a7d73bbd6693f96.jpg?1511673367", "https://shikimori.one/system/screenshots/original/df7f907868c71e47bb86c9101f6d1a54714ad74f.jpg?1511673367", "https://shikimori.one/system/screenshots/original/6389be1ec35376b8344ae0c2bbf614b41f9cfb4d.jpg?1511673368", "https://shikimori.one/system/screenshots/original/74582494ad6727fb2f35801a4ce411eac7019fc3.jpg?1511673368"],
    episodes: 37, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 3, title: 'Стальной алхимик: Братство', rating: 9.1, rank: 3, type: 'Сериалы',
    shikimori_id: '5114',
    img: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    plot: longPlot('Братья Элрики пытаются вернуть тела после запретной алхимии.', 'Путь за философским камнем приводит к тайнам государства и войне.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/109e67ae974e1950b16ea58abacfa79c78ae39b2.jpg?1578674893", "https://shikimori.one/system/screenshots/original/bab2700a71b2b2d1b24a20d3b409d3f18aedd08e.jpg?1578674894", "https://shikimori.one/system/screenshots/original/70a7a1ebb749494b36ce9f5279fa82d8fa897e3e.jpg?1578674895", "https://shikimori.one/system/screenshots/original/44f1247bdaae6691b255d4f9f45914ea04713458.jpg?1578674896"],
    episodes: 64, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
    {
    id: 5, title: 'Твоё имя', rating: 8.4, rank: 5, type: 'Фильмы',
    shikimori_id: '32281',
    img: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg',
    plot: longPlot('Парень из Токио и девушка из провинции начинают просыпаться в телах друг друга.', 'Их связь становится ключом к событию, которое нельзя игнорировать.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/f247a65b1cbe13700e17aaad8a759f51e23c4a3c.jpg?1501185246", "https://shikimori.one/system/screenshots/original/6adb4f1f174d7bf3efe3f1bf50053f61e2c988b8.jpg?1501185251", "https://shikimori.one/system/screenshots/original/4230584158643221bfed36bd9fa973b7022e5f66.jpg?1501185257", "https://shikimori.one/system/screenshots/original/684a287cac79d246c1ed6194f5335267cfe1870b.jpg?1501185262"],
    episodes: 1, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 6, title: 'Киберпанк: Бегущие по краю', rating: 8.3, rank: 6, type: 'ONA',
    shikimori_id: '42310',
    img: 'https://cdn.myanimelist.net/images/anime/1818/126435.jpg',
    plot: longPlot('В Найт-Сити подросток Дэвид входит в мир наемников и имплантов.', 'Команда Люси даёт ему шанс стать кем-то большим, но город жесток.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/337a6be03fa9db54f3805e6ade659e303d89d822.jpg?1663078902", "https://shikimori.one/system/screenshots/original/c696084e685842b0525c74ace4675c3858041dd9.jpg?1663078902", "https://shikimori.one/system/screenshots/original/98884d947a5fd3a8d29557b081705de2be3a537b.jpg?1663078903", "https://shikimori.one/system/screenshots/original/8a08dd439653be29c71647050e1e2ab92d338973.jpg?1663078903"],
    episodes: 10, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 7, title: 'Ванпанчмен', rating: 8.7, rank: 7, type: 'Сериалы',
    shikimori_id: '30276',
    img: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
    plot: longPlot('Сайтама побеждает любого одним ударом и страдает от скуки.', 'За комедией — история о признании, одиночестве и поиске смысла.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/2a56c044c32aed9373605334d28ada9969b0b378.jpg?1702600661", "https://shikimori.one/system/screenshots/original/eb0ee094623eb0cbc97e5b9b5f26e98b5da8b86a.jpg?1702600662", "https://shikimori.one/system/screenshots/original/9f56aaadff7259c818533157e304707604e6b228.jpg?1702600663", "https://shikimori.one/system/screenshots/original/d488159959364f59e8704521ca4e2d49b25c5783.jpg?1702600663"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 8, title: 'Евангелион', rating: 8.5, rank: 8, type: 'Сериалы',
    shikimori_id: '30',
    img: 'https://cdn.myanimelist.net/images/anime/1314/108941.jpg',
    plot: longPlot('Подростки пилотируют роботов против загадочных Ангелов.', 'Страх, одиночество и ожидания взрослых давят сильнее любой брони.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/0034caf27eee763a929f73dba6cf16a3c06bbfd1.jpg?1519709733", "https://shikimori.one/system/screenshots/original/1cf75599b3017ae78ce507af6f492385116c0182.jpg?1519709736", "https://shikimori.one/system/screenshots/original/fd8ac9ac2a82297bcdf3dded0397cabe16603251.jpg?1519709740", "https://shikimori.one/system/screenshots/original/8cfac5750567f1c89d90b831ca6a3f012fcff521.jpg?1519709747"],
    episodes: 26, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 9, title: 'Врата Штейна', rating: 8.8, rank: 9, type: 'Сериалы',
    shikimori_id: '9253',
    img: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    plot: longPlot('Группа друзей открывает способ отправлять сообщения в прошлое.', 'Игра с причиной и следствием ломает реальность, заставляя платить за каждое изменение.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/98e4f835e3f2ae3d32f94322b02220001bb4f5e9.jpg?1656764254", "https://shikimori.one/system/screenshots/original/d7a06183cbd282a74d0a4b35bf9b3600416b99f1.jpg?1656764254", "https://shikimori.one/system/screenshots/original/85a22fa7048ea5d61e298dd6d029d83322d503b5.jpg?1656764255", "https://shikimori.one/system/screenshots/original/b8624ab8ea57a18cff1affb6aba932798fbbbf92.jpg?1656764255"],
    episodes: 24, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
      {
    id: 12, title: 'Магическая битва', rating: 8.6, rank: 12, type: 'Сериалы',
    shikimori_id: '40748',
    img: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    plot: longPlot('Юдзи Итадори проглатывает проклятый палец и становится сосудом Сукуны.', 'Школа магии открывает мир проклятий, где за каждый шанс приходится платить.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/1ee4860e989de906fc2e18b7d5101400eab40613.jpg?1664386613", "https://shikimori.one/system/screenshots/original/d434f780798ee01dae8c36bb5e0167621fb87d54.jpg?1664386614", "https://shikimori.one/system/screenshots/original/16cc8748f903a139b3e03d1a23dd3f65a4ef37d0.jpg?1664386614", "https://shikimori.one/system/screenshots/original/c611845c68f044fc3f02f21d154e1b589705d8f1.jpg?1664386615"],
    episodes: 24, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 13, title: 'Клинок, рассекающий демонов', rating: 8.7, rank: 13, type: 'Сериалы',
    shikimori_id: '38000',
    img: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    plot: longPlot('Тандзиро теряет семью, а его сестра Нэдзуко становится демоном.', 'Он вступает в корпус охотников, чтобы найти лекарство для сестры.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/1670da24dad3715737aad0a57f5e8d1c9921a3a1.JPG?1682858917", "https://shikimori.one/system/screenshots/original/1fe35ef5f186e0697534a141386097053a0725ba.JPG?1682858918", "https://shikimori.one/system/screenshots/original/416e098206d81d9d3e36b1cd08ee0b3ae4afed08.JPG?1682858919", "https://shikimori.one/system/screenshots/original/a172a718ed7427d411083c64a216b52875cd2fd0.JPG?1682858919"],
    episodes: 26, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 14, title: 'Волейбол!!', rating: 8.8, rank: 14, type: 'Сериалы',
    shikimori_id: '20583',
    img: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
    plot: longPlot('Хината мечтает стать звездой волейбола и попадает в команду Карасуно.', 'Соперничество с Кагэямой превращается в партнёрство.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/d19960ccadd64d6afd9c048ab6f73d97368a0ac3.jpg?1423528122", "https://shikimori.one/system/screenshots/original/dab1c38f9290778eeb6458587ce6e5915cd57157.jpg?1423528122", "https://shikimori.one/system/screenshots/original/b00e8b3d219e437cbb6bd64eb6f4d32745551e97.jpg?1423528123", "https://shikimori.one/system/screenshots/original/44a2c6504db32f7b9f0366787dc93c31c2e5b43a.jpg?1423528123"],
    episodes: 25, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 15, title: 'Моя геройская академия', rating: 8.0, rank: 15, type: 'Сериалы',
    shikimori_id: '31964',
    img: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
    plot: longPlot('Изуку рождается без способностей, но мечтает стать героем.', 'Получив шанс от Всемогущего, он учится: героизм — это ответственность.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/667765735eb0807be365a01fc9a871b96c3a9f12.jpg?1656088145", "https://shikimori.one/system/screenshots/original/e89f29419c07739ae01f0217d12e45d72efc402f.jpg?1656088145", "https://shikimori.one/system/screenshots/original/9b2d0b15b09e9ac190610b2034d0d6f1446785f2.jpg?1656088146", "https://shikimori.one/system/screenshots/original/6b3c71c5169eb7877e25e97237e0b5e73d31dfe2.jpg?1656088147"],
    episodes: 13, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
    {
    id: 17, title: 'Наруто', rating: 8.4, rank: 17, type: 'Сериалы',
    shikimori_id: '20',
    img: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    plot: longPlot('Наруто мечтает стать хокаге, хотя деревня видит в нём источник страха.', 'Тренировки и соперничество с Саске раскрывают силу связей.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/bdf5492d8e02b06a85b5c53a1b37b75fbdc1d960.jpg?1701215427", "https://shikimori.one/system/screenshots/original/98f3fa89e9a47b9671d94bcdfbe76725f7335551.jpg?1701215428", "https://shikimori.one/system/screenshots/original/0994cde9279e8002a446d65b2eda6d813b1a5946.jpg?1701215429", "https://shikimori.one/system/screenshots/original/2b5bcde2bbbe20bb38d9a2b5c467b2b16b637463.jpg?1701215430"],
    episodes: 220, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 18, title: 'Блич', rating: 8.2, rank: 18, type: 'Сериалы',
    shikimori_id: '269',
    img: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg',
    plot: longPlot('Ичиго получает силы синигами и защищает людей от пустых.', 'Новая сила втягивает в конфликты Общества душ.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/226d9990c5300e964883cdbfb28ea663950a8397.jpg?1677933236", "https://shikimori.one/system/screenshots/original/05c642ffc8578b481556939798726b47768f1a93.jpg?1677933236", "https://shikimori.one/system/screenshots/original/46a1ad719e07013934bf1403d4de1bab87d44dde.jpg?1677933237", "https://shikimori.one/system/screenshots/original/4263fd92e90636adfa2ce0b280a599bd8b683e09.jpg?1677933237"],
    episodes: 366, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 19, title: 'Моб Психо 100', rating: 8.6, rank: 19, type: 'Сериалы',
    shikimori_id: '32182',
    img: 'https://cdn.myanimelist.net/images/anime/8/80356.jpg',
    plot: longPlot('Моб обладает невероятной силой, но хочет обычной жизни.', 'Рядом с наставником Рейгеном он узнаёт: сила не заменяет честность.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/1f669dfbf3e71c40cd1a30223f02de4b91664851.jpg?1468419439", "https://shikimori.one/system/screenshots/original/f011eaffdbf812a25aa20601d6b3a63f39095cd9.jpg?1468419439", "https://shikimori.one/system/screenshots/original/16316d224d3af147fa62f438fe221992236c5a7b.jpg?1468419440", "https://shikimori.one/system/screenshots/original/b27f41391a4601c1b7fd2bcab1aaaaab8f20b3be.jpg?1468419443"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 20, title: 'Монстр', rating: 8.7, rank: 20, type: 'Сериалы',
    shikimori_id: '19',
    img: 'https://cdn.myanimelist.net/images/anime/10/18297.jpg',
    plot: longPlot('Хирург Тэнма спасает мальчика, связанного с серией преступлений.', 'Погоня по Европе — расследование о вине, выборе и природе зла.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/a559c5e89bc0aa0ab4955aa9b70079ea9bda4cfb.jpg?1709190732", "https://shikimori.one/system/screenshots/original/fd57972f18b1059765d7c9eeb947b13e7f6f9ad9.jpg?1709190733", "https://shikimori.one/system/screenshots/original/7aea0350dee4f6950aef086835bd78f6fcdbf476.jpg?1709190734", "https://shikimori.one/system/screenshots/original/cbc592c344dfeb2c58bfdc7fdb4b645fbcaead15.jpg?1709190734"],
    episodes: 74, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
    {
    id: 22, title: 'Вайолет Эвергарден', rating: 8.6, rank: 22, type: 'Сериалы',
    shikimori_id: '33352',
    img: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg',
    plot: longPlot('Вайолет становится автозапоминателем и пишет письма для людей.', 'Через чужие истории она понимает смысл слов самого дорогого человека.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/9a6b9eb01358a84226ff89623b4ab6347a8ab9d4.jpg?1633466854", "https://shikimori.one/system/screenshots/original/0cac34d42b355eb8f55866ca9bac746c4f531abb.jpg?1633466854", "https://shikimori.one/system/screenshots/original/ab7f8bd4a066287b67236c00d2de21481b580a1d.jpg?1633466854", "https://shikimori.one/system/screenshots/original/669e99c959f211c6669db5821605b4a2a9973ee1.jpg?1633466854"],
    episodes: 13, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
          {
    id: 27, title: 'Город, в котором меня нет', rating: 8.3, rank: 27, type: 'Сериалы',
    shikimori_id: '31043',
    img: 'https://cdn.myanimelist.net/images/anime/10/77957.jpg',
    plot: longPlot('Сатору перемещается в детство, чтобы предотвратить трагедию.', 'Сможет ли он спасти Каё и изменить будущее, рискуя всем?'),
    screenshots: ["https://shikimori.one/system/screenshots/original/1881e4c9f766599447da74d4794ccea55c5d8aae.jpg?1680114126","https://shikimori.one/system/screenshots/original/cabc54924bb33cfd97b331624734f38b0dc685be.jpg?1680114126","https://shikimori.one/system/screenshots/original/bea824aa83b5e2bc90f9d2e326c6cc5ba5cd1d2b.jpg?1680114127","https://shikimori.one/system/screenshots/original/cbd90a97faac6275afa9cb6195630c076a9861dd.jpg?1680114127"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 28, title: 'Мастера Меча Онлайн', rating: 7.2, rank: 28, type: 'Сериалы',
    shikimori_id: '11757',
    img: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg',
    plot: longPlot('Игроки оказываются заперты в виртуальной реальности, где смерть в игре означает смерть в жизни.', 'Кирито должен пройти 100 этажей ради свободы.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/47c1d5b648e108f97d5344e32055d41017d134da.jpg?1656082680","https://shikimori.one/system/screenshots/original/3b96f4e0f578a3d6f4220f10f227ea24237cea1a.jpg?1656082681","https://shikimori.one/system/screenshots/original/29b201eac1257b7b2fda3be25842843be6b82153.jpg?1656082682","https://shikimori.one/system/screenshots/original/6988c53d1f70d602e57df87571b59f3d8263b136.jpg?1656082682"],
    episodes: 25, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
    {
    id: 30, title: 'ДжоДжо', rating: 8.4, rank: 30, type: 'Сериалы',
    shikimori_id: '14719',
    img: 'https://cdn.myanimelist.net/images/anime/3/40409.jpg',
    plot: longPlot('Сага о семье Джостаров, сражающихся против вампиров и древнего зла.', 'Стиль, музыка и абсурд переплетаются с эпическими битвами.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/bc56d7ad4c587532f3791a62ec250fcf00a6c515.jpg?1423532811","https://shikimori.one/system/screenshots/original/e33d8eab8c79e02f0cf577aa6a5424bbf521c594.jpg?1423532811","https://shikimori.one/system/screenshots/original/04ce4d6fb0c3cfec010884e4631d9ed18a992275.jpg?1423532811","https://shikimori.one/system/screenshots/original/22dfe0895675ec44bc13487966e958cf4cd631d4.jpg?1423532812"],
    episodes: 26, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 31, title: 'Тёмный дворецкий', rating: 7.6, rank: 31, type: 'Сериалы',
    shikimori_id: '4898',
    img: 'https://shikimori.one/system/animes/original/4898.jpg',
    plot: longPlot('Сиэль Фантомхайв продает душу демону.', 'Вместе с Себастьяном они выполняют грязную работу для королевы.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/f3729b47c2bdd420c7af68740a08c89b89bd4180.jpg?1690862181","https://shikimori.one/system/screenshots/original/e3d5086a359a897f7872aeadf97354af0e491d55.jpg?1690862181","https://shikimori.one/system/screenshots/original/9d3e075ee93b145927962161bfd3b22088b13198.jpg?1690862182","https://shikimori.one/system/screenshots/original/c46d1fc234ab6000a220b934388b1ad69dc5e2b0.jpg?1690862183"],
    episodes: 24, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 32, title: 'Бездомный бог', rating: 7.9, rank: 32, type: 'Сериалы',
    shikimori_id: '20507',
    img: 'https://shikimori.one/system/animes/original/20507.jpg',
    plot: longPlot('Ято — бог без святилища, готовый выполнить любую работу за пять иен.', 'Его судьба пересекается со школьницей, что меняет все.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/61599ec39314f848f2318245d14e42f376398572.jpg?1632321263","https://shikimori.one/system/screenshots/original/9da3c621684b4c798bb2d823ade6a60fab303d50.jpg?1632321264","https://shikimori.one/system/screenshots/original/ee81498f85691ed63366edf5d0687c6d71196f96.jpg?1632321264","https://shikimori.one/system/screenshots/original/b42fb42d167cfc2efed757c05be27ba9d65a1453.jpg?1632321264"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  }
,
  {
    id: 33, title: 'Провожающая в последний путь Фрирен', rating: 9.3, rank: 33, type: 'Сериалы',
    shikimori_id: '52991',
    img: 'https://shikimori.one/system/animes/original/52991.jpg',
    plot: longPlot('Одержав победу над Королём демонов, отряд героя Химмеля вернулся домой.', 'Приключение, растянувшееся на десятилетие, подошло к завершению.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/b8a37b9a2b5e01e581f3313278a4e38bee9a1527.jpg?1696000681","https://shikimori.one/system/screenshots/original/de4d563c7524eb560351c6a166078f0a5f44407c.jpg?1696000683","https://shikimori.one/system/screenshots/original/a222e9ed6510a0b8cb0bc9e9d2291beb306e4b5c.jpg?1696000685","https://shikimori.one/system/screenshots/original/ad4f61192d399270a923c49a6a96b77a7f9343f6.jpg?1696000686"],
    episodes: 28, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 34, title: 'Реинкарнация безработного', rating: 8.3, rank: 34, type: 'Сериалы',
    shikimori_id: '39535',
    img: 'https://shikimori.one/system/animes/original/39535.jpg',
    plot: longPlot('Бывает в жизни невезение.', 'Только тридцатичетырёхлетний безработный отаку-бездельник решает взяться за ум, как его насмерть сбивает грузовик.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/b309a4367673eee354fae4b4721b2f72c0a55f1c.jpg?1666552006","https://shikimori.one/system/screenshots/original/a955c64409c218a69d014b01bdf3fc03f4d7580e.jpg?1666552006","https://shikimori.one/system/screenshots/original/ac79962816b0aa63cabb2636bd0dc7fc2b7550f1.jpg?1666552007","https://shikimori.one/system/screenshots/original/5987625ade63b4ead012d3073505990687894d27.jpg?1666552007"],
    episodes: 11, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 35, title: 'Синяя тюрьма: Блю Лок', rating: 8.1, rank: 35, type: 'Сериалы',
    shikimori_id: '49596',
    img: 'https://shikimori.one/system/animes/original/49596.jpg',
    plot: longPlot('Осознав плачевное состояние японского футбола, национальная ассоциация решается на отчаянный шаг.', 'На плечах загадочного тренера лежит ответственность привести Японию к победе на чемпионате мира.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/f1caa7b6127bc92a433fc9eb055afd60a2fb39c1.jpg?1665256192","https://shikimori.one/system/screenshots/original/c619d2fef9f414a784a5e660d0529c86ec073230.jpg?1665256192","https://shikimori.one/system/screenshots/original/620746a4994a740f4ea04212a944989eced76c1e.jpg?1665256192","https://shikimori.one/system/screenshots/original/dd26dc89e29a8ae04d4baf89df98308b5148a62c.jpg?1665256193"],
    episodes: 24, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 36, title: 'Поднятие уровня в одиночку', rating: 8.2, rank: 36, type: 'Сериалы',
    shikimori_id: '52299',
    img: 'https://shikimori.one/system/animes/original/52299.jpg',
    plot: longPlot('Десять лет назад по всему миру стали открываться некие «врата», ведущие в подземелья с монстрами.', 'Сон Джинву получает шанс стать сильнее и раскрыть все секреты подземелий.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/d9c7661d19f1cf8347aedeec49f743e86db3d071.jpg?1704560122","https://shikimori.one/system/screenshots/original/fc9f87aebf04218fc27cf3ca444fe18559538fbf.jpg?1704560123","https://shikimori.one/system/screenshots/original/d5e4dada624ab28db2bcbd51b18c56d236dce086.jpg?1704560125","https://shikimori.one/system/screenshots/original/61c3502d8f3e141269a0f13e048cc87ad10ee22d.jpg?1704560126"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 37, title: 'Токийские мстители', rating: 7.8, rank: 37, type: 'Сериалы',
    shikimori_id: '42249',
    img: 'https://shikimori.one/system/animes/original/42249.jpg',
    plot: longPlot('Сложно исправить ошибки прошлого.', 'Некоторые — невозможно, но он решает попробовать изменить судьбу.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/54e9c991276a49fd67b22275e1c3c4b31b162755.jpg?1618088991","https://shikimori.one/system/screenshots/original/c53de82d33b5d737b0932624ef51c374be978b3e.jpg?1618088992","https://shikimori.one/system/screenshots/original/46d363140d082219c91aa75bec3d40ab8d650fae.jpg?1618088993","https://shikimori.one/system/screenshots/original/14c0b64d52e5546ce3f9dd53904191696f4d50d6.jpg?1618088993"],
    episodes: 24, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 38, title: 'Семья шпиона', rating: 8.2, rank: 38, type: 'Сериалы',
    shikimori_id: '50602',
    img: 'https://shikimori.one/system/animes/original/50602.jpg',
    plot: longPlot('Шпион, убийца и телепат объединяются в одну семью.', 'Их существование — это сплошной обман ради сохранения мира.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/f11fdcd03db19186ea068bd11ab8726d53690b4f.jpg?1664639185","https://shikimori.one/system/screenshots/original/bcf8ad96a9e43ab3e74cc0e76bb03beed61dce93.jpg?1664639186","https://shikimori.one/system/screenshots/original/fc3debba04d4e9c05289f2f7cb43f2766266eae7.jpg?1664639186","https://shikimori.one/system/screenshots/original/b76aea9c24d1b0cc547964e652c6a65b359231be.jpg?1664639187"],
    episodes: 13, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 39, title: 'Магическая битва 2', rating: 8.7, rank: 39, type: 'Сериалы',
    shikimori_id: '51009',
    img: 'https://shikimori.one/system/animes/original/51009.jpg?1711334733',
    plot: longPlot('Тридцать первое октября 2018 года, район Сибуя.', 'Множество простых людей заключены под магической завесой и взяты в заложники союзом проклятых духов под началом [character=164481]Махито[/character] и [character=175542]Гэто[/character].'),
    screenshots: ["https://shikimori.one/system/screenshots/original/d769509d56f0fdbf3b5f67480c04ed4aace4ad6a.jpg?1688547535","https://shikimori.one/system/screenshots/original/b13ecb9e1d5971f9d4abd4b5541e481de5dfe17c.jpg?1688547535","https://shikimori.one/system/screenshots/original/a7931f7b313be70025f4240d5854f9f48d3e99d5.jpg?1688547537","https://shikimori.one/system/screenshots/original/ce9a5a445b5a023e76a0b1e262ab517fd8b34d1a.jpg?1688547538"],
    episodes: 23, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 40, title: 'Восхождение в тени!', rating: 8.2, rank: 40, type: 'Сериалы',
    shikimori_id: '48316',
    img: 'https://shikimori.one/system/animes/original/48316.jpg?1711956877',
    plot: longPlot('Кем вы хотели стать в детстве? Известным футболистом? Супергероем? Или, быть может, певцом, собирающим огромную толпу на концертах? Всё это не про нашего главного героя [character=171572]Сида[/character], ведь он всегда восхищался людьми из закулисья, теми, кто почти не предпринимает никаких действий в открытую, а появляется лишь в самый ответственный момент и, сделав дело, бесследно исчезает.', '  В нашем мире такое трудно провернуть, ведь что ни делай, а против атомной бомбы не попрёшь.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/9c4dc7e77814e8d9ffb88074bb050ef04d19a063.jpg?1664989984","https://shikimori.one/system/screenshots/original/14e6a2ddd57fa655bc94863105630a06ed35e85b.jpg?1664989984","https://shikimori.one/system/screenshots/original/6a0058bf48f935408b514dcb6ba0fc4e218ffad7.jpg?1664989984","https://shikimori.one/system/screenshots/original/d19ea1f2f488b281d5e67251acbfdfbe29251c3f.jpg?1664989985"],
    episodes: 20, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 41, title: 'Невероятное приключение ДжоДжо: Каменный океан', rating: 8.1, rank: 41, type: 'Сериалы',
    shikimori_id: '48661',
    img: 'https://shikimori.one/system/animes/original/48661.jpg?1708744652',
    plot: longPlot('Действие происходит в 2011 году в порту Сент-Люси, Флорида.', '[[Дочь]] Джотаро [空条 承太郎], Джолин Куджо [空条 徐倫], оказывается втянута в неприятный инцидент, в результате которого попадает в тюрьму.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/c87536025a9f80895bf56b3d9b3c5a13d52ab3f1.jpg?1638373246","https://shikimori.one/system/screenshots/original/fbf6d8738509922d04071bd9f0b5fff074485fe2.jpg?1638373246","https://shikimori.one/system/screenshots/original/d4e384c8cabe5e8dfd7ad6e093b093634c454189.jpg?1638373247","https://shikimori.one/system/screenshots/original/46a0d4c544796efaca890276156ff0f1a797acfa.jpg?1638373248"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 42, title: 'Тетрадь дружбы Нацумэ', rating: 8.3, rank: 42, type: 'Сериалы',
    shikimori_id: '4081',
    img: 'https://shikimori.one/system/animes/original/4081.jpg?1711965714',
    plot: longPlot('В этой истории рассказывается о юноше Такаши Нацумэ (夏目貴志), унаследовавшего от бабушки [character=13886]Рэйко Нацумэ[/character] способность видеть духов.', 'От чего, впрочем, он совсем не в восторге — ведь всю жизнь духи доставляли ему одни неприятности. Но всё меняется, когда Нацумэ находит «Тетрадь дружбы», принадлежащую его бабушке.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/a7fd470534bcf0465e8f108331da0c3554e46fa2.jpg?1423546993","https://shikimori.one/system/screenshots/original/66190da4ad80c8de7942a70af3efc1fc5c309f46.jpg?1423546993","https://shikimori.one/system/screenshots/original/12942f0bb5227397edba9db59d907aab530e4ac0.jpg?1423546994","https://shikimori.one/system/screenshots/original/e40edee6eeb7b5b7295a9af7c37ad9676281e82e.jpg?1423546994"],
    episodes: 13, voiceovers: ['AniLibria.TV'], videoSrc: ''
  },
  {
    id: 43, title: 'Обещанный Неверленд', rating: 8.5, rank: 43, type: 'Сериалы',
    shikimori_id: '37779',
    img: 'https://shikimori.one/system/animes/original/37779.jpg?1711982147',
    plot: longPlot('[character=144337]Эмма[/character], [character=144916]Норман[/character] и [character=144919]Рей[/character] — самые яркие дети в приюте «Благодатный дом».', 'И под покровительством женщины, которую они называют «мамой», все дети наслаждаются комфортной жизнью.'),
    screenshots: ["https://shikimori.one/system/screenshots/original/c904395bf53bf8f0c6e5662e37f1824b6ce68813.png?1547147120","https://shikimori.one/system/screenshots/original/a962e167ec6a9e75925fc6d910f1b42e7f02d417.png?1547147122","https://shikimori.one/system/screenshots/original/32226caeb0eed11635f22c81b7db31d5c62bb8f5.png?1547147123","https://shikimori.one/system/screenshots/original/f468f1766269e8fa0944b2dc4dd0760c64cf8d7b.png?1547147125"],
    episodes: 12, voiceovers: ['AniLibria.TV'], videoSrc: ''
  }
];
