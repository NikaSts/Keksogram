'use strict';

(function () {
  var PHRASES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Джон Сильвер', 'Джим Хокинс', 'Билли Бонс', 'Доктор Дэвид Ливси', 'Капитан Александр Смоллетт', 'Сквайр Джон Трелони', 'Длинноногий Бен', 'Капитан Джон Флинт', 'Слепой Пью', 'Чёрный Пёс', 'Джонни'];
  var AVATARS_NUMBER = 6;
  var MAX_COMMENTS_NUMBER = 8;
  var PHOTOS_NUMBER = 25;

  // Получение случайного числа в интервале [min,  max)
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // функция возвращает случайный элемент из массива
  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  // получаем адрес случайной фотографии на аватар
  var generateAvatarUrl = function () {
    return 'img/avatar-' + getRandomNumber(1, AVATARS_NUMBER + 1) + '.svg';
  };

  // отпределяем рандомно количество фраз в отзыве
  var getPhrasesNumber = function () {
    return getRandomNumber(1, 3);
  };

  // получаем массив со случайными фразами для отзыва
  var getRandomPhrases = function (phrases) {
    var phraseCount = getPhrasesNumber();
    var randomPhrases = [];
    for (var i = 0; i < phraseCount; i++) {
      randomPhrases.push(getRandomElement(phrases));
    }
    return randomPhrases;
  };

  // создаем один комментарий
  var createCommemtsItem = function () {
    var comment =
  {
    avatar: generateAvatarUrl(),
    message: getRandomPhrases(PHRASES).join(' '),
    name: getRandomElement(NAMES)
  };
    return comment;
  };

  // создаем рандомное количество комментариев
  var createComments = function () {
    var commentCount = getRandomNumber(1, MAX_COMMENTS_NUMBER);
    var comments = [];
    for (var i = 0; i < commentCount; i++) {
      comments.push(createCommemtsItem());
    }
    return comments;
  };

  // получаем адрес случайной фотографии для ленты
  var generatePhotoUrl = function (index) {
    return 'photos/' + index + '.jpg';
  };

  // Создаем массив с фотографиями
  var createPhotos = function () {
    var photos = [];
    for (var i = 0; i < PHOTOS_NUMBER; i++) {
      photos.push(
          {
            url: generatePhotoUrl(i + 1),
            description: '',
            likes: getRandomNumber(15, 200),
            comments: createComments()
          }
      );
    }
    return photos;
  };

  window.data = {
    get: createPhotos
  };

}());
