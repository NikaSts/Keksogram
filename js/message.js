'use strict';

(function () {

  var Z_INDEX = 1000;
  var FONT_SIZE = '24px';
  var LINE_HEIGHT = '32px';

  var main = document.querySelector('main');
  var button;
  var popup;
  var state;

  var renderMessageElement = function (message) {
    main.appendChild(message);

    button = main.querySelector('.' + state + '__button');
    popup = main.querySelector('.' + state);
    popup.style.zIndex = Z_INDEX;

    button.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  var onButtonClick = function () {
    popupClose();
  };

  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEY) {
      popupClose();
    }
  };

  var onDocumentMouseUp = function (evt) {
    var target = evt.target.closest('.' + state + '__inner');
    if (!target) {
      popupClose();
    }
  };

  var popupClose = function () {
    popup.remove();
    button.removeEventListener('click', onButtonClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  };

  var setMessageStyle = function (messageElement) {
    var title = messageElement.querySelector('h2');
    title.style.fontSize = FONT_SIZE;
    title.style.lineHeight = LINE_HEIGHT;
  };

  var onSuccess = function () {
    var messageElement = window.utils.createTemplate('success');
    setMessageStyle(messageElement);
    messageElement.querySelector('h2').textContent = 'Изображение успешно загружено';
    messageElement.querySelector('button').textContent = 'Круто!';
    state = 'success';
    renderMessageElement(messageElement);
  };

  var onError = function (message) {
    var messageElement = window.utils.createTemplate('error');
    setMessageStyle(messageElement);
    messageElement.querySelector('h2').textContent = message;
    messageElement.querySelector('button').textContent = 'OK';
    state = 'error';
    renderMessageElement(messageElement);
  };

  window.message = {
    success: onSuccess,
    error: onError
  };

})();
