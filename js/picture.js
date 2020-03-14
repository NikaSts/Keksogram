'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsOpen = bigPicture.querySelector('.comments-open');


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
  var createCommentElement = function (comment) {
    var commentsElement = createCustomElement('li', 'social__comment');

    var image = createCustomElement('img', 'social__picture');
    image.src = comment.avatar;
    image.alt = comment.name;
    commentsElement.appendChild(image);

    var text = createCustomElement('p', 'social__text', comment.message);
    commentsElement.appendChild(text);

    return commentsElement;
  };

  var createCommentsList = function (commentsTotal) {
    var commentsToShow = commentsTotal.splice(0, 5);
    commentsList.appendChild(window.utils.createFragment(commentsToShow, createCommentElement));
    updateCommentsCounter();
  };

  var updateCommentsCounter = function () {
    commentsOpen.textContent = commentsList.childElementCount;
    if (commentsCount.textContent === commentsOpen.textContent) {
      commentsLoader.classList.add('hidden');
    }
  };

  var renderBigPicture = function (photo) {
    var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var description = bigPicture.querySelector('.social__caption');
    var likesCount = bigPicture.querySelector('.likes-count');

    image.src = photo.url;
    description.textContent = photo.description;
    likesCount.textContent = photo.likes;

    commentsCount.textContent = photo.comments.length;
    commentsList.innerHTML = '';
    var userComments = photo.comments.slice();

    createCommentsList(userComments);

    var onCommentsLoaderClick = function () {
      createCommentsList(userComments);
      if (commentsCount.textContent === commentsOpen.textContent) {
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      }
    };

    commentsLoader.addEventListener('click', onCommentsLoaderClick);
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
    commentsLoader.classList.remove('hidden');
    commentsList.querySelectorAll('li').forEach(function (element) {
      element.remove();
    });

    document.removeEventListener('keydown', onBigPictureEscPress);
    closeButton.removeEventListener('click', onCloseButtonClick);
  };

  window.picture = {
    show: showBigPicture,
    hide: hideBigPicture
  };


}());
