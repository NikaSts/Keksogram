'use strict';

(function () {

  var picturesGallery = document.querySelector('.pictures');

  var createPictureElement = function (photo, index) {
    var pictureElement = window.utils.createTemplate('picture');
    pictureElement.dataset.index = index;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return pictureElement;
  };

  var appendPictureElements = function (photos) {
    picturesGallery.appendChild(window.utils.createFragment(photos, createPictureElement));
  };

  var showErrorMessage = function (errorMessage) {
    window.message.error(errorMessage);
  };

  window.backend.load(
      function (photos) {
        appendPictureElements(photos);
        var userPhotos = photos;
        window.gallery = {
          userPhotos: userPhotos
        };
        filtredPhotos = userPhotos.slice();
      },
      function (errorMessage) {
        showErrorMessage(errorMessage);
      });


  // фильтрация фотографий

  var filtredPhotos = [];


  var onFilterMenuClick = function (evt) {
    var target = evt.target.closest('.img-filters__button');
    window.sorting.showCurrent(evt.target);

    getFiltredPhotos(target);
    removePictureElements();
    renderPictureElements();
  };

  var getFiltredPhotos = function (target) {
    if (!target) {
      return;
    }
    var userPhotos = window.gallery.userPhotos;

    if (target.id === 'filter-default') {
      filtredPhotos = userPhotos;
    }
    if (target.id === 'filter-discussed') {
      filtredPhotos = window.sorting.getPopular(userPhotos);
    }
    if (target.id === 'filter-random') {
      filtredPhotos = window.sorting.getRandom(userPhotos);
    }
  };

  var removePictureElements = function () {
    picturesGallery.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var renderPictureElements = window.debounce(function () {
    appendPictureElements(filtredPhotos);
  });

  window.utils.filterMenu.addEventListener('click', onFilterMenuClick);

  // меняем превью фото по клику
  picturesGallery.addEventListener('click', function (evt) {
    renderTargetPhoto(evt);
  });

  var renderTargetPhoto = function (evt) {
    var target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    var index = target.dataset.index;
    window.picture.show(filtredPhotos[index]);
  };

}());
