'use strict';

(function () {

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
    if (evt.keyCode === window.utils.ESCAPE_KEY) {
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

  window.picture = {
    show: showBigPicture,
    hide: hideBigPicture
  };


}());
