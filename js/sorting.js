'use strict';

(function () {

  var filterMenu = window.utils.filterMenu;
  filterMenu.classList.remove('img-filters--inactive');

  var showActiveFilter = function (target) {
    var filterButtons = Array.from(filterMenu.querySelectorAll('button'));
    filterButtons.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');
  };

  var getPopularPhotos = function (photos) {
    return photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var shufflePhotos = function (photos) {
    var randomIndex;
    var swap;
    for (var i = photos.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      swap = photos[randomIndex];
      photos[randomIndex] = photos[i];
      photos[i] = swap;
    }
    return photos;
  };

  var getRandomPhotos = function (photos) {
    return shufflePhotos(photos.slice()).splice(0, 10);
  };

  window.sorting = {
    showCurrent: showActiveFilter,
    getPopular: getPopularPhotos,
    getRandom: getRandomPhotos
  };

})();
