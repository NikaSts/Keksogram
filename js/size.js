'use strict';

(function () {

  var SCALE_CONTROL_STEP = 25;
  var MIN_SCALE_LEVEL = 25;
  var MAX_SCALE_LEVEL = 100;

  var scaleInput = window.utils.scaleInput;
  var imageScale = window.utils.imageScale;
  var scaleControlSmaller = imageScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageScale.querySelector('.scale__control--bigger');
  var imagePreview = window.utils.imagePreview;

  var changeSize = function (evt) {
    var target = evt.target.closest('button');
    if (!target) {
      return;
    }
    var currentValueString = scaleInput.value;
    var currentValueInteger = parseInt(currentValueString, 10);

    if (target === scaleControlSmaller) {
      if (currentValueInteger > MIN_SCALE_LEVEL) {
        currentValueInteger += -(SCALE_CONTROL_STEP);
      }
    }
    if (target === scaleControlBigger) {
      if (currentValueInteger < MAX_SCALE_LEVEL) {
        currentValueInteger += SCALE_CONTROL_STEP;
      }
    }
    imagePreview.style.transform = 'scale(' + currentValueInteger / MAX_SCALE_LEVEL + ')';
    scaleInput.value = currentValueInteger + '%';
  };

  window.size = {
    change: changeSize
  };

}());
