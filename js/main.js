'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Кристофер Робин', 'Пятачок', 'Иа-Иа', 'Кенга', 'Крошка Ру', 'Сова', 'Кролик', 'Тигра'];
var PHOTOS_NUMBER = 25;
var AVATAR_NUMBER = 6;

// функция рандомно возвращает значение 0 или 1
var flipCoin = function () {
  return Math.floor(Math.random() * 2);
};

// Получение случайного числа в интервале от min до max включительно
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Получение рандомного индекса у массива
var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// функция возвращает случайный элемент из массива
var getRandomElement = function (array) {
  return array[getRandomIndex(array)];
};

// получаем адрес случайной фотографии на аватар
var generateAvatarUrl = function () {
  return 'img/avatar-' + getRandomNumber(1, AVATAR_NUMBER) + '.svg';
};

// определяем количество отображаемых сообщений: 1 или 2
var getCommentNumber = function () {
  return flipCoin() ? 1 : 2; // может стоит писать flipCoin() === 1
};

// функция возвращает массив со случайными сообщениями для комментария
var getRandomMessages = function () {
  var messages = [];
  for (var i; i <= getCommentNumber(); i++) {
    messages.push(getRandomElement(MESSAGES));
  }
  return messages;
};

// создаем один комментарий
var createCommentItem = function () {
  var comment =
  {
    avatar: generateAvatarUrl(),
    message: getRandomMessages(),
    name: getRandomElement(NAMES)
  };
  return comment;
};

// получаем адрес случайной фотографии для ленты
var generatePhotoUrl = function (index) {
  return 'photos/' + index + '.jpg';
};

// Создаем массив с фотографиями
var createPhotoArray = function () {
  var photos = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos.push(
        {
          url: generatePhotoUrl(i + 1),
          description: '',
          likes: getRandomNumber(15, 200),
          comments: createCommentItem()
        }
    );
  }
  return photos;
};

createPhotoArray();
