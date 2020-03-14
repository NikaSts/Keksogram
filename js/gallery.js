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

  var createPicturesList = function (photos) {
    picturesGallery.appendChild(window.utils.createFragment(photos, createPictureElement));
  };

  var showErrorMessage = function (errorMessage) {
    window.message.error(errorMessage);
  };

  window.backend.load(
      function (photos) {
        createPicturesList(photos);

        var userPhotos = photos;
        window.gallery = {
          userPhotos: userPhotos
        };
      },
      function (errorMessage) {
        showErrorMessage(errorMessage);
      });


  // меняем превью фото по клику
  picturesGallery.addEventListener('click', function (evt) {
    renderTargetPhoto(evt);
  });

  var renderTargetPhoto = function (evt) {
    var target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    var userPhotos = window.gallery.userPhotos;
    var index = target.dataset.index;
    window.picture.show(userPhotos[index]);
  };


  // фильтрация фотографий
  var removePictureElements = function () {
    picturesGallery.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  window.utils.filterMenu.addEventListener('mousedown', function (evt) {
    window.utils.debounce(filterUserPhotos(evt));
  });

  var filterUserPhotos = function (evt) {
    var target = evt.target.closest('.img-filters__button');
    if (!target) {
      return;
    }
    window.sorting.showCurrent(target);
    var userPhotos = window.gallery.userPhotos;

    if (target.id === 'filter-default') {
      removePictureElements();
      createPicturesList(userPhotos);
    }
    if (target.id === 'filter-discussed') {
      removePictureElements();
      createPicturesList(window.sorting.getPopular(userPhotos));
    }
    if (target.id === 'filter-random') {
      removePictureElements();
      createPicturesList(window.sorting.getRandom(userPhotos));
    }
  };
}());
