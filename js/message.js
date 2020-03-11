'use strict';

(function () {

  var Z_INDEX = 1000;
  var FONT_SIZE = '24px';
  var LINE_HEIGHT = '32px';

  var main = document.querySelector('main');

  var renderMessageElement = function (message, state) {
    main.appendChild(message);

    var button = main.querySelector('.' + state + '__button');
    var popup = main.querySelector('.' + state);
    popup.style.zIndex = Z_INDEX;

    button.addEventListener('click', function () {
      popup.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESCAPE_KEY) {
        popup.remove();
      }
    });
    document.addEventListener('mouseup', function (evt) {
      var target = evt.target.closest('.' + state + '__inner');
      if (!target) {
        popup.remove();
      }
    });
  };

  var setMessageStyle = function (messageElement) {
    var title = messageElement.querySelector('h2');
    title.style.fontSize = FONT_SIZE;
    title.style.lineHeight = LINE_HEIGHT;
  };

  var onSuccess = function () {
    var templateMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
    var messageElement = templateMessage.cloneNode(true);

    setMessageStyle(messageElement);
    messageElement.querySelector('h2').textContent = 'Изображение успешно загружено';
    messageElement.querySelector('button').textContent = 'Круто!';

    renderMessageElement(messageElement, 'success');
  };

  var onError = function (message) {
    var templateMessage = document.querySelector('#error')
    .content
    .querySelector('.error');
    var messageElement = templateMessage.cloneNode(true);

    setMessageStyle(messageElement);
    messageElement.querySelector('h2').textContent = message;
    messageElement.querySelector('button').textContent = 'OK';

    renderMessageElement(messageElement, 'error');
  };

  window.message = {
    success: onSuccess,
    error: onError
  };

})();
