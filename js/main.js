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
var MAX_HASHTAGS_NUMBER = 5;
var MAX_HASHTAG_LENGTH = 20;
var MIN_HASHTAG_LENGTH = 2;


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

// находим шаблон и его содержимое в документе
var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesGallery = document.querySelector('.pictures');

// Копируем шаблон и вставляем к него данные
var createPicturesElement = function (photo, index) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.setAttribute('data-index', index);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

// создаем DOM-элементы и заполняем их
var createPicturesList = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPicturesElement(photos[i], i));
  }
  return fragment;
};

// отображаем галлерею с фото
var photos = createPhotos();
picturesGallery.appendChild(createPicturesList(photos));


// функция создания одного элемента разметки
var createCustomElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// создаем один комментарий
var createCommentsElement = function (comment) {
  var commentsElement = createCustomElement('li', 'social__comment');

  var image = createCustomElement('img', 'social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  commentsElement.appendChild(image);

  var text = createCustomElement('p', 'social__text', comment.message);
  commentsElement.appendChild(text);

  return commentsElement;
};

// создаем DOM-элементы и заполняем их
var createCommentsList = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createCommentsElement(comments[i]));
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

  var index = target.getAttribute('data-index');
  showBigPicture(photos[index]);
};

// открытие / закрытие окна
var uploadForm = document.querySelector('.img-upload__form');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var editImage = uploadForm.querySelector('.img-upload__overlay');
var cancelButton = uploadForm.querySelector('.img-upload__cancel');
var hashtagsInput = uploadForm.querySelector('.text__hashtags');
var descriptionInput = uploadForm.querySelector('.text__description');

uploadFileInput.addEventListener('change', function () {
  openEditForm();
});

var openEditForm = function () {
  editImage.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onUploadFormEscPress);
  pin.addEventListener('mousedown', onPinMouseDown);
  hashtagsInput.addEventListener('change', onHashtagsInputChange);
};

var hideEditForm = function () {
  editImage.classList.add('hidden');
  body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onUploadFormEscPress);
  pin.removeEventListener('mousedown', onPinMouseDown);
  hashtagsInput.removeEventListener('change', onHashtagsInputChange);
};

var onCancelButtonClick = function () {
  hideEditForm();
};

var onUploadFormEscPress = function (evt) {
  if ((evt.keyCode === ESCAPE_KEY) && (evt.target !== hashtagsInput) && (evt.target !== descriptionInput)) {
    hideEditForm();
  }
};

// двиежние ползунка
var bar = uploadForm.querySelector('.effect-level__line');
var pin = bar.querySelector('.effect-level__pin');
var effectLevelInput = uploadForm.querySelector('.effect-level__value');
var effectDepth = bar.querySelector('.effect-level__depth');
pin.style.cursor = 'pointer';

var onPinMouseDown = function (evt) {
  evt.preventDefault();

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var barStart = bar.offsetLeft - pin.offsetWidth;
    var barEnd = bar.offsetLeft + bar.offsetWidth - pin.offsetWidth;
    var pinPosition = pin.offsetLeft + moveEvt.movementX;
    var limitMovementX = {
      min: barStart,
      max: barEnd
    };

    if (pinPosition < limitMovementX.min) {
      pinPosition = limitMovementX.min;
    }
    if (pinPosition > limitMovementX.max) {
      pinPosition = limitMovementX.max;
    }
    pin.style.left = pinPosition + 'px';
    var effectInPercent = Math.floor((pinPosition / limitMovementX.max) * 100);
    effectLevelInput.setAttribute('value', effectInPercent);
    effectDepth.style.width = effectInPercent + '%';
  };

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

// валидация формы

var createHashtags = function () {
  var hashtags = hashtagsInput.value.trim().toLowerCase().split(' ');
  return hashtags;
};

var checkHashtagsInputValidity = function (hashtags) {
  if (hashtags.length > MAX_HASHTAGS_NUMBER) {
    hashtagsInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else {

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag[0] !== '#') {
        hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
      } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (!hashtag.substring(1).match(/^([A-Za-zА-ЯЁа-яё0-9]*)$/)) {
        hashtagsInput.setCustomValidity('название хэш-тега должно состоять только из букв и цифр');
      } else if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
        hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    }
  }
};

var onHashtagsInputChange = function () {
  var hashtags = createHashtags().filter(function (hashtag) {
    return hashtag !== '';
  });
  if (hashtags.length > 0) {
    checkHashtagsInputValidity(hashtags);
  }
};
