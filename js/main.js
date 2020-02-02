'use strict';

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
  return 'img/avatar-' + getRandomNumber(1, AVATARS_NUMBER) + '.svg';
};

// отпределяем рандомно количество фраз в отзыве
var getPhrasesNumber = function () {
  return (flipCoin() === 0) ? 1 : 2;
};

// получаем массив со случайными фразами для отзыва
var getRandomPhrases = function (phrases) {
  var randomPhrases = [];
  for (var i = 0; i < getPhrasesNumber(); i++) {
    randomPhrases.push(getRandomElement(phrases));
  }
  return randomPhrases;
};

// склеиваем фразы из массива в один отзыв
var createMessageOfPhrases = function (phrases) {
  var comment = '';
  for (var i = 0; i < phrases.length; i++) {
    comment += (i === 0) ? phrases[i] : ' ' + phrases[i];
  }
  return comment;
};

// создаем один комментарий
var createCommentsItem = function () {
  var comment =
  {
    avatar: generateAvatarUrl(),
    message: createMessageOfPhrases(getRandomPhrases(PHRASES)),
    name: getRandomElement(NAMES)
  };
  return comment;
};

// создаем рандомное количество комментариев
var createCommentsList = function () {
  var comments = [];
  for (var i = 1; i < getRandomNumber(1, MAX_COMMENTS_NUMBER); i++) {
    comments.push(createCommentsItem());
  }
  return comments;
};

// считаем количество комментариев
var countCommentsNumber = function (comments) {
  return comments.length;
};

// получаем адрес случайной фотографии для ленты
var generatePhotoUrl = function (index) {
  return 'photos/' + index + '.jpg';
};

// Создаем массив с фотографиями
var createPhotosArray = function () {
  var photos = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos.push(
        {
          url: generatePhotoUrl(i + 1),
          description: '',
          likes: getRandomNumber(15, 200),
          comments: countCommentsNumber(createCommentsList())
        }
    );
  }
  return photos;
};

// находим шаблон и его содержимое в документе
var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesGallery = document.querySelector('.pictures');

// Копируем шаблон и вставляем к него данные
var createPicturesItem = function (photo) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;

  return pictureElement;
};

// создаем DOM-элементы и заполняем их
var createPicturesList = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPicturesItem(photos[i]));
  }
  return fragment;
};

// отображаем галлерею с фото
picturesGallery.appendChild(createPicturesList(createPhotosArray()));
