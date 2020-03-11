'use strict';

(function () {

  var MAX_EFFECT_LEVEL = 100;

  var editImage = window.utils.editImage;
  var imagePreview = window.utils.imagePreview;
  var effectLevelInput = window.utils.effectLevelInput;
  var effectListMap = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  var bar = editImage.querySelector('.img-upload__effect-level');
  var pin = window.utils.pin;
  var effectDepth = window.utils.effectDepth;


  var changeFilter = function (evt) {
    var target = evt.target.matches('input[name="effect"]');
    if (!target) {
      return;
    }
    var effectName = evt.target.id;
    imagePreview.className = 'img-upload__preview';
    imagePreview.classList.add(effectListMap[effectName]);
    imagePreview.style.filter = '';
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

  var applyFilter = function (effect) {
    if (effect === 'effect-chrome') {
      imagePreview.style.filter = 'grayscale(' + getEffectDepth(chrome) + ')';
    }
    if (effect === 'effect-sepia') {
      imagePreview.style.filter = 'sepia(' + getEffectDepth(sepia) + ')';
    }
    if (effect === 'effect-marvin') {
      imagePreview.style.filter = 'invert(' + getEffectDepth(marvin) + '%)';
    }
    if (effect === 'effect-phobos') {
      imagePreview.style.filter = 'blur(' + getEffectDepth(phobos) + 'px)';
    }
    if (effect === 'effect-heat') {
      imagePreview.style.filter = 'brightness(' + getEffectDepth(heat) + ')';
    }
  };


  var setDefaultEffectLevel = function () {
    pin.style.left = MAX_EFFECT_LEVEL + '%';
    effectDepth.style.width = MAX_EFFECT_LEVEL + '%';
    effectLevelInput.value = MAX_EFFECT_LEVEL;
  };

  var showBar = function (effect) {
    return (effect === 'effect-none') ? bar.classList.add('hidden') : bar.classList.remove('hidden');
  };

  window.filter = {
    change: changeFilter,
    apply: applyFilter,
    showBar: showBar,
    setDefaultEffectLevel: setDefaultEffectLevel
  };

}());
