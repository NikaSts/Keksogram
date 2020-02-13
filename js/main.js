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
var ESCAPE_KEY = 27;


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
var createCommemtsElement = function () {
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
var photos = createPhotos();
picturesGallery.appendChild(createPicturesList(photos));


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
var createCommentsItem = function (comment) {
  var commentsItem = createItem('li', 'social__comment');

  var image = createItem('img', 'social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  commentsItem.appendChild(image);

  var text = createItem('p', 'social__text', comment.message);
  commentsItem.appendChild(text);

  return commentsItem;
};

// создаем DOM-элементы и заполняем их
var createCommentsList = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createCommentsItem(comments[i]));
  }
  return fragment;
};

var bigPicture = document.querySelector('.big-picture');

// заполняем его информацией
var renderBigPicture = function (photo) {
  var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
  image.src = photo.url;

  var description = bigPicture.querySelector('.social__caption');
  description.textContent = photo.description;

  var likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = photo.likes;

  var commentsCount = bigPicture.querySelector('.comments-count');
  commentsCount.textContent = photo.comments.length;

  var commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';
  commentsList.appendChild(createCommentsList(photo.comments));

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

// отображаем большую картинку
var body = document.querySelector('body');
var closeButton = bigPicture.querySelector('#picture-cancel');

var onCloseButtonClick = function () {
  hideBigPicture();
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESCAPE_KEY) {
    hideBigPicture();
  }
};

var showBigPicture = function (photo) {
  renderBigPicture(photo);
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onBigPictureEscPress);
  closeButton.addEventListener('click', onCloseButtonClick);
};

var hideBigPicture = function () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscPress);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

// showBigPicture(photos[0]);

// меняем фото в bigPictures по клику
picturesGallery.addEventListener('click', function (evt) {
  findTarget(evt);
});

var findTarget = function (evt) {
  var target = evt.target.closest('.picture');
  if (!target) {
    return;
  }
  if (!picturesGallery.contains(target)) {
    return;
  }

  var picturesList = picturesGallery.querySelectorAll('.picture');
  for (var i = 0; i < picturesList.length; i++) {
    if (picturesList[i] === target) {
      showBigPicture(photos[i]);
    }
  }
};
