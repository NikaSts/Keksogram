'use strict';

(function () {

  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;

  var hashtagsInput = window.utils.hashtagsInput;

  var createHashtags = function () {
    var hashtags = hashtagsInput.value.trim().toLowerCase().split(' ');
    return hashtags;
  };

  var checkHashtagsInputValidity = function () {
    var hashtags = createHashtags().filter(function (hashtag) {
      return hashtag !== '';
    });
    if (hashtags.length > 0) {
      setCustomValidityMessage(hashtags);
    }
  };

  var setCustomValidityMessage = function (hashtags) {
    if (hashtags.length > MAX_HASHTAGS_NUMBER) {
      hashtagsInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return;
    }
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag[0] !== '#') {
        hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
        break;
      } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        break;
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else if (!hashtag.substring(1).match(/^([A-Za-zА-ЯЁа-яё0-9]*)$/)) {
        hashtagsInput.setCustomValidity('название хэш-тега должно состоять только из букв и цифр');
        break;
      } else if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        break;
      } else {
        hashtagsInput.setCustomValidity('');
      }
    }
  };

  window.validity = {
    check: checkHashtagsInputValidity
  };

}());
