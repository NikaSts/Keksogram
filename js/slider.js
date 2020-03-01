'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var line = uploadForm.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var effectLevelInput = uploadForm.querySelector('.effect-level__value');
  var effectDepth = line.querySelector('.effect-level__depth');
  pin.style.cursor = 'pointer';

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var lineStart = line.offsetLeft - pin.offsetWidth;
      var lineEnd = line.offsetLeft + line.offsetWidth - pin.offsetWidth;
      var pinPosition = pin.offsetLeft + moveEvt.movementX;
      var limitMovementX = {
        min: lineStart,
        max: lineEnd
      };

      if (pinPosition < limitMovementX.min) {
        pinPosition = limitMovementX.min;
      }
      if (pinPosition > limitMovementX.max) {
        pinPosition = limitMovementX.max;
      }
      pin.style.left = pinPosition + 'px';
      var effectInPercent = Math.floor((pinPosition / limitMovementX.max) * 100);
      effectLevelInput.value = effectInPercent;
      effectDepth.style.width = effectInPercent + '%';

      var activeEffect = document.querySelector('input[name="effect"]:checked').id;
      window.filter.apply(activeEffect);
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  window.slider = {
    movePin: onPinMouseDown
  };

}());
