'use strict';

(function () {

  var ESCAPE_KEY = 27;

  var editImage = document.querySelector('.img-upload__overlay');
  var scaleInput = editImage.querySelector('.scale__control--value');
  var imagePreview = editImage.querySelector('.img-upload__preview');
  var imageScale = editImage.querySelector('.img-upload__scale');
  var editForm = document.querySelector('.img-upload__form');
  var line = editForm.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var effectLevelInput = editImage.querySelector('.effect-level__value');
  var effectDepth = line.querySelector('.effect-level__depth');

  var createFragment = function (array, createPictureElement) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item, i) {
      fragment.appendChild(createPictureElement(item, i));
    });
    return fragment;
  };

  var createTemplate = function (name) {
    var template = document.querySelector('#' + name)
    .content
    .querySelector('.' + name);
    return template.cloneNode(true);
  };

  window.utils = {
    ESCAPE_KEY: ESCAPE_KEY,
    editImage: editImage,
    scaleInput: scaleInput,
    imagePreview: imagePreview,
    imageScale: imageScale,
    editForm: editForm,
    line: line,
    pin: pin,
    effectLevelInput: effectLevelInput,
    effectDepth: effectDepth,
    createFragment: createFragment,
    createTemplate: createTemplate,
  };

}());
