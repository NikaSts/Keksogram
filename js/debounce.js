'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };

}());
