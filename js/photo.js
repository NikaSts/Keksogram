'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadPhoto = function (input, photo, previews, evt) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var setPreviews = function () {
      photo.src = reader.result;
      // input.name = file.name;

      previews.forEach(function (item) {
        item.style.backgroundImage = 'url("' + reader.result + '")';
      });
    };

    var onReaderLoad = function () {
      setPreviews();
    };

    if (matches) {
      var reader = new FileReader(evt);
      reader.addEventListener('load', onReaderLoad);
      reader.readAsDataURL(file);
    }
  };

  window.photo = {
    upload: uploadPhoto
  };

}());
