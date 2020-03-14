'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');

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

  var createCommentsList = function (comments, commentsList) {
    commentsList.innerHTML = '';
    commentsList.appendChild(window.utils.createFragment(comments, createCommentsElement));
  };

  var renderBigPicture = function (photo) {
    var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var description = bigPicture.querySelector('.social__caption');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var commentsList = bigPicture.querySelector('.social__comments');

    image.src = photo.url;
    description.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    createCommentsList(photo.comments, commentsList);

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
