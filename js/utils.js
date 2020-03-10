'use strict';

(function () {

  var ESCAPE_KEY = 27;
  var editImage = document.querySelector('.img-upload__overlay');
  var scaleInput = editImage.querySelector('.scale__control--value');
  var imagePreview = editImage.querySelector('.img-upload__preview');
  var imageScale = editImage.querySelector('.img-upload__scale');
  var editForm = document.querySelector('.img-upload__form');
  var hashtagsInput = editForm.querySelector('.text__hashtags');
  var line = editForm.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var effectLevelInput = editImage.querySelector('.effect-level__value');
  var effectDepth = line.querySelector('.effect-level__depth');


  window.utils = {
    ESCAPE_KEY: ESCAPE_KEY,
    editImage: editImage,
    scaleInput: scaleInput,
    imagePreview: imagePreview,
    imageScale: imageScale,
    editForm: editForm,
    hashtagsInput: hashtagsInput,
    line: line,
    pin: pin,
    effectLevelInput: effectLevelInput,
    effectDepth: effectDepth
  };

}());
