'use strict';

(function () {

  var picturesGallery = document.querySelector('.pictures');
  var filterMenu = document.querySelector('.img-filters');

  var createPictureElement = function (picture, index) {
    var pictureElement = window.utils.createTemplate('picture');
    pictureElement.dataset.index = index;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var appendPictureElements = function (pictures) {
    picturesGallery.appendChild(window.utils.createFragment(pictures, createPictureElement));
  };

  var showErrorMessage = function (errorMessage) {
    window.message.error(errorMessage);
  };

  window.backend.load(
      function (pictures) {
        appendPictureElements(pictures);
        filterMenu.classList.remove('img-filters--inactive');
        var userPictures = pictures;
        window.gallery = {
          userPictures: userPictures
        };
        filtredPictures = userPictures.slice();
      },
      function (errorMessage) {
        showErrorMessage(errorMessage);
      });


  var filtredPictures = [];

  var onFilterMenuClick = function (evt) {
    var target = evt.target.closest('.img-filters__button');
    if (!target) {
      return;
    }
    window.sorting.showCurrent(target);
    renderPictureElements(target);
  };

  var getFiltredPictures = function (target) {
    var className = target.id;
    var userPictures = window.gallery.userPictures;
    var classNameToFiltredPictures = {
      'filter-default': userPictures,
      'filter-discussed': window.sorting.getPopular(userPictures),
      'filter-random': window.sorting.getRandom(userPictures)
    };
    filtredPictures = classNameToFiltredPictures[className];
  };

  var removePictureElements = function () {
    picturesGallery.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var renderPictureElements = window.debounce(function (target) {
    getFiltredPictures(target);
    removePictureElements();
    appendPictureElements(filtredPictures);
  });


  var showTargetPicture = function (evt) {
    var target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    var index = target.dataset.index;
    window.picture.show(filtredPictures[index]);
  };

  filterMenu.addEventListener('click', onFilterMenuClick);
  picturesGallery.addEventListener('click', function (evt) {
    showTargetPicture(evt);
  });
}());
