'use strict';

(function () {

  var MAX_PICTURES_NUMBER = 10;

  var showActiveFilter = function (target) {
    var activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
  };

  var getPopularPictures = function (pictures) {
    return pictures.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var shufflePictures = function (pictures) {
    var randomIndex;
    var swap;
    var picturesLength = pictures.length;
    for (var i = picturesLength - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      swap = pictures[randomIndex];
      pictures[randomIndex] = pictures[i];
      pictures[i] = swap;
    }
    return pictures;
  };

  var getRandomPictures = function (pictures) {
    return shufflePictures(pictures.slice()).splice(0, MAX_PICTURES_NUMBER);
  };

  window.sorting = {
    showCurrent: showActiveFilter,
    getPopular: getPopularPictures,
    getRandom: getRandomPictures
  };

})();
