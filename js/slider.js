'use strict';

(function () {

  var line = window.utils.line;
  var pin = window.utils.pin;
  var effectLevelInput = window.utils.effectLevelInput;
  var effectDepth = window.utils.effectDepth;
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
      window.filter.set(activeEffect);
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
