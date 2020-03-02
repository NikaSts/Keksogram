'use strict';
(function () {

  // находим шаблон и его содержимое в документе
  var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesGallery = document.querySelector('.pictures');

  // Копируем шаблон и вставляем к него данные
  var createPictureElement = function (photo, index) {
    var pictureElement = templatePicture.cloneNode(true);

    pictureElement.dataset.index = index;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  // создаем DOM-элементы и заполняем их
  var createPicturesList = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPictureElement(photos[i], i));
    }
    return fragment;
  };

  // отображаем галлерею с фото
  var photos = window.data.get();
  picturesGallery.appendChild(createPicturesList(photos));

  // меняем превью фото по клику
  picturesGallery.addEventListener('click', function (evt) {
    renderTargetPhoto(evt);
  });

  var renderTargetPhoto = function (evt) {
    var target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    if (!picturesGallery.contains(target)) {
      return;
    }

    var index = target.dataset.index;
    window.picture.show(photos[index]);
  };

}());
