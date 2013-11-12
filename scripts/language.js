require([
  '$api/models',
  '/strings/main.lang'
], function(models, mainStrings) {
  'use strict';

  //Setup a short-hand to get translation
  var _ = SP.bind(mainStrings.get, mainStrings);

  var applyLanguages = function() {
    document.querySelector('[data-i18n-title]').innerHTML = _('title');
    document.querySelector('[data-i18n-banner-title]').innerHTML = _('title');
    document.querySelector('[data-i18n-offline]').innerHTML = _('offline');
    document.querySelector('[data-i18n-colour-red]').innerHTML = _('colour_red');
    document.querySelector('[data-i18n-colour-orange]').innerHTML = _('colour_orange');
    document.querySelector('[data-i18n-colour-yellow]').innerHTML = _('colour_yellow');
    document.querySelector('[data-i18n-colour-green]').innerHTML = _('colour_green');
    document.querySelector('[data-i18n-colour-blue]').innerHTML = _('colour_blue');
    document.querySelector('[data-i18n-colour-indigo]').innerHTML = _('colour_indigo');
    document.querySelector('[data-i18n-colour-violet]').innerHTML = _('colour_violet');

  };

  exports.applyLanguages = applyLanguages;
});
