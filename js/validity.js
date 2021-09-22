'use strict';

(function () {

  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;
  var ERROR_BORDER_STYLE = '2px solid #ff4d4d';
  var REGEXP = /^([A-Za-zА-ЯЁа-яё0-9]*)$/;

  var createHashtags = function (input) {
    var hashtags = input.value.trim().toLowerCase().split(' ');
    return hashtags;
  };

  var checkHashtagsInputValidity = function (input) {
    var hashtags = createHashtags(input).filter(function (hashtag) {
      return hashtag !== '';
    });
    if (hashtags.length > 0) {
      setCustomValidation(hashtags, input);
    }
  };

  var setCustomValidation = function (hashtags, input) {
    if (hashtags.length > MAX_HASHTAGS_NUMBER) {
      showError(input, 'нельзя указать больше пяти хэш-тегов');
      return;
    }
    var hashtagsLength = hashtags.length;
    for (var i = 0; i < hashtagsLength; i++) {
      var hashtag = hashtags[i];

      if (hashtag[0] !== '#') {
        showError(input, 'хэш-тег должен начинаться с символа # (решётка)');
        break;
      } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        showError(input, 'хеш-тег не может состоять только из одной решётки');
        break;
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        showError(input, 'максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else if (!hashtag.substring(1).match(REGEXP)) {
        showError(input, 'название хэш-тега должно состоять только из букв и цифр');
        break;
      } else if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        showError(input, 'один и тот же хэш-тег не может быть использован дважды');
        break;
      } else {
        input.setCustomValidity('');
        input.style.border = 'none';
      }
    }
  };

  var showError = function (input, errorMessage) {
    input.setCustomValidity(errorMessage);
    input.style.border = ERROR_BORDER_STYLE;
  };

  window.validity = {
    check: checkHashtagsInputValidity
  };

}());
