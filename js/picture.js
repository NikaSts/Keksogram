'use strict';

(function () {

  var START_COMMENTS_NUMBER = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsOpen = bigPicture.querySelector('.comments-open');
  var closeButton = bigPicture.querySelector('#picture-cancel');


  var createCustomElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

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
  };


  var userComments = [];

  var renderBigPictureElement = function (picture) {
    var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var description = bigPicture.querySelector('.social__caption');
    var likesCount = bigPicture.querySelector('.likes-count');

    image.src = picture.url;
    description.textContent = picture.description;
    likesCount.textContent = picture.likes;

    commentsCount.textContent = picture.comments.length;
    commentsList.innerHTML = '';
    userComments = picture.comments.slice();

    createCommentsList(userComments);
    commentsOpen.textContent = commentsList.childElementCount;

    if (picture.comments.length > START_COMMENTS_NUMBER) {
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
      commentsLoader.classList.remove('hidden');
    }
  };

  var updateCommentsCounter = function () {
    commentsOpen.textContent = commentsList.childElementCount;
    if (commentsCount.textContent === commentsOpen.textContent) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    }
  };

  var onCommentsLoaderClick = function () {
    createCommentsList(userComments);
    updateCommentsCounter();
  };

  var onCloseButtonClick = function () {
    hideBigPicture();
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEY) {
      hideBigPicture();
    }
  };

  var showBigPicture = function (picture) {
    renderBigPictureElement(picture);
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onBigPictureEscPress);
    closeButton.addEventListener('click', onCloseButtonClick);
  };

  var hideBigPicture = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    commentsList.querySelectorAll('li').forEach(function (element) {
      element.remove();
    });

    document.removeEventListener('keydown', onBigPictureEscPress);
    closeButton.removeEventListener('click', onCloseButtonClick);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  window.picture = {
    show: showBigPicture,
  };

}());
