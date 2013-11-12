require([
  '$api/models',
  'scripts/language',
  'scripts/colour'
], function(models, language, colour) {
  'use strict';

  language.applyLanguages();
  colour.init();
});
