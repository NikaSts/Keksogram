'use strict';

(function () {

  var body = document.querySelector('body');
  var editForm = window.utils.editForm;
  var editImage = window.utils.editImage;
  var hashtagsInput = editForm.querySelector('.text__hashtags');
  var imageScale = window.utils.imageScale;
  var uploadFileInput = editForm.querySelector('#upload-file');
  var cancelButton = editForm.querySelector('.img-upload__cancel');
  var descriptionInput = editForm.querySelector('.text__description');
  var effectsList = document.querySelector('.effects__list');
  var pin = window.utils.pin;
  var scaleInput = window.utils.scaleInput;
  var imagePreview = window.utils.imagePreview;
  var bigPreview = document.querySelector('.img-upload__preview img');
  var smallPreviews = document.querySelectorAll('.effects__preview');


  uploadFileInput.addEventListener('change', function () {
    window.newPicture.upload(uploadFileInput, bigPreview, smallPreviews);
    openEditForm();
  });

  var openEditForm = function () {
    editImage.classList.remove('hidden');
    body.classList.add('modal-open');

    setMaxScaleLevel();
    window.filter.setDefaultEffectLevel();
    window.filter.showBar('effect-none');
    imagePreview.className = 'img-upload__preview';
    addListeners();
  };

  var hideEditForm = function () {
    editImage.classList.add('hidden');
    body.classList.remove('modal-open');
    removeListeners();
    window.filter.clear();
    clearForm();
  };

  var addListeners = function () {
    cancelButton.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onEditFormEscPress);
    pin.addEventListener('mousedown', onPinMouseDown);
    hashtagsInput.addEventListener('change', onHashtagsInputChange);
    imageScale.addEventListener('click', onScaleControlClick);
    effectsList.addEventListener('click', onEffectButtonClick);
    editForm.addEventListener('submit', onEditFormSubmit);
  };

  var removeListeners = function () {
    cancelButton.removeEventListener('click', onCancelButtonClick);
    document.removeEventListener('keydown', onEditFormEscPress);
    pin.removeEventListener('mousedown', onPinMouseDown);
    hashtagsInput.removeEventListener('change', onHashtagsInputChange);
    imageScale.removeEventListener('click', onScaleControlClick);
    effectsList.removeEventListener('click', onEffectButtonClick);
    editForm.removeEventListener('submit', onEditFormSubmit);
  };

  var clearForm = function () {
    editForm.reset();
  };

  var setMaxScaleLevel = function () {
    imagePreview.style.transform = 'scale(1)';
    scaleInput.value = '100%';
  };

  var onCancelButtonClick = function () {
    hideEditForm();
  };

  var onEditFormEscPress = function (evt) {
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
    window.validity.check(hashtagsInput);
  };

  var showSuccessMessage = function () {
    window.message.success();
  };

  var showErrorMessage = function (message) {
    window.message.error(message);
  };

  var onEditFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(editForm),
        function () {
          showSuccessMessage();
          hideEditForm();
        },
        function (message) {
          showErrorMessage(message);
        });
  };

}());
