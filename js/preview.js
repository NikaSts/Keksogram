'use strict';

(function () {


  var body = document.querySelector('body');
  var uploadForm = document.querySelector('.img-upload__form');
  var editImage = uploadForm.querySelector('.img-upload__overlay');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var imageScale = editImage.querySelector('.img-upload__scale');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var cancelButton = uploadForm.querySelector('.img-upload__cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');
  var effectsList = document.querySelector('.effects__list');
  var line = uploadForm.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var scaleInput = editImage.querySelector('.scale__control--value');
  var imagePreview = editImage.querySelector('.img-upload__preview');


  uploadFileInput.addEventListener('change', function () {
    openEditForm();
  });

  var openEditForm = function () {
    editImage.classList.remove('hidden');
    body.classList.add('modal-open');

    setMaxScaleLevel();
    window.filter.setDefaultEffectLevel();
    window.filter.showBar('effect-none');
    imagePreview.className = 'img-upload__preview';

    cancelButton.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onUploadFormEscPress);
    pin.addEventListener('mousedown', onPinMouseDown);
    hashtagsInput.addEventListener('change', onHashtagsInputChange);
    imageScale.addEventListener('click', onScaleControlClick);
    effectsList.addEventListener('click', onEffectButtonClick);
  };

  var hideEditForm = function () {
    editImage.classList.add('hidden');
    body.classList.remove('modal-open');

    cancelButton.removeEventListener('click', onCancelButtonClick);
    document.removeEventListener('keydown', onUploadFormEscPress);
    pin.removeEventListener('mousedown', onPinMouseDown);
    hashtagsInput.removeEventListener('change', onHashtagsInputChange);
    imageScale.removeEventListener('click', onScaleControlClick);
    effectsList.removeEventListener('click', onEffectButtonClick);
  };

  var setMaxScaleLevel = function () {
    imagePreview.style.transform = 'scale(1)';
    scaleInput.value = '100%';
  };

  var onCancelButtonClick = function () {
    hideEditForm();
  };

  var onUploadFormEscPress = function (evt) {
    if ((evt.keyCode === window.utils.ESCAPE_KEY) && (evt.target !== hashtagsInput) && (evt.target !== descriptionInput)) {
      hideEditForm();
    }
  };

  var onPinMouseDown = function (evt) {
    window.slider.movePin(evt);
  };

  var onScaleControlClick = function (evt) {
    window.size.change(evt);
  };

  var onEffectButtonClick = function (evt) {
    window.filter.change(evt);
  };

  var onHashtagsInputChange = function () {
    window.validity.check();
  };

}());
