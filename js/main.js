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


// Получение случайного числа в интервале от min до max включительно
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // ты говорил лучше без +1, но тогда функция не выдает никогда верхнее значение
};

// функция возвращает случайный элемент из массива
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// получаем адрес случайной фотографии на аватар
var generateAvatarUrl = function () {
  return 'img/avatar-' + getRandomNumber(1, AVATARS_NUMBER) + '.svg';
};

// отпределяем рандомно количество фраз в отзыве
var getPhrasesNumber = function () {
  return (getRandomNumber(0, 1) === 0) ? 1 : 2;
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
var createCommemtsElement = function () {
  var comment =
  {
    avatar: generateAvatarUrl(),
    message: createMessageOfPhrases(getRandomPhrases(PHRASES)),
    name: getRandomElement(NAMES)
  };
  return comment;
};

// создаем рандомное количество комментариев
var createComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, MAX_COMMENTS_NUMBER); i++) {
    comments.push(createCommemtsElement());
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
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

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
picturesGallery.appendChild(createPicturesList(createPhotos()));


// сохраняю результат работы функции в переменную (временное решение)
var PHOTOS = createPhotos();

// находим и показываем элемент .big-picture
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// заполняем его информацией
bigPicture.querySelector('.big-picture__img').querySelector('img').src = PHOTOS[0].url;
bigPicture.querySelector('.likes-count').textContent = PHOTOS[0].likes;
bigPicture.querySelector('.comments-count').textContent = PHOTOS[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = PHOTOS[0].description;

// функция создания одного элемента разметки
var createItem = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// создаем один комментарий
var createCommentsItem = function (index) {
  var commentsItem = createItem('li', 'social__comment');

  var image = createItem('img', 'social__picture');
  image.src = PHOTOS[0].comments[index].avatar;
  image.alt = PHOTOS[0].comments[index].name;
  commentsItem.appendChild(image);

  var text = createItem('p', 'social__text', PHOTOS[0].comments[index].message);
  commentsItem.appendChild(text);

  return commentsItem;
};

// убираем шаблонные комментарии и вставляем свои
var commentsList = bigPicture.querySelector('.social__comments');
commentsList.innerHTML = '';
for (var i = 0; i < PHOTOS[0].comments.length; i++) {
  commentsList.appendChild(createCommentsItem(i));
}


bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('.modal-open');
