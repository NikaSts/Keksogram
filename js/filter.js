'use strict';

(function () {

  var MAX_EFFECT_LEVEL = 100;

  var editImage = window.utils.editImage;
  var imagePreview = window.utils.imagePreview;
  var effectLevelInput = window.utils.effectLevelInput;
  var bar = editImage.querySelector('.img-upload__effect-level');
  var pin = window.utils.pin;
  var effectDepth = window.utils.effectDepth;

  var effectNameToEffectClass = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  var changeFilter = function (evt) {
    var target = evt.target.matches('input[name="effect"]');
    if (!target) {
      return;
    }
    clearFilter();
    var effectName = evt.target.id;
    imagePreview.classList.add(effectNameToEffectClass[effectName]);
    setDefaultEffectLevel();
    showBar(effectName);
  };

  var chrome = {
    min: 0,
    max: 1
  };
  var sepia = {
    min: 0,
    max: 1
  };
  var marvin = {
    min: 0,
    max: 100
  };
  var phobos = {
    min: 0,
    max: 3
  };
  var heat = {
    min: 1,
    max: 3
  };

  var getEffectDepth = function (limit) {
    return ((effectLevelInput.value * (limit.max - limit.min)) / MAX_EFFECT_LEVEL) + limit.min;
  };

  var setChromeFilter = function () {
    return 'grayscale(' + getEffectDepth(chrome) + ')';
  };
  var setSepiaFilter = function () {
    return 'sepia(' + getEffectDepth(sepia) + ')';
  };
  var setMarvinFilter = function () {
    return 'invert(' + getEffectDepth(marvin) + '%)';
  };
  var setPhobosFilter = function () {
    return 'blur(' + getEffectDepth(phobos) + 'px)';
  };
  var setHeatFilter = function () {
    return 'brightness(' + getEffectDepth(heat) + ')';
  };

  var effectNameToEffectFilter = {
    'effect-chrome': setChromeFilter,
    'effect-sepia': setSepiaFilter,
    'effect-marvin': setMarvinFilter,
    'effect-phobos': setPhobosFilter,
    'effect-heat': setHeatFilter
  };

  var setFilter = function (effectName) {
    imagePreview.style.filter = effectNameToEffectFilter[effectName]();
  };

  var clearFilter = function () {
    imagePreview.style.filter = '';
    imagePreview.className = 'img-upload__preview';
  };

  var showBar = function (effect) {
    return (effect === 'effect-none') ? bar.classList.add('hidden') : bar.classList.remove('hidden');
  };

  var setDefaultEffectLevel = function () {
    pin.style.left = MAX_EFFECT_LEVEL + '%';
    effectDepth.style.width = MAX_EFFECT_LEVEL + '%';
    effectLevelInput.value = MAX_EFFECT_LEVEL;
  };

  window.filter = {
    change: changeFilter,
    set: setFilter,
    clear: clearFilter,
    showBar: showBar,
    setDefaultEffectLevel: setDefaultEffectLevel
  };

}());
